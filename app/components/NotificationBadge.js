import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export function NotificationBadge({ count, size = 'small', style }) {
  const [displayCount, setDisplayCount] = useState(count);

  useEffect(() => {
    setDisplayCount(count);
  }, [count]);

  if (!displayCount || displayCount <= 0) return null;

  const isSmall = size === 'small';
  const badgeSize = isSmall ? 18 : 24;
  const fontSize = isSmall ? FONTS.sizes.xs : FONTS.sizes.sm;
  const text = displayCount > 99 ? '99+' : String(displayCount);

  return (
    <View
      style={[
        styles.badge,
        {
          width: badgeSize,
          height: badgeSize,
          borderRadius: badgeSize / 2,
          minWidth: badgeSize,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize }]}>{text}</Text>
    </View>
  );
}

export function NotificationDot({ style }) {
  return <View style={[styles.dot, style]} />;
}

export function TabBadge({ icon, label, badgeCount, focused }) {
  return (
    <View style={styles.tabItem}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={24} color={focused ? COLORS.primary : COLORS.textSecondary} />
        {badgeCount > 0 && (
          <View style={styles.absoluteBadge}>
            <NotificationBadge count={badgeCount} />
          </View>
        )}
      </View>
      <Text style={[styles.label, focused && styles.labelFocused]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  text: { color: '#FFF', fontWeight: '700' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  tabItem: { alignItems: 'center', gap: 2 },
  iconWrapper: { position: 'relative' },
  absoluteBadge: { position: 'absolute', top: -4, right: -10 },
  label: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary },
  labelFocused: { color: COLORS.primary, fontWeight: '700' },
});
