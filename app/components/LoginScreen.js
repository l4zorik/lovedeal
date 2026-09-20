import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator,
  Dimensions, Animated, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuth from 'expo-local-authentication';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useSecurity } from '../context/SecurityContext';

const { width: SW } = Dimensions.get('window');
const GRADIENT_COLORS = ['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#0ABDE3','#5F27CD','#C44569','#F8A5C2'];

const AD_TIERS = [
  { id:'bronze', name:'Bronze', price:'49 Kc', dur:'1 den', icon:'ribbon', color:'#CD7F32',
    feat:['1 den zobrazovani','Zakladni pozice','1 foto'] },
  { id:'silver', name:'Silver', price:'149 Kc', dur:'3 dny', icon:'ribbon-outline', color:'#C0C0C0',
    feat:['3 dny zobrazovani','Vylepsena pozice','3 foto + video','Prioritni radeni'] },
  { id:'gold', name:'Gold', price:'499 Kc', dur:'7 dni', icon:'trophy', color:'#FFD700',
    feat:['7 dni zobrazovani','Top pozice','Neomezena media','Highlight','Analytics'] },
  { id:'diamond', name:'Diamond', price:'1 499 Kc', dur:'30 dni', icon:'diamond', color:'#B9F2FF',
    feat:['30 dni zobrazovani','#1 pozice','Neomezena media','Diamond glow','Full analytics','A/B testing'] },
];

function RainbowOrb({ index, animValue }) {
  const color = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
  const size = 60 + (index % 3) * 20;
  const ty = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, -12 - index * 2] });
  const sc = animValue.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.1] });
  return (
    <Animated.View style={[s.orb, {
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: color + '25', borderColor: color + '40',
      transform: [{ translateY: ty }, { scale: sc }],
      left: (index * SW) / 7, top: 40 + (index % 3) * 35,
    }]} />
  );
}

function AdTierCard({ tier, selected, onSelect }) {
  const isSel = selected === tier.id;
  return (
    <TouchableOpacity style={[s.tierCard, isSel && { borderColor: tier.color, borderWidth: 2 }]}
      onPress={() => onSelect(tier.id)} activeOpacity={0.8}>
      <View style={[s.tierIcon, { backgroundColor: tier.color + '25' }]}>
        <Ionicons name={tier.icon} size={28} color={tier.color} />
      </View>
      <View style={s.tierInfo}>
        <Text style={s.tierName}>{tier.name}</Text>
        <Text style={[s.tierPrice, { color: tier.color }]}>{tier.price}</Text>
        <Text style={s.tierDur}>{tier.dur}</Text>
      </View>
      <View style={s.tierFeats}>
        {tier.feat.map((f, i) => (
          <View key={i} style={s.tierFeatRow}>
            <Ionicons name="checkmark" size={12} color={tier.color} />
            <Text style={s.tierFeatText}>{f}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('login');
  const [selTier, setSelTier] = useState(null);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const { login, validateEmail, validatePassword } = useSecurity();
  const glowAnim = useRef(new Animated.Value(0)).current;
  const orbAnim = useRef(new Animated.Value(0)).current;
  const gradAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(orbAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradAnim, { toValue: 1, duration: 8000, useNativeDriver: false }),
        Animated.timing(gradAnim, { toValue: 0, duration: 8000, useNativeDriver: false }),
      ])
    ).start();
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    try {
      const compat = await LocalAuth.hasHardwareAsync();
      const enrolled = await LocalAuth.isEnrolledAsync();
      setBiometricAvailable(compat && enrolled);
    } catch {}
  };

  const handleBiometricLogin = async () => {
    try {
      const result = await LocalAuth.authenticateAsync({
        promptMessage: 'Prihlas se do LoveDeal',
        cancelLabel: 'Zrusit',
        disableDeviceFallback: false,
      });
      if (result.success) {
        setLoading(true);
        const r = await login('biometric@lovedeal.app', 'biometric');
        if (r.success) onLogin?.(r.user);
      }
    } catch { setError('Biometric login selhal'); }
    finally { setLoading(false); }
  };

  const glowOp = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] });
  const gradBg = gradAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['#1a1410', '#1a1020', '#101a20', '#201a10', '#1a1410'],
  });

  const handleLogin = useCallback(async () => {
    setError('');
    if (!validateEmail(email)) { setError('Neplatny email'); return; }
    const pwd = validatePassword(password);
    if (!pwd.valid) { setError('Heslo: min. 8 znaku, A-Z, a-z, 0-9'); return; }
    setLoading(true);
    try {
      const r = await login(email, password);
      if (r.success) onLogin?.(r.user);
    } catch { setError('Prihlaseni selhalo'); }
    finally { setLoading(false); }
  }, [email, password, login, validateEmail, validatePassword, onLogin]);

  if (view === 'promote') {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.rainbowBg}>
          {Array.from({ length: 8 }, (_, i) => <RainbowOrb key={i} index={i} animValue={orbAnim} />)}
        </View>
        <ScrollView contentContainerStyle={s.promoContent}>
          <TouchableOpacity style={s.backBtn} onPress={() => setView('login')}>
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={s.promoTitle}>Zviditelnit deal</Text>
          <Text style={s.promoSub}>Vyber si balicek a zaplat primo tady</Text>
          {AD_TIERS.map((t) => (
            <AdTierCard key={t.id} tier={t} selected={selTier} onSelect={setSelTier} />
          ))}
          {selTier && (
            <TouchableOpacity style={s.payBtn}>
              <Ionicons name="card-outline" size={20} color="#FFF" />
              <Text style={s.payBtnText}>
                Zaplatit {AD_TIERS.find(t => t.id === selTier)?.price}
              </Text>
            </TouchableOpacity>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <Animated.View style={[s.container, { backgroundColor: gradBg }]}>
      <View style={s.rainbowBg}>
        {Array.from({ length: 8 }, (_, i) => <RainbowOrb key={i} index={i} animValue={orbAnim} />)}
      </View>
      <Animated.View style={[s.glowRing, { opacity: glowOp }]} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.flex}>
        <ScrollView contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={s.logoSection}>
            <View style={s.logoOuter}>
              <Animated.View style={[s.logoGlow, { opacity: glowOp }]} />
              <View style={s.logoCircle}>
                <Ionicons name="heart" size={44} color={COLORS.primary} />
              </View>
            </View>
            <Text style={s.title}>Love</Text>
            <Text style={s.titleAccent}>Deal</Text>
            <Text style={s.subtitle}>Sdilej skvele deals. Plac za viditelnost.</Text>
          </View>

          <View style={s.formSection}>
            <View style={s.inputGroup}>
              <Text style={s.label}>Email</Text>
              <View style={s.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textTertiary} style={s.inputIcon} />
                <TextInput style={s.input} placeholder="tvuj@email.cz"
                  placeholderTextColor={COLORS.textTertiary} value={email}
                  onChangeText={setEmail} keyboardType="email-address"
                  autoCapitalize="none" autoCorrect={false} />
              </View>
            </View>
            <View style={s.inputGroup}>
              <Text style={s.label}>Heslo</Text>
              <View style={s.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textTertiary} style={s.inputIcon} />
                <TextInput style={s.input} placeholder="••••••••"
                  placeholderTextColor={COLORS.textTertiary} value={password}
                  onChangeText={setPassword} secureTextEntry={!showPwd} autoCapitalize="none" />
                <TouchableOpacity onPress={() => setShowPwd(!showPwd)} style={s.eyeBtn}>
                  <Ionicons name={showPwd ? 'eye-off' : 'eye'} size={20} color={COLORS.textTertiary} />
                </TouchableOpacity>
              </View>
            </View>
            {error ? (
              <View style={s.errorBox}>
                <Ionicons name="alert-circle" size={16} color={COLORS.danger} />
                <Text style={s.errorText}>{error}</Text>
              </View>
            ) : null}
            <TouchableOpacity style={s.forgotBtn}>
              <Text style={s.forgotText}>Zapomenute heslo?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.loginBtn, loading && { opacity: 0.6 }]}
              onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> :
                <Text style={s.loginBtnText}>Prihlasit se</Text>}
            </TouchableOpacity>

            {biometricAvailable && (
              <TouchableOpacity style={s.bioBtn} onPress={handleBiometricLogin}>
                <Ionicons name="finger-print" size={24} color={COLORS.primary} />
                <Text style={s.bioBtnText}>Prihlasit biometrii</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={s.promoBtn} onPress={() => setView('promote')}>
              <Ionicons name="flash" size={18} color={COLORS.accent} />
              <Text style={s.promoBtnText}>Zviditelnit svuj deal</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.accent} />
            </TouchableOpacity>

            <View style={s.divider}>
              <View style={s.dividerLine} />
              <Text style={s.dividerText}>nebo</Text>
              <View style={s.dividerLine} />
            </View>
            <TouchableOpacity style={s.socialBtn}>
              <Ionicons name="logo-google" size={20} color="#FFF" />
              <Text style={s.socialBtnText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.socialBtn, { backgroundColor: '#333' }]}>
              <Ionicons name="logo-apple" size={20} color="#FFF" />
              <Text style={s.socialBtnText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={s.footer}>
            <Text style={s.footerText}>Nemate ucet? </Text>
            <TouchableOpacity>
              <Text style={s.footerLink}>Registrovat se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  rainbowBg: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  orb: { position: 'absolute', borderWidth: 1 },
  glowRing: {
    position: 'absolute', top: '25%', alignSelf: 'center',
    width: 300, height: 300, borderRadius: 150,
    borderWidth: 2, borderColor: COLORS.primary + '40',
  },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingTop: 40 },
  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoOuter: { position: 'relative', width: 100, height: 100, marginBottom: 16 },
  logoGlow: {
    position: 'absolute', inset: -10, borderRadius: 60,
    backgroundColor: COLORS.primary + '20',
  },
  logoCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: COLORS.primary + '18', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.primary + '30',
  },
  title: { color: COLORS.text, fontSize: 36, fontWeight: '900', lineHeight: 38 },
  titleAccent: { color: COLORS.primary, fontSize: 36, fontWeight: '900', lineHeight: 40 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, marginTop: 8, textAlign: 'center' },
  formSection: { gap: 14 },
  inputGroup: { gap: 6 },
  label: { color: COLORS.text, fontSize: 13, fontWeight: '600', marginLeft: 4 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surfaceLight, borderRadius: BORDER_RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  inputIcon: { marginLeft: 14 },
  input: { flex: 1, color: COLORS.text, fontSize: 16, paddingVertical: 14, paddingHorizontal: 8 },
  eyeBtn: { padding: 14 },
  errorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.danger + '15', padding: 12, borderRadius: BORDER_RADIUS.md,
  },
  errorText: { color: COLORS.danger, fontSize: 12, flex: 1 },
  forgotBtn: { alignSelf: 'flex-end' },
  forgotText: { color: COLORS.primary, fontSize: 12 },
  loginBtn: {
    backgroundColor: COLORS.primary, paddingVertical: 16,
    borderRadius: BORDER_RADIUS.md, alignItems: 'center', marginTop: 6,
  },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  bioBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: COLORS.surface, paddingVertical: 14,
    borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.primary + '30',
  },
  bioBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
  promoBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.accent + '15', paddingVertical: 14,
    borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.accent + '30',
  },
  promoBtnText: { color: COLORS.accent, fontSize: 14, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { color: COLORS.textTertiary, fontSize: 12 },
  socialBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#DB4437', paddingVertical: 14, borderRadius: BORDER_RADIUS.md,
  },
  socialBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: COLORS.textSecondary, fontSize: 14 },
  footerLink: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
  promoContent: { paddingHorizontal: 20, paddingTop: 20 },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceLight,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  promoTitle: { color: COLORS.text, fontSize: 28, fontWeight: '900', marginBottom: 4 },
  promoSub: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 20 },
  tierCard: {
    backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg,
    padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  tierIcon: {
    width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center',
  },
  tierInfo: { flex: 1, minWidth: 100 },
  tierName: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  tierPrice: { fontSize: 20, fontWeight: '900', marginTop: 2 },
  tierDur: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  tierFeats: { width: '100%', gap: 4 },
  tierFeatRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tierFeatText: { color: COLORS.textSecondary, fontSize: 12 },
  payBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: BORDER_RADIUS.md, marginTop: 8,
  },
  payBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
