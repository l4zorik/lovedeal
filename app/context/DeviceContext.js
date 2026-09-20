import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';

const DeviceContext = createContext(null);

const DIMS = Dimensions.get('window');

function getDeviceType() {
  const { width, height } = DIMS;
  const minDim = Math.min(width, height);
  if (minDim < 600) return 'phone';
  if (minDim < 900) return 'smallTablet';
  return 'tablet';
}

function getScreenDensity() {
  return DIMS.fontScale || 1;
}

function getDefaultInsets() {
  if (Platform.OS === 'android') return { top: StatusBar.currentHeight || 24, bottom: 0, left: 0, right: 0 };
  return { top: 44, bottom: 34, left: 0, right: 0 };
}

export function DeviceProvider({ children }) {
  const [dimensions, setDimensions] = useState({ window: DIMS, screen: Dimensions.get('screen') });
  const [deviceType, setDeviceType] = useState(getDeviceType);
  const [orientation, setOrientation] = useState(DIMS.width > DIMS.height ? 'landscape' : 'portrait');
  const [safeAreaInsets, setSafeAreaInsets] = useState(getDefaultInsets);
  const [fontScale, setFontScale] = useState(getScreenDensity);

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
      setDeviceType(getDeviceType());
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
      setFontScale(window.fontScale || 1);
    });
    return () => sub?.remove();
  }, []);

  const setSafeArea = useCallback((insets) => {
    setSafeAreaInsets(insets);
  }, []);

  const isPhone = deviceType === 'phone';
  const isTablet = deviceType === 'tablet' || deviceType === 'smallTablet';
  const isLandscape = orientation === 'landscape';
  const isPortrait = orientation === 'portrait';

  const responsive = useCallback((phoneVal, tabletVal) => {
    return isTablet ? tabletVal : phoneVal;
  }, [isTablet]);

  const scale = useCallback((size) => {
    const scaleRatio = Math.min(dimensions.window.width / 375, 1.5);
    return Math.round(size * scaleRatio);
  }, [dimensions.window.width]);

  const verticalScale = useCallback((size) => {
    const scaleRatio = Math.min(dimensions.window.height / 812, 1.5);
    return Math.round(size * scaleRatio);
  }, [dimensions.window.height]);

  return (
    <DeviceContext.Provider
      value={{
        dimensions,
        deviceType,
        orientation,
        safeAreaInsets,
        fontScale,
        isPhone,
        isTablet,
        isLandscape,
        isPortrait,
        setSafeArea,
        responsive,
        scale,
        verticalScale,
        screenWidth: dimensions.window.width,
        screenHeight: dimensions.window.height,
        screenFontScale: fontScale,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error('useDevice must be used within DeviceProvider');
  return ctx;
}

export { getDeviceType };
