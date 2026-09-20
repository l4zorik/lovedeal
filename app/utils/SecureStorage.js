import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@lovedeal_';
const CACHE_PREFIX = '@lovedeal_cache_';
const MAX_CACHE_SIZE = 50 * 1024 * 1024;

function generateKey() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function xorEncode(data, key) {
  let encoded = '';
  for (let i = 0; i < data.length; i++) {
    encoded += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return encoded;
}

function utf8ToBinary(str) {
  return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)));
}

function binaryToUtf8(str) {
  return decodeURIComponent(str.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

function encodeValue(value, key) {
  const str = JSON.stringify(value);
  const encoded = xorEncode(str, key);
  return btoa(utf8ToBinary(encoded));
}

function decodeValue(encoded, key) {
  try {
    const decoded = binaryToUtf8(atob(encoded));
    const str = xorEncode(decoded, key);
    return JSON.parse(str);
  } catch {
    return null;
  }
}

const encryptionKey = generateKey();

export const SecureStorage = {
  async set(key, value) {
    try {
      const encoded = encodeValue(value, encryptionKey);
      await AsyncStorage.setItem(PREFIX + key, encoded);
      return true;
    } catch {
      return false;
    }
  },

  async get(key) {
    try {
      const raw = await AsyncStorage.getItem(PREFIX + key);
      if (!raw) return null;
      return decodeValue(raw, encryptionKey);
    } catch {
      return null;
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(PREFIX + key);
      return true;
    } catch {
      return false;
    }
  },

  async exists(key) {
    try {
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
      const pairs = await AsyncStorage.multiGet(keys.map((k) => PREFIX + k));
      return pairs.map(([k, v]) => [k.replace(PREFIX, ''), v ? decodeValue(v, encryptionKey) : null]);
    } catch {
      return [];
    }
  },

  async multiSet(keyValuePairs) {
    try {
      const pairs = keyValuePairs.map(([k, v]) => [PREFIX + k, encodeValue(v, encryptionKey)]);
      await AsyncStorage.multiSet(pairs);
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
      const encoded = encodeValue(entry, encryptionKey);
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
      const entry = decodeValue(raw, encryptionKey);
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
          const entry = decodeValue(raw, encryptionKey);
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
