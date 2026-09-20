import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SwipeFeed from '../components/SwipeFeed';
import LivestreamCard from '../components/LivestreamCard';
import { DEALS } from '../constants/mockData';
import { LIVESTREAMS } from '../constants/livestreams';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useLiteMode } from '../context/LiteModeContext';
import * as Haptics from 'expo-haptics';

export default function FeedScreen() {
  const { isLite, toggleLiteMode, config } = useLiteMode();
  const [feedType, setFeedType] = useState('forYou');
  const [activeView, setActiveView] = useState('feed');

  const liveStreams = LIVESTREAMS.filter((s) => s.status === 'live');

  const handleSwipeLeft = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setActiveView('livestreams');
  }, []);

  const handleSwipeRight = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setActiveView('settings');
  }, []);

  const handleLivestreamBack = useCallback(() => {
    setActiveView('feed');
  }, []);

  if (activeView === 'livestreams') {
    const LivestreamFeed = require('../screens/LivestreamFeed').default;
    return <LivestreamFeed onBack={handleLivestreamBack} />;
  }

  if (activeView === 'settings') {
    const SettingsScreen = require('./settings').default;
    return <SettingsScreen />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>Love</Text>
            <Text style={styles.logoAccent}>Deal</Text>
            {isLite && (
              <View style={styles.liteBadge}>
                <Text style={styles.liteBadgeText}>LITE</Text>
              </View>
            )}
          </View>

          <View style={styles.headerCenter}>
            <TouchableOpacity
              style={[styles.tab, feedType === 'following' && styles.tabActive]}
              onPress={() => setFeedType('following')}
            >
              <Text style={[styles.tabText, feedType === 'following' && styles.tabTextActive]}>
                Following
              </Text>
            </TouchableOpacity>
            <View style={styles.tabDivider} />
            <TouchableOpacity
              style={[styles.tab, feedType === 'forYou' && styles.tabActive]}
              onPress={() => setFeedType('forYou')}
            >
              <Text style={[styles.tabText, feedType === 'forYou' && styles.tabTextActive]}>
                For You
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.iconBtn} onPress={toggleLiteMode}>
            <Ionicons name={isLite ? 'flash' : 'flash-outline'} size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabUnderline}>
          <View style={[styles.underlineBar, { transform: [{ translateX: feedType === 'following' ? -38 : 38 }] }]} />
        </View>
      </SafeAreaView>

      {liveStreams.length > 0 && (
        <View style={styles.liveBarContainer}>
          <View style={styles.liveBarHeader}>
            <View style={styles.liveBarDot} />
            <Text style={styles.liveBarTitle}>LIVE právě teď</Text>
            <Text style={styles.liveBarCount}>{liveStreams.length}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.liveScroll}>
            {liveStreams.map((ls) => (
              <LivestreamCard
                key={ls.id}
                livestream={ls}
                horizontal
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setActiveView('livestreams');
                }}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <SwipeFeed
        data={DEALS}
        isLite={isLite}
        config={config}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(26,20,16,0.85)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logo: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '900',
    color: COLORS.text,
  },
  logoAccent: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '900',
    color: COLORS.primary,
  },
  liteBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  liteBadgeText: {
    color: COLORS.textInverse,
    fontSize: 9,
    fontWeight: '900',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  tab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  tabActive: {},
  tabDivider: {
    width: 1,
    height: 14,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: 4,
  },
  tabText: {
    color: COLORS.textTertiary,
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.text,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabUnderline: {
    alignItems: 'center',
    height: 2,
    paddingTop: 2,
  },
  underlineBar: {
    width: 32,
    height: 2,
    backgroundColor: COLORS.accent,
    borderRadius: 1,
  },
  liveBarContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 9,
    paddingBottom: SPACING.sm,
  },
  liveBarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    gap: 6,
  },
  liveBarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
  },
  liveBarTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  liveBarCount: {
    backgroundColor: '#E53935',
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  liveScroll: {
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.sm,
  },
});
