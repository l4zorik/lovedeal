import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const FeedContext = createContext(null);

export function FeedProvider({ children }) {
  const [preferences, setPreferences] = useState({
    likedCategories: {},
    savedCategories: {},
    viewTime: {},
    dismissedIds: [],
  });

  const viewStartRef = useRef(null);

  const trackViewStart = useCallback((dealId) => {
    viewStartRef.current = { dealId, start: Date.now() };
  }, []);

  const trackViewEnd = useCallback((dealId) => {
    if (!viewStartRef.current || viewStartRef.current.dealId !== dealId) return;
    const elapsed = (Date.now() - viewStartRef.current.start) / 1000;
    setPreferences((prev) => ({
      ...prev,
      viewTime: {
        ...prev.viewTime,
        [dealId]: (prev.viewTime[dealId] || 0) + elapsed,
      },
    }));
    viewStartRef.current = null;
  }, []);

  const trackLike = useCallback((dealId, category) => {
    setPreferences((prev) => ({
      ...prev,
      likedCategories: {
        ...prev.likedCategories,
        [category]: (prev.likedCategories[category] || 0) + 1,
      },
    }));
  }, []);

  const trackSave = useCallback((dealId, category) => {
    setPreferences((prev) => ({
      ...prev,
      savedCategories: {
        ...prev.savedCategories,
        [category]: (prev.savedCategories[category] || 0) + 1,
      },
    }));
  }, []);

  const trackDismiss = useCallback((dealId) => {
    setPreferences((prev) => ({
      ...prev,
      dismissedIds: [...prev.dismissedIds.slice(-49), dealId],
    }));
  }, []);

  const sortDeals = useCallback((deals) => {
    const { likedCategories, viewTime } = preferences;
    return [...deals]
      .map((deal) => {
        const catWeight = likedCategories[deal.category] || 0;
        const timeWeight = Math.min((viewTime[deal.id] || 0) / 10, 5);
        const randomFactor = Math.random() * 3;
        return { ...deal, _score: catWeight * 2 + timeWeight + randomFactor };
      })
      .sort((a, b) => b._score - a._score);
  }, [preferences]);

  return (
    <FeedContext.Provider
      value={{
        preferences,
        trackViewStart,
        trackViewEnd,
        trackLike,
        trackSave,
        trackDismiss,
        sortDeals,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error('useFeed must be used within FeedProvider');
  return ctx;
}
