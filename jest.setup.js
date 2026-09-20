jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  })),
  digestStringAsync: jest.fn(() => Promise.resolve('mock-hash')),
  CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
}));

jest.mock('@react-native-async-storage/async-storage', () => {
  const store = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn(async (key) => store[key] || null),
      setItem: jest.fn(async (key, value) => { store[key] = value; }),
      removeItem: jest.fn(async (key) => { delete store[key]; }),
      clear: jest.fn(async () => { Object.keys(store).forEach((k) => delete store[k]); }),
    },
  };
});

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

jest.mock('expo-image', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => {
      const { View } = require('react-native');
      return React.createElement(View, { ...props, ref });
    }),
  };
});

jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

jest.mock('expo-navigation-bar', () => ({
  setButtonStyleAsync: jest.fn(),
  setBackgroundColorAsync: jest.fn(),
}));

jest.mock('expo-screen-capture', () => ({
  preventScreenCaptureAsync: jest.fn(),
  allowScreenCaptureAsync: jest.fn(),
  addScreenCaptureListener: jest.fn(() => ({ remove: jest.fn() })),
}));

jest.mock('expo-av', () => {
  const React = require('react');
  return {
    __esModule: true,
    Video: React.forwardRef((props, ref) => {
      const { View } = require('react-native');
      return React.createElement(View, { ...props, ref });
    }),
    Audio: { setAudioModeAsync: jest.fn(), setIsEnabledAsync: jest.fn() },
  };
});

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(() => Promise.resolve(true)),
  isEnrolledAsync: jest.fn(() => Promise.resolve(true)),
  authenticateAsync: jest.fn(() => Promise.resolve({ success: true })),
  getEnrolledLevelAsync: jest.fn(() => Promise.resolve(2)),
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  setItemAsync: jest.fn(() => Promise.resolve()),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
  setStatusBarStyle: jest.fn(),
  setStatusBarHidden: jest.fn(),
}));
