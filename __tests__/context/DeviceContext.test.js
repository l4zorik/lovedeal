import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { DeviceProvider, useDevice, getDeviceType } from '../../app/context/DeviceContext';

const wrapper = ({ children }) => <DeviceProvider>{children}</DeviceProvider>;

describe('DeviceContext', () => {
  it('poskytuje device info', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });
    expect(result.current.deviceType).toBeDefined();
    expect(result.current.orientation).toBeDefined();
    expect(result.current.isPhone !== undefined || result.current.isTablet !== undefined).toBe(true);
  });

  it('poskytuje scale funkci', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });
    expect(typeof result.current.scale).toBe('function');
    const scaled = result.current.scale(16);
    expect(typeof scaled).toBe('number');
    expect(scaled).toBeGreaterThan(0);
  });

  it('poskytuje verticalScale funkci', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });
    expect(typeof result.current.verticalScale).toBe('function');
  });

  it('poskytuje responsive funkci', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });
    expect(typeof result.current.responsive).toBe('function');
  });

  it('poskytuje rozměry obrazovky', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });
    expect(result.current.screenWidth).toBeGreaterThan(0);
    expect(result.current.screenHeight).toBeGreaterThan(0);
  });

  it('poskytuje fontScale', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });
    expect(result.current.fontScale).toBeGreaterThanOrEqual(1);
  });
});

describe('getDeviceType', () => {
  it('vrací string', () => {
    const type = getDeviceType();
    expect(['phone', 'smallTablet', 'tablet']).toContain(type);
  });
});
