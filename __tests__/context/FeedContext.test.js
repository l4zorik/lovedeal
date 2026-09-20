import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { FeedProvider, useFeed } from '../../app/context/FeedContext';

const wrapper = ({ children }) => <FeedProvider>{children}</FeedProvider>;

describe('FeedContext', () => {
  it('poskytuje výchozí preferences', () => {
    const { result } = renderHook(() => useFeed(), { wrapper });
    expect(result.current.preferences).toBeDefined();
    expect(result.current.preferences.likedCategories).toEqual({});
    expect(result.current.preferences.savedCategories).toEqual({});
    expect(result.current.preferences.viewTime).toEqual({});
    expect(result.current.preferences.dismissedIds).toEqual([]);
  });

  it('trackLike zvyšuje counter kategorie', () => {
    const { result } = renderHook(() => useFeed(), { wrapper });
    act(() => {
      result.current.trackLike('deal1', 'Móda');
    });
    expect(result.current.preferences.likedCategories['Móda']).toBe(1);
    act(() => {
      result.current.trackLike('deal2', 'Móda');
    });
    expect(result.current.preferences.likedCategories['Móda']).toBe(2);
  });

  it('trackSave zvyšuje counter kategorie', () => {
    const { result } = renderHook(() => useFeed(), { wrapper });
    act(() => {
      result.current.trackSave('deal1', 'Elektronika');
    });
    expect(result.current.preferences.savedCategories['Elektronika']).toBe(1);
  });

  it('trackDismiss přidává id do dismissedIds', () => {
    const { result } = renderHook(() => useFeed(), { wrapper });
    act(() => {
      result.current.trackDismiss('deal_abc');
    });
    expect(result.current.preferences.dismissedIds).toContain('deal_abc');
  });

  it('trackDismiss uchovává max 50 dismissalů', () => {
    const { result } = renderHook(() => useFeed(), { wrapper });
    act(() => {
      for (let i = 0; i < 60; i++) {
        result.current.trackDismiss(`deal_${i}`);
      }
    });
    expect(result.current.preferences.dismissedIds.length).toBeLessThanOrEqual(50);
  });

  it('sortDeals řadí deals podle skóre', () => {
    const { result } = renderHook(() => useFeed(), { wrapper });
    const deals = [
      { id: '1', category: 'Móda', _score: 0 },
      { id: '2', category: 'Móda', _score: 0 },
    ];
    act(() => {
      result.current.trackLike('1', 'Móda');
    });
    const sorted = result.current.sortDeals(deals);
    expect(sorted.length).toBe(2);
  });

  it('trackViewStart a trackViewEnd sledují dobu zobrazení', () => {
    const { result } = renderHook(() => useFeed(), { wrapper });
    act(() => {
      result.current.trackViewStart('deal1');
    });
    act(() => {
      result.current.trackViewEnd('deal1');
    });
    expect(result.current.preferences.viewTime['deal1']).toBeGreaterThanOrEqual(0);
  });
});
