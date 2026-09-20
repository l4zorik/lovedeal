import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated, ActivityIndicator, Text, PanResponder, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import DealCard from './DealCard';
import AdCard from './AdCard';
import UndoToast from './UndoToast';
import AutoScroll from './AutoScroll';
import { COLORS } from '../constants/theme';
import { useLiteMode } from '../context/LiteModeContext';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const AD_FREQUENCY = 5;

const POOL_CONFIG = {
  normal: { loadAhead: 5, recycleBeyond: 10, maxPoolSize: 80, batchLoad: 6 },
  lite: { loadAhead: 2, recycleBeyond: 4, maxPoolSize: 30, batchLoad: 3 },
  legacy: { loadAhead: 1, recycleBeyond: 3, maxPoolSize: 20, batchLoad: 2 },
};

function getDeviceTier() {
  const mem = Platform.OS === 'android' ? 256 : 512;
  if (Platform.OS === 'android' && Platform.Version < 28) return 'legacy';
  if (SCREEN_HEIGHT < 700) return 'lite';
  return 'normal';
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function injectAds(deals, adPool, batchIndex) {
  const result = [...deals];
  const ad = adPool[batchIndex % adPool.length];
  if (ad) {
    result.splice(Math.min(AD_FREQUENCY, result.length), 0, {
      ...ad,
      id: `ad_batch_${batchIndex}_${ad.id}`,
    });
  }
  return result;
}

function generateDeal(base, batchIdx, itemIdx) {
  return {
    ...base,
    id: `inf_${batchIdx}_${itemIdx}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    likes: `${Math.floor(Math.random() * 500) + 10}.${Math.floor(Math.random() * 9)}K`,
    comments: `${Math.floor(Math.random() * 5000) + 100}`,
    shares: `${Math.floor(Math.random() * 10000) + 500}`,
    saves: `${Math.floor(Math.random() * 50) + 1}.${Math.floor(Math.random() * 9)}K`,
  };
}

export default function SwipeFeed({ data, isLite, customization, onSwipeLeft, onSwipeRight }) {
  const { config } = useLiteMode();
  const deviceTier = useMemo(() => getDeviceTier(), []);
  const poolCfg = POOL_CONFIG[deviceTier] || POOL_CONFIG.normal;

  const [allDeals, setAllDeals] = useState(() => {
    const deals = data.filter((d) => d.type !== 'ad');
    const ads = data.filter((d) => d.type === 'ad');
    return injectAds(deals.slice(0, poolCfg.batchLoad * 2), ads, 0);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [batchCount, setBatchCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScrolled, setTotalScrolled] = useState(0);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);
  const seenIdsRef = useRef(new Set());
  const recycledRef = useRef(0);

  const [undoVisible, setUndoVisible] = useState(false);
  const [dismissedDeal, setDismissedDeal] = useState(null);

  const swipeRef = useRef({ swipes: [], startTime: 0 });
  const gestureRef = useRef({
    panX: new Animated.Value(0),
    panY: new Animated.Value(0),
    hintOpacity: new Animated.Value(0),
  });

  const hintLeft = useRef(false);
  const hintRight = useRef(false);

  const DOUBLE_SWIPE_THRESHOLD = 80;
  const DOUBLE_SWIPE_TIMEOUT = 600;

  const showHint = useCallback(() => {
    Animated.sequence([
      Animated.timing(gestureRef.current.hintOpacity, { toValue: 0.7, duration: 150, useNativeDriver: true }),
      Animated.delay(200),
      Animated.timing(gestureRef.current.hintOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 30 && Math.abs(gs.dy) < Math.abs(gs.dx) * 0.5,
      onPanResponderGrant: () => {
        swipeRef.current.swipes = [];
        swipeRef.current.startTime = Date.now();
      },
      onPanResponderMove: (_, gs) => {
        if (gs.dx < -40 && !hintLeft.current) { hintLeft.current = true; showHint(); }
        if (gs.dx > 40 && !hintRight.current) { hintRight.current = true; showHint(); }
      },
      onPanResponderRelease: (_, gs) => {
        hintLeft.current = false;
        hintRight.current = false;
        const now = Date.now();
        const dt = now - swipeRef.current.startTime;
        if (dt > DOUBLE_SWIPE_TIMEOUT) swipeRef.current.swipes = [];

        let side = null;
        if (gs.dx < -DOUBLE_SWIPE_THRESHOLD) side = 'left';
        else if (gs.dx > DOUBLE_SWIPE_THRESHOLD) side = 'right';

        if (side) {
          swipeRef.current.swipes.push({ side, time: now });
          const recent = swipeRef.current.swipes.filter(
            (s) => s.side === side && now - s.time < DOUBLE_SWIPE_TIMEOUT
          );
          if (recent.length >= 2) {
            swipeRef.current.swipes = [];
            if (side === 'left') onSwipeLeft?.();
            else onSwipeRight?.();
          }
        }
      },
    })
  ).current;

  const dealPool = useRef(shuffleArray(data.filter((d) => d.type !== 'ad')));
  const adPool = useRef(data.filter((d) => d.type === 'ad'));

  const generateBatch = useCallback(() => {
    let pool = dealPool.current;
    if (pool.length === 0) {
      pool = shuffleArray(data.filter((d) => d.type !== 'ad'));
      dealPool.current = pool;
    }

    const fresh = pool.filter((d) => !seenIdsRef.current.has(d.id));
    const source = fresh.length >= poolCfg.batchLoad ? fresh : pool;

    const batch = source.slice(0, poolCfg.batchLoad).map((deal, i) => {
      seenIdsRef.current.add(deal.id);
      return generateDeal(deal, batchCount, i);
    });

    if (seenIdsRef.current.size > poolCfg.maxPoolSize) {
      const arr = [...seenIdsRef.current];
      const toRemove = arr.slice(0, Math.floor(arr.length / 3));
      toRemove.forEach((id) => seenIdsRef.current.delete(id));
      recycledRef.current += toRemove.length;
    }

    return injectAds(batch, adPool.current, batchCount);
  }, [batchCount, data, poolCfg]);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    const delay = deviceTier === 'legacy' ? 150 : deviceTier === 'lite' ? 300 : 500;

    setTimeout(() => {
      if (!mountedRef.current) return;
      const newBatch = generateBatch();
      setAllDeals((prev) => {
        const combined = [...prev, ...newBatch];
        if (combined.length > poolCfg.maxPoolSize) {
          const toKeep = combined.slice(combined.length - poolCfg.maxPoolSize);
          return toKeep;
        }
        return combined;
      });
      setBatchCount((p) => p + 1);
      setIsLoading(false);
      loadingRef.current = false;
    }, delay);
  }, [generateBatch, deviceTier, poolCfg]);

  useEffect(() => {
    loadMore();
    return () => { mountedRef.current = false; };
  }, []);

  const scrollToNext = useCallback(() => {
    const next = currentIndex + 1;
    if (next < allDeals.length) {
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    } else {
      loadMore();
    }
  }, [currentIndex, allDeals.length, loadMore]);

  const getItemLayout = useCallback((_, index) => ({
    length: SCREEN_HEIGHT,
    offset: SCREEN_HEIGHT * index,
    index,
  }), []);

  const handleDismiss = useCallback((dealId) => {
    const deal = allDeals.find((d) => d.id === dealId);
    if (!deal) return;
    setDismissedDeal(deal);
    setAllDeals((prev) => prev.filter((d) => d.id !== dealId));
    setUndoVisible(true);
    if (config?.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [allDeals, config]);

  const handleUndo = useCallback(() => {
    if (dismissedDeal) {
      setAllDeals((prev) => {
        const idx = prev.findIndex((d) => d.id > dismissedDeal.id);
        if (idx === -1) return [...prev, dismissedDeal];
        const next = [...prev];
        next.splice(idx, 0, dismissedDeal);
        return next;
      });
    }
    setUndoVisible(false);
    setDismissedDeal(null);
    if (config?.haptics) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [dismissedDeal, config]);

  const handleUndoDismiss = useCallback(() => {
    setUndoVisible(false);
    setDismissedDeal(null);
  }, []);

  const handleLike = useCallback(() => {
    if (config?.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [config]);

  const renderItem = useCallback(({ item }) => {
    if (item.type === 'ad') {
      return (
        <AdCard deal={item} isLite={isLite} config={config} scrollY={scrollY}
          onDismiss={handleDismiss} customization={customization} />
      );
    }
    return (
      <DealCard deal={item} isLite={isLite} config={config} scrollY={scrollY}
        onDismiss={handleDismiss} onLike={handleLike} customization={customization} />
    );
  }, [isLite, config, scrollY, handleDismiss, handleLike, customization]);

  const keyExtractor = useCallback((item) => item.id, []);

  const onScrollBeginDrag = useCallback(() => {
    if (config?.haptics) Haptics.selectionAsync();
  }, [config]);

  const onMomentumScrollEnd = useCallback((e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / SCREEN_HEIGHT);
    setCurrentIndex(index);
    setTotalScrolled((p) => p + 1);
    if (config?.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [config]);

  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    }),
    []
  );

  const ListFooter = useCallback(() => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.loadingText}>Načítám další deals...</Text>
      </View>
    );
  }, [isLoading]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <AutoScroll isLite={isLite} config={config} onScrollToNext={scrollToNext} />

      <FlatList
        ref={flatListRef}
        data={allDeals}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews={deviceTier === 'legacy'}
        maxToRenderPerBatch={poolCfg.loadAhead}
        windowSize={poolCfg.loadAhead + poolCfg.recycleBeyond}
        initialNumToRender={poolCfg.loadAhead}
        onEndReached={loadMore}
        onEndReachedThreshold={poolCfg.loadAhead / 2}
        ListFooterComponent={ListFooter}
      />

      {onSwipeLeft && (
        <Animated.View style={[styles.swipeHint, styles.swipeHintLeft, { opacity: gestureRef.current.hintOpacity }]} pointerEvents="none">
          <Text style={styles.swipeHintText}>{'◄◄'}</Text>
          <Text style={styles.swipeHintLabel}>LIVESTREAMY</Text>
        </Animated.View>
      )}
      {onSwipeRight && (
        <Animated.View style={[styles.swipeHint, styles.swipeHintRight, { opacity: gestureRef.current.hintOpacity }]} pointerEvents="none">
          <Text style={styles.swipeHintText}>{'►►'}</Text>
          <Text style={styles.swipeHintLabel}>NASTAVENÍ</Text>
        </Animated.View>
      )}

      {__DEV__ && (
        <View style={styles.debugBadge}>
          <Text style={styles.debugText}>
            {deviceTier.toUpperCase()} | {allDeals.length} | idx:{currentIndex} | scroll:{totalScrolled} | recycled:{recycledRef.current}
          </Text>
        </View>
      )}

      <UndoToast
        visible={undoVisible}
        dealName={dismissedDeal?.title}
        onUndo={handleUndo}
        onDismiss={handleUndoDismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingFooter: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  loadingText: {
    color: COLORS.textTertiary,
    fontSize: 11,
  },
  swipeHint: {
    position: 'absolute',
    top: '40%',
    zIndex: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(200,132,45,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  swipeHintLeft: { left: 16 },
  swipeHintRight: { right: 16 },
  swipeHintText: { color: COLORS.accent, fontSize: 20, fontWeight: '900' },
  swipeHintLabel: { color: COLORS.text, fontSize: 10, fontWeight: '700', marginTop: 2, letterSpacing: 1 },
  debugBadge: {
    position: 'absolute',
    bottom: 90,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  debugText: {
    color: '#0F0',
    fontSize: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
