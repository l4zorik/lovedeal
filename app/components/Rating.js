import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

export default function Rating({ value = 0, max = 5, size = 16, showValue = true, style }) {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(safeValue);
        const half = !filled && i < safeValue;
        return (
          <Ionicons
            key={i}
            name={filled ? 'star' : half ? 'star-half' : 'star-outline'}
            size={size}
            color={COLORS.warning}
            style={{ marginRight: 2 }}
          />
        );
      })}
      {showValue && <Text style={styles.value}>{safeValue.toFixed(1)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    marginLeft: SPACING.xs,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});
