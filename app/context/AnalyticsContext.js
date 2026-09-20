import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';

const AnalyticsContext = createContext(null);

const EVENT_QUEUE = [];
const MAX_QUEUE_SIZE = 100;
const FLUSH_INTERVAL = 30000;

export function AnalyticsProvider({ children }) {
  const [sessionId] = useState(() => 'session_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);
  const queueRef = useRef([]);

  const setAnalyticsUser = useCallback((id) => {
    setUserId(id);
  }, []);

  const trackEvent = useCallback((eventName, params = {}) => {
    const event = {
      id: 'evt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: eventName,
      params,
      userId,
      sessionId,
      timestamp: Date.now(),
      platform: Platform.OS,
      appVersion: '1.0.0',
    };
    queueRef.current.push(event);
    setEvents((prev) => [...prev.slice(-49), event]);
    if (queueRef.current.length >= MAX_QUEUE_SIZE) {
      flushEvents();
    }
  }, [userId, sessionId]);

  const flushEvents = useCallback(async () => {
    if (queueRef.current.length === 0) return;
    const batch = [...queueRef.current];
    queueRef.current = [];
    try {
      // In production: send batch to analytics endpoint
      console.log('[Analytics] Flushing', batch.length, 'events');
    } catch (err) {
      queueRef.current = [...batch, ...queueRef.current];
    }
  }, []);

  const trackScreenView = useCallback((screenName) => {
    trackEvent('screen_view', { screen_name: screenName });
  }, [trackEvent]);

  const trackDealView = useCallback((dealId, duration) => {
    trackEvent('deal_view', { deal_id: dealId, duration_ms: duration });
  }, [trackEvent]);

  const trackDealLike = useCallback((dealId) => {
    trackEvent('deal_like', { deal_id: dealId });
  }, [trackEvent]);

  const trackDealSave = useCallback((dealId) => {
    trackEvent('deal_save', { deal_id: dealId });
  }, [trackEvent]);

  const trackDealShare = useCallback((dealId, method) => {
    trackEvent('deal_share', { deal_id: dealId, method });
  }, [trackEvent]);

  const trackDealDismiss = useCallback((dealId) => {
    trackEvent('deal_dismiss', { deal_id: dealId });
  }, [trackEvent]);

  const trackAdImpression = useCallback((adId, placement) => {
    trackEvent('ad_impression', { ad_id: adId, placement });
  }, [trackEvent]);

  const trackAdClick = useCallback((adId, placement) => {
    trackEvent('ad_click', { ad_id: adId, placement });
  }, [trackEvent]);

  const trackSearch = useCallback((query, resultCount) => {
    trackEvent('search', { query, result_count: resultCount });
  }, [trackEvent]);

  const trackFeatureUse = useCallback((feature, action) => {
    trackEvent('feature_use', { feature, action });
  }, [trackEvent]);

  const trackPerformance = useCallback((metric, value) => {
    trackEvent('performance', { metric, value });
  }, [trackEvent]);

  const trackError = useCallback((error, context) => {
    trackEvent('error', { message: error.message, stack: error.stack, context });
  }, [trackEvent]);

  return (
    <AnalyticsContext.Provider
      value={{
        sessionId,
        userId,
        events,
        setAnalyticsUser,
        trackEvent,
        flushEvents,
        trackScreenView,
        trackDealView,
        trackDealLike,
        trackDealSave,
        trackDealShare,
        trackDealDismiss,
        trackAdImpression,
        trackAdClick,
        trackSearch,
        trackFeatureUse,
        trackPerformance,
        trackError,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return ctx;
}
