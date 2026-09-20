import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS } from '../constants/theme';

const { width: SW } = Dimensions.get('window');

const MOCK_DEALS = [
  { id:'m1', title:'Sleva 30% na sortiment', views:1240, clicks:89, saves:34, status:'active', created:'2026-09-18' },
  { id:'m2', title:'Happy Hour 2+1 zdarma', views:890, clicks:156, saves:67, status:'active', created:'2026-09-19' },
  { id:'m3', title:'Vyprodej letni kolekce', views:2100, clicks:234, saves:89, status:'expired', created:'2026-09-15' },
];

const STATS = [
  { label:'Zobrazeni', value:'4 230', icon:'eye', color:'#48DBFB' },
  { label:'Kliknuti', value:'479', icon:'finger-print', color:'#FF6B6B' },
  { label:'Ulozeni', value:'190', icon:'bookmark', color:'#FECA57' },
  { label:'Konverze', value:'4.5%', icon:'trending-up', color:'#6B8E23' },
];

function StatCard({ stat }) {
  return (
    <View style={s.statCard}>
      <View style={[s.statIcon, { backgroundColor: stat.color + '20' }]}>
        <Ionicons name={stat.icon} size={20} color={stat.color} />
      </View>
      <Text style={s.statValue}>{stat.value}</Text>
      <Text style={s.statLabel}>{stat.label}</Text>
    </View>
  );
}

function DealRow({ deal }) {
  const sc = deal.status === 'active' ? '#6B8E23' : COLORS.textTertiary;
  return (
    <View style={s.dealRow}>
      <View style={s.dealInfo}>
        <Text style={s.dealTitle} numberOfLines={1}>{deal.title}</Text>
        <Text style={s.dealDate}>{deal.created}</Text>
      </View>
      <View style={s.dealStats}>
        <View style={s.miniStat}><Ionicons name="eye" size={12} color={COLORS.textTertiary} /><Text style={s.miniStatText}>{deal.views}</Text></View>
        <View style={s.miniStat}><Ionicons name="finger-print" size={12} color={COLORS.textTertiary} /><Text style={s.miniStatText}>{deal.clicks}</Text></View>
        <View style={s.miniStat}><Ionicons name="bookmark" size={12} color={COLORS.textTertiary} /><Text style={s.miniStatText}>{deal.saves}</Text></View>
      </View>
      <View style={[s.statusDot, { backgroundColor: sc }]} />
    </View>
  );
}
export default function MerchantPortal({ onBack }) {
  const [tab, setTab] = useState('dashboard');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Merchant Portal</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={s.tabs}>
        {[['dashboard','Prehled'],['deals','Dealy'],['create','Novy']].map(([id,label]) => (
          <TouchableOpacity key={id} style={[s.tabBtn, tab === id && s.tabBtnActive]} onPress={() => setTab(id)}>
            <Text style={[s.tabText, tab === id && s.tabTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {tab === 'dashboard' && (<>
          <Text style={s.sectionTitle}>Statistiky</Text>
          <View style={s.statsGrid}>{STATS.map((st,i) => <StatCard key={i} stat={st} />)}</View>
          <Text style={s.sectionTitle}>Aktivity</Text>
          {MOCK_DEALS.slice(0,2).map(d => <DealRow key={d.id} deal={d} />)}
        </>)}
        {tab === 'deals' && (<>
          <Text style={s.sectionTitle}>Tve dealy ({MOCK_DEALS.length})</Text>
          {MOCK_DEALS.map(d => <DealRow key={d.id} deal={d} />)}
        </>)}
        {tab === 'create' && (<>
          <Text style={s.sectionTitle}>Novy merchant deal</Text>
          <View style={s.form}>
            <Text style={s.label}>Nazev</Text>
            <View style={s.inputRow}>
              <Ionicons name="pricetag" size={18} color={COLORS.primary} style={{ paddingLeft: 14 }} />
              <TextInput style={s.input} placeholder="Sleva 20% na vse" placeholderTextColor={COLORS.textTertiary} value={title} onChangeText={setTitle} />
            </View>
            <Text style={s.label}>Cena / Sleva</Text>
            <View style={s.inputRow}>
              <Ionicons name="cash" size={18} color={COLORS.primary} style={{ paddingLeft: 14 }} />
              <TextInput style={s.input} placeholder="199 Kc" placeholderTextColor={COLORS.textTertiary} value={price} onChangeText={setPrice} />
            </View>
            <Text style={s.label}>Typ</Text>
            <View style={s.typeRow}>
              {['Sleva','Akcni','Novinka','Vyprodej'].map(t => (
                <TouchableOpacity key={t} style={s.typeBtn}><Text style={s.typeBtnText}>{t}</Text></TouchableOpacity>
              ))}
            </View>
            <Text style={s.label}>Platnost</Text>
            <View style={s.typeRow}>
              {['1 den','3 dny','7 dni','30 dni'].map(d => (
                <TouchableOpacity key={d} style={s.typeBtn}><Text style={s.typeBtnText}>{d}</Text></TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={s.submitBtn}>
              <Ionicons name="add-circle" size={22} color="#FFF" />
              <Text style={s.submitBtnText}>Vytvorit deal</Text>
            </TouchableOpacity>
          </View>
        </>)}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, alignItems: 'center' },
  tabBtnActive: { backgroundColor: COLORS.primary + '20' },
  tabText: { color: COLORS.textTertiary, fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: COLORS.primary },
  content: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginTop: 16, marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: (SW - 50) / 2, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: 14, alignItems: 'center' },
  statIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statValue: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
  statLabel: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  dealRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: 14, marginBottom: 8, gap: 12 },
  dealInfo: { flex: 1 },
  dealTitle: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  dealDate: { color: COLORS.textTertiary, fontSize: 11, marginTop: 2 },
  dealStats: { flexDirection: 'row', gap: 8 },
  miniStat: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  miniStatText: { color: COLORS.textSecondary, fontSize: 11 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  form: { gap: 4 },
  label: { color: COLORS.text, fontSize: 13, fontWeight: '600', marginTop: 12, marginBottom: 4, marginLeft: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.border },
  input: { flex: 1, color: COLORS.text, fontSize: 14, paddingVertical: 12, paddingHorizontal: 8 },
  typeRow: { flexDirection: 'row', gap: 8 },
  typeBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  typeBtnText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: BORDER_RADIUS.md, marginTop: 20 },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
