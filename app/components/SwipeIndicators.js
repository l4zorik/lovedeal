import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function SwipeIndicators({ scrollY, screenHeight }) {
  const leftOpacity = useRef(new Animated.Value(0)).current;
  const rightOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!scrollY) return;
    const listener = scrollY.addListener(({ value }) => {
      const progress = Math.abs(value) / screenHeight;
      leftOpacity.setValue(Math.min(progress * 2, 1));
      rightOpacity.setValue(Math.min(progress * 2, 1));
    });
    return () => scrollY.removeListener(listener);
  }, [scrollY, screenHeight]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, styles.left, { opacity: leftOpacity }]}>
        <Ionicons name="close-circle" size={48} color={COLORS.error} />
      </Animated.View>
      <Animated.View style={[styles.indicator, styles.right, { opacity: rightOpacity }]}>
        <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -24 }],
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
});
