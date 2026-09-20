import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export function QuickAction({ icon, label, color, onPress, badge }) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: (color || COLORS.primary) + '20' }]}>
        <Ionicons name={icon} size={22} color={color || COLORS.primary} />
        {badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

export function QuickActionsGrid({ actions }) {
  return (
    <View style={styles.grid}>
      {actions.map((action, i) => (
        <QuickAction key={i} {...action} />
      ))}
    </View>
  );
}

export function ActionButton({ icon, label, color, onPress, variant = 'default', size = 'medium', disabled }) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const isSmall = size === 'small';

  return (
    <TouchableOpacity
      style={[
        styles.actionBtn,
        isPrimary && styles.actionBtnPrimary,
        isDanger && styles.actionBtnDanger,
        isSmall && styles.actionBtnSmall,
        disabled && styles.actionBtnDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={isSmall ? 16 : 20}
          color={isPrimary || isDanger ? '#FFF' : color || COLORS.text}
        />
      )}
      {label && (
        <Text
          style={[
            styles.actionBtnText,
            isPrimary && styles.actionBtnTextPrimary,
            isDanger && styles.actionBtnTextDanger,
            isSmall && styles.actionBtnTextSmall,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: { alignItems: 'center', gap: SPACING.xs },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#FFF', fontSize: 9, fontWeight: '700' },
  label: { color: COLORS.textSecondary, fontSize: FONTS.sizes.xs, fontWeight: '500' },
  grid: { flexDirection: 'row', justifyContent: 'space-around' },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
  },
  actionBtnPrimary: { backgroundColor: COLORS.primary },
  actionBtnDanger: { backgroundColor: COLORS.danger },
  actionBtnSmall: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
  actionBtnDisabled: { opacity: 0.5 },
  actionBtnText: { color: COLORS.text, fontSize: FONTS.sizes.md, fontWeight: '600' },
  actionBtnTextPrimary: { color: '#FFF' },
  actionBtnTextDanger: { color: '#FFF' },
  actionBtnTextSmall: { fontSize: FONTS.sizes.sm },
});
