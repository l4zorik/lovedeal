import React, { useState, useRef, useCallback } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LivestreamCard from '../components/LivestreamCard';
import { LIVESTREAMS } from '../constants/livestreams';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import * as Haptics from 'expo-haptics';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LivestreamFeed({ onBack }) {
  const [livestreams] = useState(LIVESTREAMS);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const getItemLayout = useCallback((_, index) => ({
    length: SCREEN_HEIGHT,
    offset: SCREEN_HEIGHT * index,
    index,
  }), []);

  const renderItem = useCallback(({ item }) => (
    <LivestreamCard livestream={item} onPress={() => {}} />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  const handleBack = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack?.();
  }, [onBack]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={livestreams}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        removeClippedSubviews={false}
        initialNumToRender={1}
        windowSize={3}
      />

      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={styles.liveIcon}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVESTREAMY</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="search" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.sideActions}>
        <TouchableOpacity style={styles.sideBtn}>
          <Ionicons name="heart-outline" size={26} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideBtn}>
          <Ionicons name="chatbubble-ellipses-outline" size={26} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideBtn}>
          <Ionicons name="share-outline" size={26} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideBtn}>
          <Ionicons name="cart-outline" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    backgroundColor: 'rgba(26,20,16,0.7)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  liveIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  liveText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sideActions: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: 160,
    zIndex: 10,
    gap: SPACING.md,
  },
  sideBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});
