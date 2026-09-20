import { useEffect, useCallback } from 'react';
import { Linking } from 'react-native';
import * as LinkingExpo from 'expo-linking';

const DEEP_LINK_PREFIX = 'lovedeal://';

export function useDeepLinking(onNavigate) {
  const handleUrl = useCallback((url) => {
    if (!url) return;
    const path = url.replace(DEEP_LINK_PREFIX, '');
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 0) return;
    const screen = parts[0];
    const params = parts.slice(1);
    onNavigate?.(screen, params);
  }, [onNavigate]);

  useEffect(() => {
    LinkingExpo.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });
    const sub = Linking.addEventListener('url', ({ url }) => {
      handleUrl(url);
    });
    return () => sub?.remove();
  }, [handleUrl]);
}

export function createDeepLink(path) {
  return `${DEEP_LINK_PREFIX}${path}`;
}

export function shareDeepLink(path, title) {
  const url = createDeepLink(path);
  return {
    title: title || 'LoveDeal',
    url,
    message: `${title || 'LoveDeal'}: ${url}`,
  };
}

export const DEEP_LINKS = {
  DEAL: (id) => `deal/${id}`,
  USER: (id) => `user/${id}`,
  CATEGORY: (name) => `category/${name}`,
  SEARCH: (query) => `search/${encodeURIComponent(query)}`,
  MAP: () => 'map',
  PROFILE: () => 'profile',
  SETTINGS: () => 'settings',
  NOTIFICATIONS: () => 'notifications',
};
