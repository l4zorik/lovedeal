import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import Modal from './Modal';

export default function Select({
  label,
  placeholder,
  value,
  options,
  onSelect,
  style,
}) {
  const [visible, setVisible] = useState(false);

  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={[styles.value, !value && styles.placeholder]}>{selectedLabel}</Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title={label || 'Vyberte'}
        size="small"
      >
        <FlatList
          data={options}
          keyExtractor={item => item.value.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.option, item.value === value && styles.optionSelected]}
              onPress={() => {
                onSelect(item.value);
                setVisible(false);
              }}
            >
              <Text style={[styles.optionText, item.value === value && styles.optionTextSelected]}>
                {item.label}
              </Text>
              {item.value === value && (
                <Ionicons name="checkmark" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          )}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
  },
  placeholder: {
    color: COLORS.textTertiary,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionSelected: {
    backgroundColor: COLORS.surfaceLight,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
