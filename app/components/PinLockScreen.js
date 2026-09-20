import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useSecurity } from '../context/SecurityContext';

const PIN_LENGTH = 4;

export default function PinLockScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const { unlockApp, pinEnabled } = useSecurity();

  useEffect(() => {
    if (!pinEnabled) {
      onUnlock?.();
    }
  }, [pinEnabled, onUnlock]);

  const handleDigit = useCallback((digit) => {
    if (pin.length >= PIN_LENGTH) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError('');
    if (newPin.length === PIN_LENGTH) {
      submitPin(newPin);
    }
  }, [pin]);

  const handleDelete = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
    setError('');
  }, []);

  const submitPin = useCallback(async (enteredPin) => {
    setLoading(true);
    try {
      const success = await unlockApp(enteredPin);
      if (success) {
        onUnlock?.();
      } else {
        setError('Špatný PIN');
        shakePin();
        setPin('');
      }
    } catch {
      setError('Chyba');
      setPin('');
    } finally {
      setLoading(false);
    }
  }, [unlockApp, onUnlock]);

  const shakePin = useCallback(() => {
    Vibration.vibrate(200);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [shakeAnim]);

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Ionicons name="lock-closed" size={48} color={COLORS.primary} />
          <Text style={styles.title}>Zadejte PIN</Text>
          <Text style={styles.subtitle}>Pro odemknutí aplikace</Text>
        </View>

        <Animated.View style={[styles.pinDots, { transform: [{ translateX: shakeAnim }] }]}>
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < pin.length && styles.dotFilled,
                error && styles.dotError,
              ]}
            />
          ))}
        </Animated.View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <View style={styles.keypad}>
          {digits.map((digit, i) => {
            if (digit === '') return <View key={i} style={styles.keyEmpty} />;
            if (digit === 'del') {
              return (
                <TouchableOpacity key={i} style={styles.key} onPress={handleDelete}>
                  <Ionicons name="backspace" size={28} color={COLORS.text} />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={i}
                style={styles.key}
                onPress={() => handleDigit(digit)}
              >
                <Text style={styles.keyText}>{digit}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.biometricBtn}>
          <Ionicons name="finger-print" size={28} color={COLORS.primary} />
          <Text style={styles.biometricText}>Použít biometrii</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.xl },
  headerSection: { alignItems: 'center', marginBottom: SPACING.xxxl },
  title: { color: COLORS.text, fontSize: FONTS.sizes.xxl, fontWeight: '800', marginTop: SPACING.lg },
  subtitle: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md, marginTop: SPACING.xs },
  pinDots: { flexDirection: 'row', gap: SPACING.lg, marginBottom: SPACING.lg },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  dotFilled: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dotError: { backgroundColor: COLORS.danger, borderColor: COLORS.danger },
  errorText: { color: COLORS.danger, fontSize: FONTS.sizes.sm, marginBottom: SPACING.md },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.md,
    width: 280,
  },
  key: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyEmpty: { width: 72, height: 72 },
  keyText: { color: COLORS.text, fontSize: FONTS.sizes.xxl, fontWeight: '700' },
  biometricBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xxl,
    padding: SPACING.md,
  },
  biometricText: { color: COLORS.primary, fontSize: FONTS.sizes.md },
});
