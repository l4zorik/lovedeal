import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useSecurity } from '../context/SecurityContext';

export default function SettingsScreen() {
  const {
    isAuthenticated,
    currentUser,
    pinEnabled,
    biometricEnabled,
    privacyMode,
    appLockTimeout,
    setPin,
    removePin,
    enableBiometric,
    disableBiometric,
    setPrivacy,
    setAppLockTimeout,
    logout,
  } = useSecurity();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const handleSetPin = useCallback(() => {
    setPinInput('');
    setShowPinModal(true);
  }, []);

  const handleConfirmPin = useCallback(() => {
    if (pinInput.length >= 4) {
      setPin(pinInput);
      setShowPinModal(false);
      setPinInput('');
    }
  }, [pinInput, setPin]);

  const handleRemovePin = useCallback(() => {
    Alert.alert('Odebrat PIN', 'Opravdu chcete odebrat PIN?', [
      { text: 'Zrušit', style: 'cancel' },
      { text: 'Odebrat', style: 'destructive', onPress: removePin },
    ]);
  }, [removePin]);

  const handleLogout = useCallback(() => {
    Alert.alert('Odhlásit se', 'Opravdu se chcete odhlásit?', [
      { text: 'Zrušit', style: 'cancel' },
      { text: 'Odhlásit', style: 'destructive', onPress: logout },
    ]);
  }, [logout]);

  const lockOptions = [
    { label: '30 sekund', value: 30000 },
    { label: '1 minuta', value: 60000 },
    { label: '5 minut', value: 300000 },
    { label: '15 minut', value: 900000 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nastavení</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Účet</Text>
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={COLORS.primary} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{currentUser?.name || 'Uživatel'}</Text>
                <Text style={styles.profileEmail}>{currentUser?.email || 'email@example.com'}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bezpečnost</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="key" size={20} color={COLORS.primary} />
                <Text style={styles.settingLabel}>PIN zámek</Text>
              </View>
              <Switch
                value={pinEnabled}
                onValueChange={(v) => (v ? handleSetPin() : handleRemovePin())}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                thumbColor={pinEnabled ? COLORS.primary : COLORS.textSecondary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="finger-print" size={20} color={COLORS.secondary} />
                <Text style={styles.settingLabel}>Biometrie</Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={(v) => (v ? enableBiometric() : disableBiometric())}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                thumbColor={biometricEnabled ? COLORS.primary : COLORS.textSecondary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="lock-closed" size={20} color={COLORS.accent} />
                <Text style={styles.settingLabel}>Auto-lock</Text>
              </View>
              <TouchableOpacity onPress={() => setShowLockModal(true)}>
                <Text style={styles.settingValue}>
                  {lockOptions.find(o => o.value === appLockTimeout)?.label || '5 minut'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="eye-off" size={20} color={COLORS.warning} />
                <Text style={styles.settingLabel}>Soukromý režim</Text>
              </View>
              <Switch
                value={privacyMode}
                onValueChange={setPrivacy}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                thumbColor={privacyMode ? COLORS.primary : COLORS.textSecondary}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Oznámení</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications" size={20} color={COLORS.danger} />
                <Text style={styles.settingLabel}>Push notifikace</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                thumbColor={notifications ? COLORS.primary : COLORS.textSecondary}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aplikace</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon" size={20} color={COLORS.primary} />
                <Text style={styles.settingLabel}>Tmavý režim</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                thumbColor={darkMode ? COLORS.primary : COLORS.textSecondary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="play" size={20} color={COLORS.secondary} />
                <Text style={styles.settingLabel}>Auto-scroll</Text>
              </View>
              <Switch
                value={autoScroll}
                onValueChange={setAutoScroll}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary + '50' }}
                thumbColor={autoScroll ? COLORS.primary : COLORS.textSecondary}
              />
            </View>

            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="trash" size={20} color={COLORS.danger} />
                <Text style={styles.settingLabel}>Vymazat mezipaměť</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O aplikaci</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Verze</Text>
              <Text style={styles.settingValue}>1.0.0</Text>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Build</Text>
              <Text style={styles.settingValue}>2026.09.20</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Odhlásit se</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal visible={showPinModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nastavit PIN</Text>
            <Text style={styles.modalSubtitle}>Zadejte 4-8 číslic</Text>
            <TextInput
              style={styles.pinInput}
              value={pinInput}
              onChangeText={setPinInput}
              keyboardType="number-pad"
              maxLength={8}
              secureTextEntry
              placeholder="••••"
              placeholderTextColor={COLORS.textTertiary}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowPinModal(false)}>
                <Text style={styles.modalCancelText}>Zrušit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirmBtn, pinInput.length < 4 && styles.modalConfirmDisabled]}
                onPress={handleConfirmPin}
                disabled={pinInput.length < 4}
              >
                <Text style={styles.modalConfirmText}>Nastavit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showLockModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Auto-lock</Text>
            <Text style={styles.modalSubtitle}>Zvolte dobu</Text>
            {lockOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.lockOption,
                  appLockTimeout === opt.value && styles.lockOptionActive,
                ]}
                onPress={() => {
                  setAppLockTimeout(opt.value);
                  setShowLockModal(false);
                }}
              >
                <Text style={[
                  styles.lockOptionText,
                  appLockTimeout === opt.value && styles.lockOptionTextActive,
                ]}>
                  {opt.label}
                </Text>
                {appLockTimeout === opt.value && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancelBtnFull} onPress={() => setShowLockModal(false)}>
              <Text style={styles.modalCancelText}>Zrušit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  title: { color: COLORS.text, fontSize: FONTS.sizes.xxxl, fontWeight: '800' },
  content: { paddingHorizontal: SPACING.lg },
  section: { marginBottom: SPACING.lg },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
    marginLeft: 4,
  },
  card: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  profileRow: { flexDirection: 'row', alignItems: 'center', padding: SPACING.lg, gap: SPACING.md },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center', justifyContent: 'center',
  },
  profileInfo: { flex: 1 },
  profileName: { color: COLORS.text, fontSize: FONTS.sizes.lg, fontWeight: '700' },
  profileEmail: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg,
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  settingLabel: { color: COLORS.text, fontSize: FONTS.sizes.md },
  settingValue: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.danger + '15', padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md, marginTop: SPACING.lg,
  },
  logoutText: { color: COLORS.danger, fontSize: FONTS.sizes.md, fontWeight: '700' },
  modalOverlay: {
    flex: 1, backgroundColor: COLORS.overlay,
    alignItems: 'center', justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl, width: '80%', maxWidth: 320,
  },
  modalTitle: { color: COLORS.text, fontSize: FONTS.sizes.xl, fontWeight: '800', textAlign: 'center' },
  modalSubtitle: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, textAlign: 'center', marginTop: SPACING.xs },
  pinInput: {
    backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border,
    color: COLORS.text, fontSize: FONTS.sizes.xl, fontWeight: '700',
    textAlign: 'center', paddingVertical: SPACING.md, marginTop: SPACING.lg,
    letterSpacing: 8,
  },
  modalButtons: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.xl },
  modalCancelBtn: {
    flex: 1, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight, alignItems: 'center',
  },
  modalCancelText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, fontWeight: '600' },
  modalConfirmBtn: {
    flex: 1, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary, alignItems: 'center',
  },
  modalConfirmDisabled: { opacity: 0.5 },
  modalConfirmText: { color: '#FFF', fontSize: FONTS.sizes.md, fontWeight: '700' },
  lockOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md, marginTop: SPACING.sm,
    backgroundColor: COLORS.surfaceLight,
  },
  lockOptionActive: { backgroundColor: COLORS.primary + '20', borderWidth: 1, borderColor: COLORS.primary },
  lockOptionText: { color: COLORS.text, fontSize: FONTS.sizes.md },
  lockOptionTextActive: { color: COLORS.primary, fontWeight: '700' },
  modalCancelBtnFull: {
    paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight, alignItems: 'center', marginTop: SPACING.md,
  },
});
