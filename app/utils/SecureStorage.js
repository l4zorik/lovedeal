import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const PREFIX = '@lovedeal_';
const CACHE_PREFIX = '@lovedeal_cache_';

const SECURE_PREFIX = 'lovedeal_secure_';
const SENSITIVE_KEYS = ['token', 'refresh', 'pin', 'auth', 'credentials', 'secret', 'password'];

function isSensitiveKey(key) {
  return SENSITIVE_KEYS.some((sk) => key.toLowerCase().includes(sk));
}

async function deriveKey() {
  const raw = Crypto.randomUUID();
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return 'k_' + Math.abs(hash).toString(36);
}

const obfuscationKey = deriveKey();

function xorObfuscate(data, key) {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function encodeValue(value, key) {
  const str = JSON.stringify(value);
  const obfuscated = xorObfuscate(str, key);
  return btoa(unescape(encodeURIComponent(obfuscated)));
}

function decodeValue(encoded, key) {
  try {
    const obfuscated = decodeURIComponent(escape(atob(encoded)));
    const str = xorObfuscate(obfuscated, key);
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export const SecureStorage = {
  async set(key, value) {
    try {
      if (isSensitiveKey(key)) {
        await SecureStore.setItemAsync(SECURE_PREFIX + key, JSON.stringify(value));
        return true;
      }
      const encoded = encodeValue(value, obfuscationKey);
      await AsyncStorage.setItem(PREFIX + key, encoded);
      return true;
    } catch {
      return false;
    }
  },

  async get(key) {
    try {
      if (isSensitiveKey(key)) {
        const raw = await SecureStore.getItemAsync(SECURE_PREFIX + key);
        return raw ? JSON.parse(raw) : null;
      }
      const raw = await AsyncStorage.getItem(PREFIX + key);
      if (!raw) return null;
      return decodeValue(raw, obfuscationKey);
    } catch {
      return null;
    }
  },

  async remove(key) {
    try {
      if (isSensitiveKey(key)) {
        await SecureStore.deleteItemAsync(SECURE_PREFIX + key);
        return true;
      }
      await AsyncStorage.removeItem(PREFIX + key);
      return true;
    } catch {
      return false;
    }
  },

  async exists(key) {
    try {
      if (isSensitiveKey(key)) {
        const val = await SecureStore.getItemAsync(SECURE_PREFIX + key);
        return val !== null;
      }
      const raw = await AsyncStorage.getItem(PREFIX + key);
      return raw !== null;
    } catch {
      return false;
    }
  },

  async clear() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const lovedealKeys = keys.filter((k) => k.startsWith(PREFIX));
      await AsyncStorage.multiRemove(lovedealKeys);
      return true;
    } catch {
      return false;
    }
  },

  async multiGet(keys) {
    try {
      const results = [];
      for (const key of keys) {
        const val = await this.get(key);
        results.push([key, val]);
      }
      return results;
    } catch {
      return [];
    }
  },

  async multiSet(keyValuePairs) {
    try {
      for (const [k, v] of keyValuePairs) {
        await this.set(k, v);
      }
      return true;
    } catch {
      return false;
    }
  },

  async getSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const lovedealKeys = keys.filter((k) => k.startsWith(PREFIX));
      let totalSize = 0;
      for (const key of lovedealKeys) {
        const val = await AsyncStorage.getItem(key);
        if (val) totalSize += val.length * 2;
      }
      return { bytes: totalSize, mb: (totalSize / (1024 * 1024)).toFixed(2) };
    } catch {
      return { bytes: 0, mb: '0.00' };
    }
  },
};

export const CacheStorage = {
  async set(key, value, ttl = 3600000) {
    try {
      const entry = { value, expiry: Date.now() + ttl, created: Date.now() };
      const encoded = encodeValue(entry, obfuscationKey);
      await AsyncStorage.setItem(CACHE_PREFIX + key, encoded);
      return true;
    } catch {
      return false;
    }
  },

  async get(key) {
    try {
      const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;
      const entry = decodeValue(raw, obfuscationKey);
      if (!entry || Date.now() > entry.expiry) {
        await AsyncStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
      return entry.value;
    } catch {
      return null;
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
      return true;
    } catch {
      return false;
    }
  },

  async clearExpired() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
      let cleared = 0;
      for (const key of cacheKeys) {
        const raw = await AsyncStorage.getItem(key);
        if (raw) {
          const entry = decodeValue(raw, obfuscationKey);
          if (!entry || Date.now() > entry.expiry) {
            await AsyncStorage.removeItem(key);
            cleared++;
          }
        }
      }
      return cleared;
    } catch {
      return 0;
    }
  },

  async clearAll() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
      return true;
    } catch {
      return false;
    }
  },

  async getSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
      let totalSize = 0;
      for (const key of cacheKeys) {
        const val = await AsyncStorage.getItem(key);
        if (val) totalSize += val.length * 2;
      }
      return { bytes: totalSize, mb: (totalSize / (1024 * 1024)).toFixed(2) };
    } catch {
      return { bytes: 0, mb: '0.00' };
    }
  },
};

export default SecureStorage;
