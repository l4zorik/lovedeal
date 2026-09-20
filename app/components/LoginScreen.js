import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useSecurity } from '../context/SecurityContext';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, validateEmail, validatePassword } = useSecurity();

  const handleLogin = useCallback(async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Neplatný email');
      return;
    }
    const pwdCheck = validatePassword(password);
    if (!pwdCheck.valid) {
      setError('Heslo musí mít min. 8 znaků, velké, malé písmeno a číslo');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        onLogin?.(result.user);
      }
    } catch (err) {
      setError('Přihlášení selhalo');
    } finally {
      setLoading(false);
    }
  }, [email, password, login, validateEmail, validatePassword, onLogin]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <View style={styles.content}>
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Ionicons name="heart" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>LoveDeal</Text>
            <Text style={styles.subtitle}>Sdílej skvělé deals</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="tvuj@email.cz"
                  placeholderTextColor={COLORS.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Heslo</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={COLORS.textTertiary} />
                </TouchableOpacity>
              </View>
            </View>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Zapomenuté heslo?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.loginBtnText}>Přihlásit se</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>nebo</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-google" size={20} color="#FFF" />
              <Text style={styles.socialBtnText}>Přihlásit přes Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, styles.socialBtnApple]}>
              <Ionicons name="logo-apple" size={20} color="#FFF" />
              <Text style={styles.socialBtnText}>Přihlásit přes Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Nemáte účet? </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Registrovat se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: SPACING.xl },
  logoSection: { alignItems: 'center', marginBottom: SPACING.xxxl },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: { color: COLORS.text, fontSize: FONTS.sizes.display, fontWeight: '900' },
  subtitle: { color: COLORS.textSecondary, fontSize: FONTS.sizes.lg, marginTop: SPACING.xs },
  formSection: { gap: SPACING.md },
  inputGroup: { gap: SPACING.xs },
  label: { color: COLORS.text, fontSize: FONTS.sizes.md, fontWeight: '600', marginLeft: 4 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: { marginLeft: SPACING.md },
  input: { flex: 1, color: COLORS.text, fontSize: FONTS.sizes.lg, paddingVertical: SPACING.md, paddingHorizontal: SPACING.sm },
  eyeBtn: { padding: SPACING.md },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.danger + '15',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  errorText: { color: COLORS.danger, fontSize: FONTS.sizes.sm, flex: 1 },
  forgotBtn: { alignSelf: 'flex-end' },
  forgotText: { color: COLORS.primary, fontSize: FONTS.sizes.sm },
  loginBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  loginBtnDisabled: { opacity: 0.6 },
  loginBtnText: { color: '#FFF', fontSize: FONTS.sizes.lg, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginVertical: SPACING.md },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { color: COLORS.textTertiary, fontSize: FONTS.sizes.sm },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: '#DB4437',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  socialBtnApple: { backgroundColor: '#333' },
  socialBtnText: { color: '#FFF', fontSize: FONTS.sizes.md, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.xxl },
  footerText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.md },
  footerLink: { color: COLORS.primary, fontSize: FONTS.sizes.md, fontWeight: '700' },
});
