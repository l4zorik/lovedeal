import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useLiteMode, LITE_CONFIG, FULL_CONFIG } from '../context/LiteModeContext';

const SETTING_ITEMS = [
  { key: 'animations', label: 'Animace', icon: 'sparkles', desc: 'Parallax, srdce, přechody' },
  { key: 'haptics', label: 'Vibrace', icon: 'phone-portrait', desc: 'Haptic feedback při akcích' },
  { key: 'spinningDisc', label: 'Rotující disk', icon: 'disc', desc: 'Animovaný disk u avatara' },
  { key: 'progressBar', label: 'Progress bar', icon: 'timer', desc: 'Auto-advance po 8 sekundách' },
  { key: 'parallax', label: 'Parallax', icon: 'layers', desc: '3D efekt při scrollování' },
  { key: 'autoScroll', label: 'Auto-scroll', icon: 'play-circle', desc: 'Automatické přejíždění' },
  { key: 'dataSaver', label: 'Úspora dat', icon: 'wifi', desc: '-20% spotřeba dat' },
  { key: 'offlineCache', label: 'Offline cache', icon: 'cloud-download', desc: 'Ukládání pro offline' },
];

export default function LiteSettings({ visible, onClose }) {
  const { isLite, toggleLiteMode, config, updateConfig, getCacheSize, clearCache } = useLiteMode();
  const [localConfig, setLocalConfig] = useState(config);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  if (!visible) return null;

  const handleToggle = (key) => {
    const newValue = !localConfig[key];
    setLocalConfig((prev) => ({ ...prev, [key]: newValue }));
  };

  const applyConfig = () => {
    updateConfig(localConfig);
    onClose();
  };

  const applyPreset = (preset) => {
    if (preset === 'lite') {
      setLocalConfig(LITE_CONFIG);
      if (!isLite) toggleLiteMode();
    } else {
      setLocalConfig(FULL_CONFIG);
      if (isLite) toggleLiteMode();
    }
  };

  const cacheSize = getCacheSize();

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nastavení režimu</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.presetRow}>
          <TouchableOpacity
            style={[styles.presetBtn, isLite && styles.presetBtnActive]}
            onPress={() => applyPreset('lite')}
          >
            <Ionicons name="flash" size={18} color={isLite ? '#FFF' : COLORS.textSecondary} />
            <Text style={[styles.presetText, isLite && styles.presetTextActive]}>Lite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.presetBtn, !isLite && styles.presetBtnActive]}
            onPress={() => applyPreset('full')}
          >
            <Ionicons name="rocket" size={18} color={!isLite ? '#FFF' : COLORS.textSecondary} />
            <Text style={[styles.presetText, !isLite && styles.presetTextActive]}>Full</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.settingsList}>
          {SETTING_ITEMS.map((item) => (
            <View key={item.key} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons name={item.icon} size={18} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDesc}>{item.desc}</Text>
                </View>
              </View>
              <Switch
                value={localConfig[item.key]}
                onValueChange={() => handleToggle(item.key)}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '60' }}
                thumbColor={localConfig[item.key] ? COLORS.primary : COLORS.textTertiary}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.cacheInfo}>
            <Ionicons name="folder-open" size={16} color={COLORS.textTertiary} />
            <Text style={styles.cacheText}>Cache: {cacheSize} položek</Text>
            {cacheSize > 0 && (
              <TouchableOpacity onPress={clearCache}>
                <Text style={styles.clearText}>Vymazat</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.applyBtn} onPress={applyConfig}>
            <Text style={styles.applyBtnText}>Použít</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  container: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    padding: SPACING.lg,
    paddingBottom: 0,
  },
  presetBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
  },
  presetBtnActive: {
    backgroundColor: COLORS.primary,
  },
  presetText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  presetTextActive: {
    color: '#FFF',
  },
  settingsList: {
    padding: SPACING.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  settingDesc: {
    color: COLORS.textTertiary,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
  },
  cacheInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cacheText: {
    color: COLORS.textTertiary,
    fontSize: FONTS.sizes.sm,
    flex: 1,
  },
  clearText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  applyBtnText: {
    color: '#FFF',
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});
