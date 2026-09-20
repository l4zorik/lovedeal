import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

export default function Chip({
  label,
  icon,
  selected = false,
  onPress,
  variant = 'default',
  style,
}) {
  const getContainerStyle = () => {
    if (selected) return styles.selected;
    switch (variant) {
      case 'outline': return styles.outline;
      case 'filled': return styles.filled;
      default: return styles.default;
    }
  };

  const getTextStyle = () => {
    if (selected) return styles.selectedText;
    return styles.text;
  };

  return (
    <TouchableOpacity
      style={[styles.container, getContainerStyle(), style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={selected ? COLORS.text : COLORS.textSecondary}
          style={styles.icon}
        />
      )}
      <Text style={[getTextStyle()]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  default: {
    backgroundColor: COLORS.surfaceLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filled: {
    backgroundColor: COLORS.primary,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  icon: {
    marginRight: SPACING.xs,
  },
  text: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  selectedText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
});
