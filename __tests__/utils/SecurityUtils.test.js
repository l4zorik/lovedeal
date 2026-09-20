import {
  sanitizeInput,
  validateEmail,
  validatePassword,
  validatePin,
  validateUsername,
  validateUrl,
  validatePhone,
  detectXSS,
  detectSQLInjection,
  checkRateLimit,
  resetRateLimit,
  generateCSRFToken,
  validateCSRFToken,
  SECURITY_HEADERS,
} from '../../app/utils/SecurityUtils';

describe('sanitizeInput', () => {
  it('vrátí prázdný string pro ne-string vstup', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput(123)).toBe('');
    expect(sanitizeInput({})).toBe('');
  });

  it('odstraní < a > znaky', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).not.toContain('<');
    expect(sanitizeInput('<b>bold</b>')).not.toContain('<');
  });

  it('odstraní javascript: protokol', () => {
    expect(sanitizeInput('javascript:alert(1)')).not.toContain('javascript');
  });

  it('odstraní on* event handlery', () => {
    expect(sanitizeInput('onclick=alert(1)')).not.toContain('onclick');
    expect(sanitizeInput('onload=malicious()')).not.toContain('onload');
  });

  it('odstraní data: URI', () => {
    expect(sanitizeInput('data:text/html,<script>')).not.toContain('data:');
  });

  it('odstraní HTML komentáře', () => {
    expect(sanitizeInput('<!-- comment -->')).not.toContain('<!--');
    expect(sanitizeInput('--> comment <!--')).not.toContain('-->');
  });

  it('aplikuje maxLength', () => {
    const long = 'a'.repeat(1000);
    expect(sanitizeInput(long, 100).length).toBe(100);
  });

  it('provede trim', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });
});

describe('validateEmail', () => {
  it('vrátí false pro ne-string vstup', () => {
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
    expect(validateEmail(123)).toBe(false);
  });

  it('akceptuje validní emaily', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('name.last@domain.cz')).toBe(true);
    expect(validateEmail('test+tag@gmail.com')).toBe(true);
  });

  it('zamítne nevalidní emaily', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('notanemail')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('user@.com')).toBe(false);
    expect(validateEmail('user @domain.com')).toBe(false);
  });

  it('zamítne emaily nad 254 znaků', () => {
    const longLocal = 'a'.repeat(250) + '@domain.com';
    expect(validateEmail(longLocal)).toBe(false);
  });
});

describe('validatePassword', () => {
  it('vrátí valid: false pro prázdné heslo', () => {
    const result = validatePassword('');
    expect(result.valid).toBe(false);
    expect(result.score).toBe(0);
  });

  it('vrátí valid: false pro ne-string', () => {
    expect(validatePassword(null).valid).toBe(false);
    expect(validatePassword(undefined).valid).toBe(false);
  });

  it('akceptuje silné heslo', () => {
    const result = validatePassword('MyStr0ng!Pass');
    expect(result.valid).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(5);
    expect(result.checks.length).toBe(true);
    expect(result.checks.uppercase).toBe(true);
    expect(result.checks.lowercase).toBe(true);
    expect(result.checks.number).toBe(true);
    expect(result.checks.special).toBe(true);
  });

  it('zamítne slabé heslo', () => {
    const result = validatePassword('abc');
    expect(result.valid).toBe(false);
    expect(result.checks.length).toBe(false);
  });

  it('zamítne heslo bez velkého písmene', () => {
    const result = validatePassword('alllower1!');
    expect(result.checks.uppercase).toBe(false);
  });

  it('zamítne heslo bez čísla', () => {
    const result = validatePassword('NoNumber!');
    expect(result.checks.number).toBe(false);
  });

  it('zamítne heslo bez speciálního znaku', () => {
    const result = validatePassword('NoSpecial1');
    expect(result.checks.special).toBe(false);
  });
});

describe('validatePin', () => {
  it('akceptuje 4-8 číselných znaků', () => {
    expect(validatePin('1234')).toBe(true);
    expect(validatePin('12345678')).toBe(true);
  });

  it('zamítne ne-číselné PINy', () => {
    expect(validatePin('abcd')).toBe(false);
    expect(validatePin('12a4')).toBe(false);
  });

  it('zamítne příliš krátké/dlouhé PINy', () => {
    expect(validatePin('123')).toBe(false);
    expect(validatePin('123456789')).toBe(false);
  });

  it('vrátí false pro prázdný/ne-string vstup', () => {
    expect(validatePin('')).toBe(false);
    expect(validatePin(null)).toBe(false);
    expect(validatePin(undefined)).toBe(false);
  });
});

describe('validateUsername', () => {
  it('akceptuje validní username', () => {
    expect(validateUsername('john_doe')).toBe(true);
    expect(validateUsername('user123')).toBe(true);
    expect(validateUsername('abc')).toBe(true);
  });

  it('zamítne příliš krátký username', () => {
    expect(validateUsername('ab')).toBe(false);
  });

  it('zamítne username se speciálními znaky', () => {
    expect(validateUsername('john-doe')).toBe(false);
    expect(validateUsername('user name')).toBe(false);
    expect(validateUsername('user@name')).toBe(false);
  });

  it('zamítne příliš dlouhý username', () => {
    expect(validateUsername('a'.repeat(21))).toBe(false);
  });

  it('vrátí false pro prázdný/ne-string vstup', () => {
    expect(validateUsername('')).toBe(false);
    expect(validateUsername(null)).toBe(false);
  });
});

describe('validateUrl', () => {
  it('akceptuje HTTP a HTTPS URL', () => {
    expect(validateUrl('https://example.com')).toBe(true);
    expect(validateUrl('http://example.com/path')).toBe(true);
  });

  it('zamítne ne-http protokoly', () => {
    expect(validateUrl('ftp://files.com')).toBe(false);
    expect(validateUrl('file:///local')).toBe(false);
  });

  it('zamítne nevalidní URL', () => {
    expect(validateUrl('not-a-url')).toBe(false);
    expect(validateUrl('')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('akceptuje validní telefonní čísla', () => {
    expect(validatePhone('+420123456789')).toBe(true);
    expect(validatePhone('420123456789')).toBe(true);
    expect(validatePhone('+14155552671')).toBe(true);
  });

  it('zamítne nevalidní čísla', () => {
    expect(validatePhone('abc')).toBe(false);
    expect(validatePhone('0123')).toBe(false);
    expect(validatePhone('')).toBe(false);
  });

  it('zpracuje mezery v čísle', () => {
    expect(validatePhone('+420 123 456 789')).toBe(true);
  });
});

describe('detectXSS', () => {
  it('detekuje script tagy', () => {
    expect(detectXSS('<script>alert(1)</script>')).toBe(true);
  });

  it('detekuje javascript: protokol', () => {
    expect(detectXSS('javascript:alert(1)')).toBe(true);
  });

  it('detekuje event handlery', () => {
    expect(detectXSS('onclick=alert(1)')).toBe(true);
  });

  it('detekuje iframe tagy', () => {
    expect(detectXSS('<iframe src="evil.com">')).toBe(true);
  });

  it('detekuje eval()', () => {
    expect(detectXSS('eval(code)')).toBe(true);
  });

  it('nevykazuje falešně pozitivní', () => {
    expect(detectXSS('hello world')).toBe(false);
    expect(detectXSS('normal text')).toBe(false);
    expect(detectXSS('')).toBe(false);
  });

  it('nevykazuje falešně pro ne-string vstup', () => {
    expect(detectXSS(null)).toBe(false);
    expect(detectXSS(123)).toBe(false);
  });
});

describe('detectSQLInjection', () => {
  it('detekuje OR 1=1', () => {
    expect(detectSQLInjection("' OR '1'='1")).toBe(true);
    expect(detectSQLInjection("' OR 1=1")).toBe(true);
  });

  it('detekuje DROP TABLE', () => {
    expect(detectSQLInjection('; DROP TABLE users')).toBe(true);
  });

  it('detekuje UNION SELECT', () => {
    expect(detectSQLInjection('1 UNION SELECT * FROM users')).toBe(true);
  });

  it('detekuje DELETE FROM', () => {
    expect(detectSQLInjection('; DELETE FROM users')).toBe(true);
  });

  it('detekuje SQL komentáře', () => {
    expect(detectSQLInjection('1 -- comment')).toBe(true);
  });

  it('nevykazuje falešně pozitivní', () => {
    expect(detectSQLInjection('normal text')).toBe(false);
    expect(detectSQLInjection('')).toBe(false);
  });

  it('nevykazuje falešně pro ne-string vstup', () => {
    expect(detectSQLInjection(null)).toBe(false);
    expect(detectSQLInjection(123)).toBe(false);
  });
});

describe('checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimit('test_key');
  });

  it('povolí první pokus', () => {
    const result = checkRateLimit('test_key');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('sleduje počet pokusů', () => {
    checkRateLimit('test_key');
    checkRateLimit('test_key');
    const result = checkRateLimit('test_key');
    expect(result.remaining).toBe(2);
  });

  it('zamítne po překročení limitu', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('test_key');
    }
    const result = checkRateLimit('test_key');
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('resetuje po expiraci', () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit('test_key');
    }
    resetRateLimit('test_key');
    const result = checkRateLimit('test_key');
    expect(result.allowed).toBe(true);
  });

  it('použije vlastní limit a trvání', () => {
    const result = checkRateLimit('custom_key', 2, 1000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(1);
  });
});

describe('generateCSRFToken', () => {
  it('generuje hex string', () => {
    const token = generateCSRFToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBe(64);
    expect(/^[0-9a-f]+$/.test(token)).toBe(true);
  });

  it('generuje unikátní tokeny', () => {
    const t1 = generateCSRFToken();
    const t2 = generateCSRFToken();
    expect(t1).not.toBe(t2);
  });
});

describe('validateCSRFToken', () => {
  it('akceptuje shodující se tokeny', () => {
    const token = 'abc123';
    expect(validateCSRFToken(token, token)).toBe(true);
  });

  it('zamítne neshodující se tokeny', () => {
    expect(validateCSRFToken('abc', 'xyz')).toBe(false);
  });

  it('zamítne prázdné tokeny', () => {
    expect(validateCSRFToken('', 'expected')).toBe(false);
    expect(validateCSRFToken('token', '')).toBe(false);
    expect(validateCSRFToken(null, 'expected')).toBe(false);
  });

  it('používá time-safe porovnání', () => {
    const t1 = 'aaaaaaaa';
    const t2 = 'aaaaaaab';
    expect(validateCSRFToken(t1, t2)).toBe(false);
  });
});

describe('SECURITY_HEADERS', () => {
  it('obsahuje všechny potřebné hlavičky', () => {
    expect(SECURITY_HEADERS['Content-Type']).toBe('application/json');
    expect(SECURITY_HEADERS['X-Content-Type-Options']).toBe('nosniff');
    expect(SECURITY_HEADERS['X-Frame-Options']).toBe('DENY');
    expect(SECURITY_HEADERS['X-XSS-Protection']).toContain('1');
    expect(SECURITY_HEADERS['Strict-Transport-Security']).toContain('max-age');
    expect(SECURITY_HEADERS['Cache-Control']).toContain('no-store');
  });
});
