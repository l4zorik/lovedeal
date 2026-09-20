import { useState, useEffect, useCallback } from 'react';
import { Dimensions, Platform, AppState } from 'react-native';

export function useScreenSize() {
  const [size, setSize] = useState(Dimensions.get('window'));

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setSize(window);
    });
    return () => sub?.remove();
  }, []);

  return {
    width: size.width,
    height: size.height,
    isPhone: Math.min(size.width, size.height) < 600,
    isTablet: Math.min(size.width, size.height) >= 600,
    isLandscape: size.width > size.height,
  };
}

export function useSafeAreaInsets() {
  const { useSafeAreaInsets: getInsets } = require('react-native-safe-area-context');
  const insets = getInsets();
  return insets || { top: 44, bottom: 34, left: 0, right: 0 };
}

export function useAppState() {
  const [state, setState] = useState(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      setState(next);
    });
    return () => sub?.remove();
  }, []);

  return {
    state,
    isForeground: state === 'active',
    isBackground: state === 'background',
  };
}

export function useOrientation() {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });
    return () => sub?.remove();
  }, []);

  return {
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
}

export function useResponsive() {
  const { width, height, isPhone, isTablet } = useScreenSize();

  const scale = useCallback((size) => {
    const ratio = Math.min(width / 375, 1.5);
    return Math.round(size * ratio);
  }, [width]);

  const verticalScale = useCallback((size) => {
    const ratio = Math.min(height / 812, 1.5);
    return Math.round(size * ratio);
  }, [height]);

  const moderateScale = useCallback((size, factor = 0.5) => {
    const ratio = Math.min(width / 375, 1.5);
    return Math.round(size + (ratio - 1) * size * factor);
  }, [width]);

  const responsiveValue = useCallback((phoneVal, tabletVal) => {
    return isTablet ? tabletVal : phoneVal;
  }, [isTablet]);

  return { scale, verticalScale, moderateScale, responsiveValue, isPhone, isTablet, width, height };
}

export function useKeyboard() {
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const showSub = Dimensions.addEventListener('change', ({ window }) => {
      const screen = Dimensions.get('screen');
      setHeight(screen.height - window.height);
      setVisible(screen.height - window.height > 0);
    });
    return () => showSub?.remove();
  }, []);

  return { visible, height };
}
