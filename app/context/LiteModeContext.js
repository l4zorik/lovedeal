import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LiteModeContext = createContext();

const LITE_CONFIG = {
  animations: false,
  haptics: false,
  parallax: false,
  spinningDisc: false,
  autoAdvance: false,
  progressBar: false,
  imagePreload: 0,
  maxToRenderPerBatch: 1,
  windowSize: 1,
  dataSaver: true,
  offlineCache: true,
  autoScroll: false,
  reducedImages: true,
  simpleGradients: true,
  skipHeavyRender: true,
};

const FULL_CONFIG = {
  animations: true,
  haptics: true,
  parallax: true,
  spinningDisc: true,
  autoAdvance: true,
  progressBar: true,
  imagePreload: 2,
  maxToRenderPerBatch: 2,
  windowSize: 3,
  dataSaver: false,
  offlineCache: false,
  autoScroll: false,
  reducedImages: false,
  simpleGradients: false,
  skipHeavyRender: false,
};

export function LiteModeProvider({ children }) {
  const [isLite, setIsLite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState(FULL_CONFIG);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    loadLiteMode();
  }, []);

  useEffect(() => {
    setConfig(isLite ? LITE_CONFIG : FULL_CONFIG);
  }, [isLite]);

  const loadLiteMode = async () => {
    try {
      const value = await AsyncStorage.getItem('liteMode');
      setIsLite(value === 'true');
    } catch (e) {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLiteMode = useCallback(async () => {
    const newValue = !isLite;
    setIsLite(newValue);
    try {
      await AsyncStorage.setItem('liteMode', String(newValue));
    } catch (e) {
      // silent
    }
  }, [isLite]);

  const cacheImage = useCallback((uri) => {
    if (!config.offlineCache) return;
    cacheRef.current.set(uri, { cached: true, timestamp: Date.now() });
  }, [config.offlineCache]);

  const isImageCached = useCallback((uri) => {
    return cacheRef.current.has(uri);
  }, []);

  const getCacheSize = useCallback(() => {
    return cacheRef.current.size;
  }, []);

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  const updateConfig = useCallback((newConfig) => {
    setConfig(newConfig);
  }, []);

  return (
    <LiteModeContext.Provider
      value={{
        isLite,
        toggleLiteMode,
        isLoading,
        config,
        updateConfig,
        cacheImage,
        isImageCached,
        getCacheSize,
        clearCache,
      }}
    >
      {children}
    </LiteModeContext.Provider>
  );
}

export function useLiteMode() {
  const context = useContext(LiteModeContext);
  if (!context) {
    throw new Error('useLiteMode must be used within a LiteModeProvider');
  }
  return context;
}

export { LITE_CONFIG, FULL_CONFIG };
