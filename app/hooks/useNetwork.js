import { useState, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
      setConnectionType(state.type || 'unknown');
      setIsOffline(!(state.isConnected ?? false));
    });
    return () => unsubscribe();
  }, []);

  return { isConnected, connectionType, isOffline };
}

export function useOnlineStatus() {
  const { isOffline } = useNetworkStatus();
  return !isOffline;
}

export function useNetworkRetry() {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = useCallback(async (fn, maxRetries = 3, delay = 1000) => {
    setIsRetrying(true);
    for (let i = 0; i < maxRetries; i++) {
      try {
        const result = await fn();
        setRetryCount(0);
        setIsRetrying(false);
        return result;
      } catch (err) {
        setRetryCount(i + 1);
        if (i < maxRetries - 1) {
          await new Promise((r) => setTimeout(r, delay * Math.pow(2, i)));
        }
      }
    }
    setIsRetrying(false);
    throw new Error('Max retries exceeded');
  }, []);

  return { retry, retryCount, isRetrying };
}
