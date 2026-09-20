# Enigma 1+ - Technická Dokumentace

> 🔐 Bezpečnostní rámec pro LoveDeal aplikaci
> 📐 Rozšířená verze s technickými detaily

---

## 📐 ENIGMA 1+ PRINCIPY

```
┌─────────────────────────────────────────────────────────────┐
│                    ENIGMA 1+ FRAMEWORK                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  E - ENCRYPTION         Šifrování dat                       │
│  N - NETWORK SECURITY   Bezpečnost sítě                     │
│  I - IDENTITY           Správa identit                      │
│  G - GUARD              Ochrana dat                         │
│  M - MONITORING         Audit a logování                    │
│  A - ACCESS             Řízení přístupu                      │
│                                                             │
│  1+ - Vícevrstvá ochrana (defense in depth)                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. ENCRYPTION (E) - Šifrování

### 1.1 Typy šifrování

```
┌─────────────────────────────────────────────────────────────┐
│                    ŠIFROVACÍ STRATEGIE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  DATA AT REST (data v klidu)                                │
│  ───────────────────────────                                │
│  Algoritmus: AES-256-GCM                                   │
│  Key: Device-specific key (uložen v Keychain/Keystore)      │
│  Použití: Lokální úložiště, SQLite, cache                  │
│                                                             │
│  DATA IN TRANSIT (data při přenosu)                          │
│  ──────────────────────────────────                         │
│  Algoritmus: TLS 1.3                                       │
│  Certifikát: Certificate pinning                           │
│  Použití: API volání, WebSocket                             │
│                                                             │
│  DATA IN USE (data ve zpracování)                           │
│  ────────────────────────────────                           │
│  Algoritmus: Memory encryption (pokud dostupné)             │
│  Použití: Citlivé operace (hesla, tokeny)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Implementace

```javascript
// app/utils/encryption/EnigmaEncryption.js

import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

class EnigmaEncryption {
  constructor() {
    this.algorithm = 'AES-256-GCM';
    this.keyAlias = 'enigma_master_key';
  }

  // Generování klíče
  async generateKey() {
    const key = await Crypto.randomUUID();
    await SecureStore.setItemAsync(this.keyAlias, key);
    return key;
  }

  // Šifrování
  async encrypt(plaintext, key) {
    const iv = await Crypto.getRandomValuesAsync(16);
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    
    // AES-256-GCM
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      data
    );
    
    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted))
    };
  }

  // Dešifrování
  async decrypt(encryptedData, key) {
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
      cryptoKey,
      new Uint8Array(encryptedData.data)
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  // Hash (pro hesla)
  async hash(data) {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data
    );
  }
}

export default new EnigmaEncryption();
```

### 1.3 Key Management

```javascript
// app/utils/encryption/KeyManager.js

class KeyManager {
  constructor() {
    this.keyRotationDays = 90;  // Rotace klíčů každých 90 dní
  }

  // Získej aktivní klíč
  async getActiveKey() {
    const keyData = await SecureStore.getItemAsync('active_key');
    
    if (!keyData) {
      // Generuj nový klíč
      return await this.rotateKey();
    }
    
    const { key, createdAt } = JSON.parse(keyData);
    const age = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
    
    // Pokud je klíč starší než 90 dní, rotuj
    if (age > this.keyRotationDays) {
      return await this.rotateKey();
    }
    
    return key;
  }

  // Rotace klíče
  async rotateKey() {
    const newKey = await Crypto.randomUUID();
    const oldKey = await this.getActiveKey();
    
    // Ulož nový klíč
    await SecureStore.setItemAsync('active_key', JSON.stringify({
      key: newKey,
      createdAt: Date.now()
    }));
    
    // Archivuj starý (pro dešifrování starých dat)
    await this.archiveKey(oldKey);
    
    return newKey;
  }
}

export default new KeyManager();
```

---

## 2. NETWORK SECURITY (N) - Bezpečnost sítě

### 2.1 TLS Konfigurace

```javascript
// app/utils/network/NetworkSecurity.js

class NetworkSecurity {
  constructor() {
    this.config = {
      // TLS 1.3 povinný
      minVersion: 'TLSv1.3',
      
      // Certificate pinning
      pinning: {
        enabled: true,
        pins: [
          'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
          'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB='
        ],
        backupPins: [
          'sha256/CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC='
        ]
      },
      
      // HSTS
      hsts: {
        maxAge: 31536000,  // 1 rok
        includeSubdomains: true,
        preload: true
      }
    };
  }

  // Fetch s bezpečnostní konfigurací
  async secureFetch(url, options = {}) {
    // Validuj URL
    if (!this.isValidUrl(url)) {
      throw new Error('Invalid URL');
    }
    
    // Přidej security headers
    const secureOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    };
    
    // Proveď request
    const response = await fetch(url, secureOptions);
    
    // Ověř certificate pin
    await this.verifyPin(response);
    
    return response;
  }

  isValidUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }
}

export default new NetworkSecurity();
```

### 2.2 Certificate Pinning

```
┌─────────────────────────────────────────────────────────────┐
│                 CERTIFICATE PINNING                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SERVER CERT                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Root CA                                             │   │
│  │    └── Intermediate CA                               │   │
│  │          └── Server Certificate                      │   │
│  │                └── Public Key (SHA-256 pin)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  CLIENT VALIDATION                                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Stáhnij server certifikát                       │   │
│  │  2. Extrahuj public key                              │   │
│  │  3. Porovnej s pinem (SHA-256)                       │   │
│  │  4. Pokud nesouhlasí → REJECT                        │   │
│  │  5. Pokud souhlasí → ACCEPT                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ATTACK PREVENTION                                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✅ Man-in-the-middle                                │   │
│  │  ✅ SSL stripping                                    │   │
│  │  ✅ Rogue CA                                         │   │
│  │  ✅ Certificate forgery                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. IDENTITY (I) - Správa identit

### 3.1 Token Management

```javascript
// app/utils/identity/TokenManager.js

class TokenManager {
  constructor() {
    this.accessTokenExpiry = 15 * 60;      // 15 minut
    this.refreshTokenExpiry = 7 * 24 * 3600; // 7 dní
  }

  // Získej token
  async getTokens() {
    const tokens = await SecureStore.getItemAsync('auth_tokens');
    
    if (!tokens) {
      return null;
    }
    
    const parsed = JSON.parse(tokens);
    
    // Zkontroluj expiraci access tokenu
    if (Date.now() > parsed.accessTokenExpiry) {
      // Refresh token
      return await this.refreshTokens(parsed.refreshToken);
    }
    
    return parsed;
  }

  // Refresh token
  async refreshTokens(refreshToken) {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    
    const newTokens = await response.json();
    
    // Ulož nové tokeny
    await SecureStore.setItemAsync('auth_tokens', JSON.stringify({
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
      accessTokenExpiry: Date.now() + (this.accessTokenExpiry * 1000),
      refreshTokenExpiry: Date.now() + (this.refreshTokenExpiry * 1000)
    }));
    
    return newTokens;
  }

  // Odhlášení
  async logout() {
    // Vymaž tokeny
    await SecureStore.deleteItemAsync('auth_tokens');
    
    // Vymaž cache
    await this.clearCache();
    
    // Resetuj stav
    return { success: true };
  }
}

export default new TokenManager();
```

### 3.2 Biometrická autentizace

```javascript
// app/utils/identity/BiometricAuth.js

import * as LocalAuthentication from 'expo-local-authentication';

class BiometricAuth {
  // Zkontroluj dostupnost
  async isAvailable() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return compatible && enrolled;
  }

  // Autentizace
  async authenticate() {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Přihlaste se k LoveDeal',
      cancelLabel: 'Zrušit',
      disableDeviceFallback: false,
      fallbackLabel: 'Použít PIN'
    });
    
    return result.success;
  }

  // Typ biometrie
  async getBiometricType() {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'face';
    } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'fingerprint';
    }
    
    return 'none';
  }
}

export default new BiometricAuth();
```

---

## 4. GUARD (G) - Ochrana dat

### 4.1 Screen Protection

```javascript
// app/utils/guard/ScreenGuard.js

import * as ScreenCapture from 'expo-screen-capture';

class ScreenGuard {
  constructor() {
    this.isProtected = false;
  }

  // Aktivuj ochranu
  async activate() {
    if (this.isProtected) return;
    
    // Zakáž screenshoty
    await ScreenCapture.preventScreenCaptureAsync();
    
    // naslouchávej události
    this.subscription = ScreenCapture.addScreenshotListener(() => {
      this.onScreenshotAttempt();
    });
    
    this.isProtected = true;
  }

  // Při pokusu o screenshot
  onScreenshotAttempt() {
    // 1. Zapni blurred overlay
    this.showBlurOverlay();
    
    // 2. Pošli alert na server
    this.reportAttempt();
    
    // 3. Haptic feedback
    this.hapticFeedback();
  }

  // Dezaktivuj ochranu
  async deactivate() {
    if (!this.isProtected) return;
    
    await ScreenCapture.allowScreenCaptureAsync();
    
    if (this.subscription) {
      this.subscription.remove();
    }
    
    this.isProtected = false;
  }
}

export default new ScreenGuard();
```

### 4.2 Root/Jailbreak Detection

```javascript
// app/utils/guard/DeviceGuard.js

class DeviceGuard {
  // Detekce root/jailbreak
  async isDeviceCompromised() {
    const checks = [
      await this.checkForRoot(),
      await this.checkForJailbreak(),
      await this.checkForEmulator(),
      await this.checkForHooking()
    ];
    
    return checks.some(check => check.compromised);
  }

  async checkForRoot() {
    // Android: Kontrola su binary, Magisk, etc.
    try {
      const result = await FileSystem.exists('/system/app/Superuser.apk');
      return { compromised: result, reason: 'Root detected' };
    } catch {
      return { compromised: false };
    }
  }

  async checkForJailbreak() {
    // iOS: Kontrola Cydia, Sileo, etc.
    try {
      const result = await FileSystem.exists('/Applications/Cydia.app');
      return { compromised: result, reason: 'Jailbreak detected' };
    } catch {
      return { compromised: false };
    }
  }

  async checkForEmulator() {
    // Kontrola emulatoru
    const isEmulator = Platform.isEmulator;
    return { compromised: isEmulator, reason: 'Emulator detected' };
  }

  async checkForHooking() {
    // Detekce hookingu (Frida, Xposed)
    // Kontrola známých portů a procesů
    return { compromised: false };
  }
}

export default new DeviceGuard();
```

---

## 5. MONITORING (M) - Audit a logování

### 5.1 Audit Logger

```javascript
// app/utils/monitoring/AuditLogger.js

class AuditLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
  }

  // Log události
  log(event) {
    const entry = {
      timestamp: Date.now(),
      level: event.level || 'info',
      category: event.category,
      action: event.action,
      details: event.details,
      userId: event.userId,
      sessionId: event.sessionId,
      deviceInfo: this.getDeviceInfo()
    };
    
    this.logs.push(entry);
    
    // Odesli na server (asynchronně)
    this.sendToServer(entry);
    
    // Ulož lokálně
    this.saveLocally(entry);
    
    // Pokud je level ERROR, odesli okamžitě
    if (event.level === 'error') {
      this.flushImmediately();
    }
  }

  // Bezpečnostní logy
  logSecurity(event) {
    this.log({
      level: 'security',
      category: 'security',
      ...event
    });
  }

  // Auth logy
  logAuth(event) {
    this.log({
      level: 'info',
      category: 'auth',
      ...event
    });
  }

  // Chybové logy
  logError(error, context = {}) {
    this.log({
      level: 'error',
      category: 'error',
      action: error.message,
      details: {
        stack: error.stack,
        ...context
      }
    });
  }
}

export default new AuditLogger();
```

### 5.2 Log retention

```
┌─────────────────────────────────────────────────────────────┐
│                    RETENTION POLICY                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TYP LOGU              RETENCE         UMÍSTĚNÍ             │
│  ─────────────────────────────────────────────────────      │
│  Security logs         90 dnů          Server + Local       │
│  Auth logs             30 dnů          Server               │
│  Audit logs            1 rok           Server               │
│  Error logs            14 dnů          Server               │
│  Performance logs      7 dnů           Local                │
│                                                             │
│  MAZÁNÍ: Automatické po expiraci                           │
│  ŠIFROVání: AES-256 pro všechny logy                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. ACCESS (A) - Řízení přístupu

### 6.1 Role-Based Access Control

```javascript
// app/utils/access/AccessControl.js

class AccessControl {
  constructor() {
    this.roles = {
      'user': {
        permissions: [
          'deal:read',
          'deal:create',
          'profile:read',
          'profile:write'
        ]
      },
      'premium': {
        permissions: [
          'deal:read',
          'deal:create',
          'deal:feature',
          'profile:read',
          'profile:write',
          'analytics:read'
        ]
      },
      'admin': {
        permissions: [
          'deal:read',
          'deal:create',
          'deal:delete',
          'user:read',
          'user:manage',
          'analytics:read',
          'settings:manage'
        ]
      }
    };
  }

  // Zkontroluj oprávnění
  hasPermission(userRole, permission) {
    const role = this.roles[userRole];
    if (!role) return false;
    
    return role.permissions.includes(permission);
  }

  // chráněná route
  async guard(permission, callback) {
    const user = await this.getCurrentUser();
    
    if (!user || !this.hasPermission(user.role, permission)) {
      return this.unauthorized();
    }
    
    return callback();
  }
}

export default new AccessControl();
```

### 6.2 Rate Limiting

```javascript
// app/utils/access/RateLimiter.js

class RateLimiter {
  constructor() {
    this.limits = {
      'api': { max: 100, window: 60 },      // 100 req/min
      'auth': { max: 5, window: 300 },      // 5 pokusů/5 min
      'upload': { max: 10, window: 3600 },  // 10 uploadů/hod
      'search': { max: 30, window: 60 }     // 30 search/min
    };
    
    this.counters = {};
  }

  // Zkontroluj limit
  async checkLimit(endpoint) {
    const limit = this.limits[endpoint];
    if (!limit) return true;
    
    const key = `${endpoint}:${await this.getUserId()}`;
    const now = Date.now();
    
    // Získej počet požadavků v okně
    const requests = await this.getRequests(key, limit.window);
    const recentRequests = requests.filter(r => r > now - (limit.window * 1000));
    
    if (recentRequests.length >= limit.max) {
      return false;  // Limit exceeded
    }
    
    // Přidej nový požadavek
    await this.addRequest(key, now);
    
    return true;
  }

  // Retry-After header
  getRetryAfter(endpoint) {
    const limit = this.limits[endpoint];
    return limit ? limit.window : 60;
  }
}

export default new RateLimiter();
```

---

## 📋 CHECKLIST - Enigma 1+ Implementace

### Encryption
- [ ] AES-256-GCM pro data at rest
- [ ] TLS 1.3 pro data in transit
- [ ] Key rotation (90 dní)
- [ ] Secure key storage (Keychain/Keystore)

### Network Security
- [ ] Certificate pinning
- [ ] HSTS headers
- [ ] Input validation
- [ ] SQL injection prevence

### Identity
- [ ] JWT token management
- [ ] Refresh token rotation
- [ ] Biometrická autentizace
- [ ] Session timeout

### Guard
- [ ] Screen capture detection
- [ ] Root/jailbreak detection
- [ ] Debugger detection
- [ ] Tamper detection

### Monitoring
- [ ] Audit logging
- [ ] Security event logging
- [ ] Error tracking
- [ ] Performance monitoring

### Access
- [ ] Role-based access control
- [ ] Rate limiting
- [ ] API key management
- [ ] Permission checks

---

> 📅 Poslední aktualizace: 2026-09-20
> 👤 Autor: MaxiGreens a.s.
> 🔐 Enigma 1+ principy: Šifrovaný, auditovaný, izolovaný
