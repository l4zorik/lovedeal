import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { SecurityProvider, useSecurity, hashPin, generateToken } from '../../app/context/SecurityContext';

const wrapper = ({ children }) => <SecurityProvider>{children}</SecurityProvider>;

describe('SecurityContext', () => {
  it('poskytuje výchozí stav', () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.currentUser).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.pinEnabled).toBe(false);
    expect(result.current.biometricEnabled).toBe(false);
    expect(result.current.privacyMode).toBe(false);
  });

  it('login nastaví uživatele a token', async () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    let loginResult;
    await act(async () => {
      loginResult = await result.current.login('test@email.cz', 'password');
    });
    expect(loginResult.success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.currentUser).toBeDefined();
    expect(result.current.currentUser.email).toBe('test@email.cz');
    expect(result.current.accessToken).toBeDefined();
  });

  it('logout vymaže stav', async () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    await act(async () => {
      await result.current.login('test@email.cz', 'password');
    });
    expect(result.current.isAuthenticated).toBe(true);
    await act(async () => {
      await result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.currentUser).toBeNull();
    expect(result.current.accessToken).toBeNull();
  });

  it('setPin nastaví PIN', async () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    let success;
    await act(async () => {
      success = await result.current.setPin('1234');
    });
    expect(success).toBe(true);
    expect(result.current.pinEnabled).toBe(true);
  });

  it('setPin zamítne příliš krátký PIN', async () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    let success;
    await act(async () => {
      success = await result.current.setPin('12');
    });
    expect(success).toBe(false);
  });

  it('validateEmail validuje email', () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    expect(result.current.validateEmail('test@email.cz')).toBe(true);
    expect(result.current.validateEmail('invalid')).toBe(false);
  });

  it('validatePassword hodnotí sílu hesla', () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    const strong = result.current.validatePassword('MyStr0ng!Pass');
    expect(strong.valid).toBe(true);
    const weak = result.current.validatePassword('abc');
    expect(weak.valid).toBe(false);
  });

  it('sanitizeInput čistí vstup', () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    expect(result.current.sanitizeInput('<script>alert(1)</script>')).not.toContain('<');
  });

  it('isSessionValid kontroluje platnost relace', async () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    expect(result.current.isSessionValid()).toBe(false);
    await act(async () => {
      await result.current.login('test@email.cz', 'password');
    });
    expect(result.current.isSessionValid()).toBe(true);
  });

  it('lockApp zamkne aplikaci', async () => {
    const { result } = renderHook(() => useSecurity(), { wrapper });
    await act(async () => {
      await result.current.login('test@email.cz', 'password');
    });
    await act(async () => {
      await result.current.setPin('1234');
    });
    act(() => {
      result.current.lockApp();
    });
    expect(result.current.isAuthenticated).toBe(false);
  });
});

describe('hashPin', () => {
  it('generuje konzistentní hash', () => {
    const h1 = hashPin('1234');
    const h2 = hashPin('1234');
    expect(h1).toBe(h2);
  });

  it('generuje různé hashy pro různé PINy', () => {
    const h1 = hashPin('1234');
    const h2 = hashPin('5678');
    expect(h1).not.toBe(h2);
  });

  it('vrací string', () => {
    expect(typeof hashPin('1234')).toBe('string');
  });
});

describe('generateToken', () => {
  it('generuje dlouhý hex string', () => {
    const token = generateToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(40);
  });

  it('generuje unikátní tokeny', () => {
    const t1 = generateToken();
    const t2 = generateToken();
    expect(t1).not.toBe(t2);
  });
});
