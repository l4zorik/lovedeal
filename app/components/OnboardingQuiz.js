import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
  Animated, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS } from '../constants/theme';

const { width: SW } = Dimensions.get('window');

const STEPS = [
  {
    id: 'welcome',
    title: 'Vitej v LoveDeal',
    sub: 'Pomuzeme ti najit skvele deals okolo tebe',
    icon: 'heart',
    color: COLORS.primary,
    options: null,
  },
  {
    id: 'categories',
    title: 'Co te zajima?',
    sub: 'Vyber kategorie, ktere mas rad',
    icon: 'pricetags',
    color: '#FF6B6B',
    options: [
      { id: 'jidlo', label: 'Jidlo', icon: 'restaurant' },
      { id: 'elektronika', label: 'Elektronika', icon: 'hardware-chip' },
      { id: 'moda', label: 'Moda', icon: 'shirt' },
      { id: 'domacnost', label: 'Domacnost', icon: 'home' },
      { id: 'sport', label: 'Sport', icon: 'football' },
      { id: 'kultura', label: 'Kultura', icon: 'musical-notes' },
      { id: 'cestovani', label: 'Cestovani', icon: 'airplane' },
      { id: 'auto', label: 'Auto', icon: 'car-sport' },
      { id: 'zdravi', label: 'Zdravi', icon: 'medkit' },
      { id: 'zvirata', label: 'Zvirata', icon: 'paw' },
    ],
  },
  {
    id: 'budget',
    title: 'Tvuj rozpocet',
    sub: 'Jake ceny preferujes?',
    icon: 'wallet',
    color: '#FECA57',
    options: [
      { id: 'low', label: 'Do 100 Kc', icon: 'cash-outline' },
      { id: 'mid', label: '100-500 Kc', icon: 'cash' },
      { id: 'high', label: '500-2000 Kc', icon: 'card' },
      { id: 'any', label: 'Bez omezeni', icon: 'infinite' },
    ],
  },
  {
    id: 'location',
    title: 'Kde hledas?',
    sub: 'Povol polohu pro deals pobliz',
    icon: 'location',
    color: '#48DBFB',
    options: [
      { id: 'enable', label: 'Povolit polohu', icon: 'navigate' },
      { id: 'skip', label: 'Zatim ne', icon: 'time' },
    ],
  },
  {
    id: 'done',
    title: 'Jsi pripraven!',
    sub: 'Tvuj feed se uz prisposobi',
    icon: 'rocket',
    color: COLORS.success || '#6B8E23',
    options: null,
  },
];

function StepIndicator({ current, total }) {
  return (
    <View style={s.indicator}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[s.dot, i === current && s.dotActive, i < current && s.dotDone]} />
      ))}
    </View>
  );
}

export default function OnboardingQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({ categories: [], budget: null, location: null });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 8, useNativeDriver: true }),
    ]).start();
  }, [step]);

  const current = STEPS[step];

  const handleOption = (optId) => {
    if (current.id === 'categories') {
      setSelections((prev) => {
        const cats = prev.categories.includes(optId)
          ? prev.categories.filter((c) => c !== optId)
          : [...prev.categories, optId];
        return { ...prev, categories: cats };
      });
    } else if (current.id === 'budget') {
      setSelections((prev) => ({ ...prev, budget: optId }));
      setTimeout(() => goNext(), 300);
    } else if (current.id === 'location') {
      setSelections((prev) => ({ ...prev, location: optId }));
      setTimeout(() => goNext(), 300);
    }
  };

  const goNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onComplete?.(selections);
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.topBar}>
        {step > 0 && step < STEPS.length - 1 ? (
          <TouchableOpacity onPress={goPrev} style={s.backBtn}>
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        ) : <View style={{ width: 40 }} />}
        {step < STEPS.length - 1 && (
          <TouchableOpacity onPress={() => onComplete?.(selections)}>
            <Text style={s.skipText}>Preskocit</Text>
          </TouchableOpacity>
        )}
      </View>

      <StepIndicator current={step} total={STEPS.length} />

      <Animated.View style={[s.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={[s.iconCircle, { backgroundColor: current.color + '20', borderColor: current.color + '40' }]}>
          <Ionicons name={current.icon} size={48} color={current.color} />
        </View>
        <Text style={s.title}>{current.title}</Text>
        <Text style={s.sub}>{current.sub}</Text>

        {current.options && (
          <ScrollView style={s.optionsScroll} showsVerticalScrollIndicator={false}>
            <View style={s.optionsGrid}>
              {current.options.map((opt) => {
                const selected = current.id === 'categories'
                  ? selections.categories.includes(opt.id)
                  : selections[current.id] === opt.id;
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[s.option, selected && { borderColor: current.color, backgroundColor: current.color + '15' }]}
                    onPress={() => handleOption(opt.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name={opt.icon} size={28} color={selected ? current.color : COLORS.textTertiary} />
                    <Text style={[s.optionLabel, selected && { color: current.color }]}>{opt.label}</Text>
                    {selected && (
                      <View style={[s.checkmark, { backgroundColor: current.color }]}>
                        <Ionicons name="checkmark" size={14} color="#FFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </Animated.View>

      {step === STEPS.length - 1 ? (
        <TouchableOpacity style={s.finishBtn} onPress={() => onComplete?.(selections)}>
          <Ionicons name="rocket" size={22} color="#FFF" />
          <Text style={s.finishBtnText}>Zacit objevovat</Text>
        </TouchableOpacity>
      ) : current.id === 'categories' ? (
        <TouchableOpacity
          style={[s.nextBtn, selections.categories.length === 0 && { opacity: 0.4 }]}
          onPress={goNext}
          disabled={selections.categories.length === 0}
        >
          <Text style={s.nextBtnText}>Pokracovat ({selections.categories.length})</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  skipText: { color: COLORS.textTertiary, fontSize: 14, fontWeight: '600' },
  indicator: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border },
  dotActive: { width: 24, backgroundColor: COLORS.primary },
  dotDone: { backgroundColor: COLORS.primary + '60' },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24 },
  iconCircle: {
    width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, marginBottom: 24, marginTop: 20,
  },
  title: { color: COLORS.text, fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  sub: { color: COLORS.textSecondary, fontSize: 15, textAlign: 'center', marginBottom: 24 },
  optionsScroll: { flex: 1, width: '100%' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  option: {
    width: (SW - 68) / 3, paddingVertical: 16, borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border,
    alignItems: 'center', gap: 6,
  },
  optionLabel: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600', textAlign: 'center' },
  checkmark: {
    position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: COLORS.primary, marginHorizontal: 24, marginBottom: 40,
    paddingVertical: 16, borderRadius: BORDER_RADIUS.md,
  },
  nextBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  finishBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.primary, marginHorizontal: 24, marginBottom: 40,
    paddingVertical: 18, borderRadius: BORDER_RADIUS.md,
  },
  finishBtnText: { color: '#FFF', fontSize: 18, fontWeight: '800' },
});
