const RATE_LIMIT_STORE = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 300000;

export function sanitizeInput(input, maxLength = 500) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:\s*text\/html/gi, '')
    .replace(/data:\s*application\/javascript/gi, '')
    .replace(/<!--/g, '')
    .replace(/-->/g, '')
    .trim()
    .slice(0, maxLength);
}

export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return re.test(email) && email.length <= 254;
}

export function validatePassword(password) {
  if (!password || typeof password !== 'string') return { valid: false, score: 0, checks: {} };
  const checks = {
    length: password.length >= 8,
    maxLength: password.length <= 128,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noSpaces: !/\s/.test(password),
    noRepeats: !/(.)\1{2,}/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { valid: score >= 5, score, checks };
}

export function validatePin(pin) {
  if (!pin || typeof pin !== 'string') return false;
  return /^\d{4,8}$/.test(pin);
}

export function validateUsername(username) {
  if (!username || typeof username !== 'string') return false;
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
}

export function validateUrl(url) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function validatePhone(phone) {
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(phone.replace(/\s/g, ''));
}

export function detectXSS(input) {
  if (typeof input !== 'string') return false;
  const patterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:\s*text\/html/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /<applet/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
  ];
  return patterns.some((p) => p.test(input));
}

export function detectSQLInjection(input) {
  if (typeof input !== 'string') return false;
  const patterns = [
    /'\s*or\s+'1'\s*=\s*'1/gi,
    /'\s*or\s+1\s*=\s*1/gi,
    /;\s*drop\s+table/gi,
    /;\s*delete\s+from/gi,
    /;\s*update\s+.*set/gi,
    /;\s*insert\s+into/gi,
    /union\s+select/gi,
    /--\s/gi,
    /\/\*.*\*\//gi,
  ];
  return patterns.some((p) => p.test(input));
}

export function checkRateLimit(key, maxAttempts = MAX_ATTEMPTS, duration = LOCKOUT_DURATION) {
  const now = Date.now();
  const record = RATE_LIMIT_STORE.get(key);
  if (!record) {
    RATE_LIMIT_STORE.set(key, { attempts: 1, firstAttempt: now, lastAttempt: now });
    return { allowed: true, remaining: maxAttempts - 1, retryAfter: 0 };
  }
  if (now - record.firstAttempt > duration) {
    RATE_LIMIT_STORE.set(key, { attempts: 1, firstAttempt: now, lastAttempt: now });
    return { allowed: true, remaining: maxAttempts - 1, retryAfter: 0 };
  }
  if (record.attempts >= maxAttempts) {
    const retryAfter = duration - (now - record.firstAttempt);
    return { allowed: false, remaining: 0, retryAfter };
  }
  record.attempts++;
  record.lastAttempt = now;
  return { allowed: true, remaining: maxAttempts - record.attempts, retryAfter: 0 };
}

export function resetRateLimit(key) {
  RATE_LIMIT_STORE.delete(key);
}

export function generateCSRFToken() {
  const array = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(token, expected) {
  if (!token || !expected) return false;
  if (token.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

export const SECURITY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
};
