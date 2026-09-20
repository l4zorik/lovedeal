import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

const AUTO_SCROLL_INTERVAL = 8000;

export default function AutoScroll({ isLite, config, onScrollToNext }) {
  const [enabled, setEnabled] = useState(false);
  const [countdown, setCountdown] = useState(AUTO_SCROLL_INTERVAL / 1000);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      clearTimers();
      return;
    }

    setCountdown(AUTO_SCROLL_INTERVAL / 1000);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onScrollToNext?.();
          return AUTO_SCROLL_INTERVAL / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimers();
  }, [enabled, onScrollToNext]);

  const clearTimers = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const toggleAutoScroll = () => {
    const next = !enabled;
    setEnabled(next);
    if (config?.haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, enabled && styles.containerActive]}
      onPress={toggleAutoScroll}
      activeOpacity={0.7}
    >
      <Ionicons
        name={enabled ? 'pause' : 'play'}
        size={14}
        color={enabled ? '#FFF' : COLORS.textSecondary}
      />
      {enabled && (
        <Text style={styles.countdown}>{countdown}s</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.overlay,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    zIndex: 25,
  },
  containerActive: {
    backgroundColor: COLORS.primary,
  },
  countdown: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
