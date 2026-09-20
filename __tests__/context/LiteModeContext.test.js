import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { LiteModeProvider, useLiteMode, LITE_CONFIG, FULL_CONFIG } from '../../app/context/LiteModeContext';

const wrapper = ({ children }) => <LiteModeProvider>{children}</LiteModeProvider>;

describe('LiteModeContext', () => {
  it('poskytuje výchozí config', () => {
    const { result } = renderHook(() => useLiteMode(), { wrapper });
    expect(result.current.config).toBeDefined();
    expect(result.current.isLite).toBe(false);
  });

  it('LITE_CONFIG má vše vypnuté', () => {
    expect(LITE_CONFIG.animations).toBe(false);
    expect(LITE_CONFIG.haptics).toBe(false);
    expect(LITE_CONFIG.parallax).toBe(false);
    expect(LITE_CONFIG.spinningDisc).toBe(false);
    expect(LITE_CONFIG.autoAdvance).toBe(false);
    expect(LITE_CONFIG.progressBar).toBe(false);
    expect(LITE_CONFIG.dataSaver).toBe(true);
    expect(LITE_CONFIG.offlineCache).toBe(true);
  });

  it('FULL_CONFIG má vše zapnuté', () => {
    expect(FULL_CONFIG.animations).toBe(true);
    expect(FULL_CONFIG.haptics).toBe(true);
    expect(FULL_CONFIG.parallax).toBe(true);
    expect(FULL_CONFIG.spinningDisc).toBe(true);
    expect(FULL_CONFIG.autoAdvance).toBe(true);
    expect(FULL_CONFIG.progressBar).toBe(true);
    expect(FULL_CONFIG.dataSaver).toBe(false);
  });

  it('toggleLiteMode přepíná isLite', () => {
    const { result } = renderHook(() => useLiteMode(), { wrapper });
    expect(result.current.isLite).toBe(false);
    act(() => {
      result.current.toggleLiteMode();
    });
    expect(result.current.isLite).toBe(true);
    act(() => {
      result.current.toggleLiteMode();
    });
    expect(result.current.isLite).toBe(false);
  });

  it('updateConfig nastaví vlastní config', () => {
    const { result } = renderHook(() => useLiteMode(), { wrapper });
    act(() => {
      result.current.updateConfig({ animations: false, haptics: true });
    });
    expect(result.current.config.animations).toBe(false);
    expect(result.current.config.haptics).toBe(true);
  });

  it('cacheImage a isImageCached fungují', () => {
    const { result } = renderHook(() => useLiteMode(), { wrapper });
    act(() => {
      result.current.updateConfig({ offlineCache: true });
    });
    act(() => {
      result.current.cacheImage('https://example.com/img.jpg');
    });
    expect(result.current.isImageCached('https://example.com/img.jpg')).toBe(true);
  });

  it('getCacheSize vrací velikost cache', () => {
    const { result } = renderHook(() => useLiteMode(), { wrapper });
    act(() => {
      result.current.updateConfig({ offlineCache: true });
    });
    act(() => {
      result.current.cacheImage('img1');
      result.current.cacheImage('img2');
    });
    expect(result.current.getCacheSize()).toBe(2);
  });

  it('clearCache vymaže cache', () => {
    const { result } = renderHook(() => useLiteMode(), { wrapper });
    act(() => {
      result.current.updateConfig({ offlineCache: true });
    });
    act(() => {
      result.current.cacheImage('img1');
    });
    expect(result.current.getCacheSize()).toBe(1);
    act(() => {
      result.current.clearCache();
    });
    expect(result.current.getCacheSize()).toBe(0);
  });
});
