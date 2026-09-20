import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AnalyticsProvider, useAnalytics } from '../../app/context/AnalyticsContext';

const wrapper = ({ children }) => <AnalyticsProvider>{children}</AnalyticsProvider>;

describe('AnalyticsContext', () => {
  it('generuje sessionId', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    expect(result.current.sessionId).toBeDefined();
    expect(result.current.sessionId).toMatch(/^session_/);
  });

  it('trackEvent přidává event do fronty', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      result.current.trackEvent('test_event', { key: 'value' });
    });
    expect(result.current.events.length).toBe(1);
    expect(result.current.events[0].name).toBe('test_event');
    expect(result.current.events[0].params.key).toBe('value');
  });

  it('trackEvent přidává metadata', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      result.current.trackEvent('test', {});
    });
    const evt = result.current.events[0];
    expect(evt.id).toBeDefined();
    expect(evt.timestamp).toBeDefined();
    expect(evt.platform).toBeDefined();
    expect(evt.appVersion).toBeDefined();
  });

  it('trackScreenView volá trackEvent', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      result.current.trackScreenView('home');
    });
    expect(result.current.events[0].name).toBe('screen_view');
    expect(result.current.events[0].params.screen_name).toBe('home');
  });

  it('trackDealLike volá trackEvent', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      result.current.trackDealLike('deal_123');
    });
    expect(result.current.events[0].name).toBe('deal_like');
    expect(result.current.events[0].params.deal_id).toBe('deal_123');
  });

  it('trackDealView volá trackEvent s duration', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      result.current.trackDealView('deal_123', 5000);
    });
    expect(result.current.events[0].params.duration_ms).toBe(5000);
  });

  it('trackAdImpression volá trackEvent', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      result.current.trackAdImpression('ad_1', 'feed');
    });
    expect(result.current.events[0].name).toBe('ad_impression');
    expect(result.current.events[0].params.ad_id).toBe('ad_1');
  });

  it('trackError volá trackEvent', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    const error = new Error('test error');
    act(() => {
      result.current.trackError(error, 'component');
    });
    expect(result.current.events[0].name).toBe('error');
    expect(result.current.events[0].params.message).toBe('test error');
  });

  it('events uchovává max 50 posledních', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      for (let i = 0; i < 60; i++) {
        result.current.trackEvent(`event_${i}`, {});
      }
    });
    expect(result.current.events.length).toBeLessThanOrEqual(50);
  });

  it('setAnalyticsUser nastaví userId', () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    act(() => {
      result.current.setAnalyticsUser('user_123');
    });
    expect(result.current.userId).toBe('user_123');
  });
});
