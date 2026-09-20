import React from 'react';
import { Switch as RNSwitch, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../constants/theme';

export default function Switch({ value, onValueChange, disabled = false, style }) {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary }}
      thumbColor={Platform.OS === 'ios' ? '#fff' : value ? COLORS.primary : COLORS.textTertiary}
      ios_backgroundColor={COLORS.surfaceLight}
      style={style}
    />
  );
}
