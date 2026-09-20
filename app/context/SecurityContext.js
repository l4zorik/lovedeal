import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import * as Crypto from 'expo-crypto';

const SecurityContext = createContext(null);

const STORAGE_KEY_AUTH = '@lovedeal_auth';
const STORAGE_KEY_PIN = '@lovedeal_pin';
const STORAGE_KEY_BIOMETRIC = '@lovedeal_biometric';
const STORAGE_KEY_PRIVACY = '@lovedeal_privacy';
const STORAGE_KEY_LOCK_TIMEOUT = '@lovedeal_lock_timeout';

const SECURE_KEY_TOKEN = 'lovedeal_access_token';
const SECURE_KEY_REFRESH = 'lovedeal_refresh_token';

const PBKDF2_ITERATIONS = 100000;
const SALT_LENGTH = 32;

function generateToken() {
  return Crypto.randomUUID().replace(/-/g, '') + Crypto.randomUUID().replace(/-/g, '');
}

function arrayToHex(arr) {
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

function hexToArray(hex) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return arr;
}

async function generateSalt() {
  const salt = new Uint8Array(SALT_LENGTH);
  for (let i = 0; i < SALT_LENGTH; i++) {
    salt[i] = Math.floor(Math.random() * 256);
  }
  return arrayToHex(salt);
}

async function hashPin(pin, existingSalt) {
  const salt = existingSalt || await generateSalt();
  const data = new TextEncoder().encode(pin + salt);
  let hash = 0;
  for (let round = 0; round < PBKDF2_ITERATIONS; round++) {
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data[i]) | 0;
      for (let j = 0; j < 8; j++) {
        hash = ((hash << 13) ^ (hash >> 7) + ((hash * 31) & 0x7FFFFFFF)) | 0;
      }
    }
    data[0] = (data[0] + 1) & 0xFF;
  }
  return salt + ':' + arrayToHex(new Uint8Array(new Int32Array([hash]).buffer));
}

export function SecurityProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [appLockTimeoutState, setAppLockTimeoutState] = useState(300000);

  const authLoadedRef = useRef(false);

  const setAppLockTimeout = useCallback(async (value) => {
    setAppLockTimeoutState(value);
    await AsyncStorage.setItem(STORAGE_KEY_LOCK_TIMEOUT, String(value));
  }, []);

  useEffect(() => {
    loadAuthState();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > appLockTimeoutState) {
        lockApp();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, lastActivity, appLockTimeoutState]);

  const loadAuthState = async () => {
    try {
      const [authData, token, refresh, pin, bio, privacy, lockTimeout] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_AUTH),
        SecureStore.getItemAsync(SECURE_KEY_TOKEN),
        SecureStore.getItemAsync(SECURE_KEY_REFRESH),
        AsyncStorage.getItem(STORAGE_KEY_PIN),
        AsyncStorage.getItem(STORAGE_KEY_BIOMETRIC),
        AsyncStorage.getItem(STORAGE_KEY_PRIVACY),
        AsyncStorage.getItem(STORAGE_KEY_LOCK_TIMEOUT),
      ]);
      if (authData && token) {
        setCurrentUser(JSON.parse(authData));
        setAccessToken(token);
        setRefreshToken(refresh);
        setIsAuthenticated(true);
        setLastActivity(Date.now());
      }
      if (!authLoadedRef.current) {
        setPinEnabled(!!pin);
        setBiometricEnabled(bio === 'true');
        setPrivacyMode(privacy === 'true');
      }
      if (lockTimeout) setAppLockTimeout(Number(lockTimeout));
      authLoadedRef.current = true;
    } catch (e) {
      if (__DEV__) console.warn('Auth state load failed:', e?.message);
    }
  };

  const saveAuthState = async (user, token, refresh) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user)),
        SecureStore.setItemAsync(SECURE_KEY_TOKEN, token),
        SecureStore.setItemAsync(SECURE_KEY_REFRESH, refresh),
      ]);
    } catch {}
  };

  const clearAuthState = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEY_AUTH),
        SecureStore.deleteItemAsync(SECURE_KEY_TOKEN),
        SecureStore.deleteItemAsync(SECURE_KEY_REFRESH),
      ]);
    } catch {}
  };

  const login = useCallback(async (email, password) => {
    const token = generateToken();
    const refresh = generateToken();
    const expiry = Date.now() + 3600000;
    const user = {
      id: Crypto.randomUUID(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
      avatar: null,
      verified: false,
    };
    setCurrentUser(user);
    setAccessToken(token);
    setRefreshToken(refresh);
    setSessionExpiry(expiry);
    setIsAuthenticated(true);
    setLastActivity(Date.now());
    await saveAuthState(user, token, refresh);
    return { success: true, user };
  }, []);

  const logout = useCallback(async () => {
    setCurrentUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setSessionExpiry(null);
    setIsAuthenticated(false);
    await clearAuthState();
  }, []);

  const lockApp = useCallback(async () => {
    if (pinEnabled || biometricEnabled) {
      setIsAuthenticated(false);
    }
  }, [pinEnabled, biometricEnabled]);

  const pinAttemptsRef = useRef(0);
  const pinLockoutRef = useRef(0);

  const unlockApp = useCallback(async (pin) => {
    if (pinEnabled) {
      const now = Date.now();
      if (now < pinLockoutRef.current) {
        return false;
      }
      if (pinAttemptsRef.current >= 5) {
        pinLockoutRef.current = now + 300000;
        pinAttemptsRef.current = 0;
        return false;
      }
      const storedPin = await AsyncStorage.getItem(STORAGE_KEY_PIN);
      if (storedPin && storedPin.includes(':')) {
        const [salt] = storedPin.split(':');
        const hashed = await hashPin(pin, salt);
        if (hashed === storedPin) {
          pinAttemptsRef.current = 0;
          setIsAuthenticated(true);
          setLastActivity(Date.now());
          return true;
        }
      }
      pinAttemptsRef.current++;
      return false;
    }
    setIsAuthenticated(true);
    setLastActivity(Date.now());
    return true;
  }, [pinEnabled]);

  const setPin = useCallback(async (pin) => {
    if (!pin || typeof pin !== 'string' || !/^\d{4,8}$/.test(pin)) return false;
    const hashed = await hashPin(pin);
    await AsyncStorage.setItem(STORAGE_KEY_PIN, hashed);
    authLoadedRef.current = true;
    setPinEnabled(true);
    return true;
  }, []);

  const removePin = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY_PIN);
    setPinEnabled(false);
  }, []);

  const enableBiometric = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY_BIOMETRIC, 'true');
    setBiometricEnabled(true);
  }, []);

  const disableBiometric = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY_BIOMETRIC, 'false');
    setBiometricEnabled(false);
  }, []);

  const setPrivacy = useCallback(async (enabled) => {
    await AsyncStorage.setItem(STORAGE_KEY_PRIVACY, JSON.stringify(enabled));
    setPrivacyMode(enabled);
  }, []);

  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  const refreshSession = useCallback(async () => {
    if (!refreshToken) return false;
    const newToken = generateToken();
    const expiry = Date.now() + 3600000;
    setAccessToken(newToken);
    setSessionExpiry(expiry);
    setLastActivity(Date.now());
    if (currentUser) {
      await saveAuthState(currentUser, newToken, refreshToken);
    }
    return true;
  }, [refreshToken, currentUser]);

  const isSessionValid = useCallback(() => {
    if (!isAuthenticated) return false;
    if (sessionExpiry && Date.now() > sessionExpiry) return false;
    return true;
  }, [isAuthenticated, sessionExpiry]);

  const sanitizeInput = useCallback((input) => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/data:/gi, '')
      .trim()
      .slice(0, 500);
  }, []);

  const validateEmail = useCallback((email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, []);

  const validatePassword = useCallback((password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
    const score = Object.values(checks).filter(Boolean).length;
    return { valid: score >= 4, score, checks };
  }, []);

  return (
    <SecurityContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        pinEnabled,
        biometricEnabled,
        privacyMode,
        sessionExpiry,
        lastActivity,
        appLockTimeout: appLockTimeoutState,
        setAppLockTimeout,
        login,
        logout,
        lockApp,
        unlockApp,
        setPin,
        removePin,
        enableBiometric,
        disableBiometric,
        setPrivacy,
        updateActivity,
        refreshSession,
        isSessionValid,
        sanitizeInput,
        validateEmail,
        validatePassword,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const ctx = useContext(SecurityContext);
  if (!ctx) throw new Error('useSecurity must be used within SecurityProvider');
  return ctx;
}

export { generateToken };
