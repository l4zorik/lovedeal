import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, FlatList, Dimensions, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ALL_DEALS } from '../constants/dealsExtended';
import { CATEGORIES } from '../constants/categories';
import { SHOPS } from '../constants/shops';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { useLiteMode } from '../context/LiteModeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - SPACING.lg * 3) / 2;

export default function DiscoverScreen() {
  const { isLite } = useLiteMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('deals');

  const categoryMap = {};
  CATEGORIES.forEach(c => { categoryMap[c.id] = c.name; });

  const filteredDeals = ALL_DEALS.filter((deal) => {
    if (selectedCategory !== 'all' && deal.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const shop = SHOPS.find(s => s.id === deal.shopId);
      return (
        deal.title.toLowerCase().includes(q) ||
        (shop && shop.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const popularShops = SHOPS.slice(0, 8);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Objevit</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Hledej deals, obchody..."
            placeholderTextColor={COLORS.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionToggle}>
          <TouchableOpacity
            style={[styles.sectionBtn, activeSection === 'deals' && styles.sectionBtnActive]}
            onPress={() => setActiveSection('deals')}
          >
            <Ionicons name="flame" size={16} color={activeSection === 'deals' ? '#FFF' : COLORS.textSecondary} />
            <Text style={[styles.sectionBtnText, activeSection === 'deals' && styles.sectionBtnTextActive]}>Dealy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sectionBtn, activeSection === 'shops' && styles.sectionBtnActive]}
            onPress={() => setActiveSection('shops')}
          >
            <Ionicons name="storefront" size={16} color={activeSection === 'shops' ? '#FFF' : COLORS.textSecondary} />
            <Text style={[styles.sectionBtnText, activeSection === 'shops' && styles.sectionBtnTextActive]}>Obchody</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          <TouchableOpacity
            style={[styles.categoryChip, selectedCategory === 'all' && styles.categoryChipActive]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[styles.categoryChipText, selectedCategory === 'all' && styles.categoryChipTextActive]}>Vše</Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, selectedCategory === cat.id && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Ionicons name={cat.icon} size={14} color={selectedCategory === cat.id ? '#FFF' : COLORS.textSecondary} />
              <Text style={[styles.categoryChipText, selectedCategory === cat.id && styles.categoryChipTextActive]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      {activeSection === 'deals' ? (
        <FlatList
          data={filteredDeals}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <View style={styles.cardDiscount}>
                  <Text style={styles.cardDiscountText}>-{item.discount}%</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.cardPriceRow}>
                  {item.originalPrice ? (
                    <Text style={styles.cardOriginalPrice}>{item.originalPrice.toLocaleString('cs-CZ')} Kč</Text>
                  ) : null}
                  <Text style={styles.cardSalePrice}>{item.price.toLocaleString('cs-CZ')} Kč</Text>
                </View>
                {item.distance != null && (
                  <View style={styles.cardDistance}>
                    <Ionicons name="navigate" size={10} color={COLORS.textTertiary} />
                    <Text style={styles.cardDistanceText}>{item.distance < 1 ? Math.round(item.distance * 1000) + ' m' : item.distance.toFixed(1) + ' km'}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={COLORS.textTertiary} />
              <Text style={styles.emptyText}>Žádné deals nenalezeny</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={popularShops}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.shopsList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.shopCard}>
              <Image source={{ uri: item.logo }} style={styles.shopLogo} />
              <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{item.name}</Text>
                <Text style={styles.shopCity}>{item.city}</Text>
              </View>
              <View style={styles.shopRating}>
                <Ionicons name="star" size={14} color={COLORS.warning} />
                <Text style={styles.shopRatingText}>{item.rating}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  safeArea: { paddingTop: SPACING.md },
  header: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  title: { color: COLORS.text, fontSize: FONTS.sizes.xxxl, fontWeight: '800' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight,
    marginHorizontal: SPACING.lg, borderRadius: BORDER_RADIUS.md, paddingHorizontal: SPACING.md, height: 48, gap: SPACING.sm,
  },
  searchInput: { flex: 1, color: COLORS.text, fontSize: FONTS.sizes.lg },
  sectionToggle: {
    flexDirection: 'row', marginHorizontal: SPACING.lg, marginTop: SPACING.md, gap: SPACING.sm,
  },
  sectionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.surfaceLight,
  },
  sectionBtnActive: { backgroundColor: COLORS.primary },
  sectionBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  sectionBtnTextActive: { color: '#FFF' },
  categoriesScroll: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, gap: SPACING.sm },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.surfaceLight, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  categoryChipActive: { backgroundColor: COLORS.primary },
  categoryChipText: { color: COLORS.textSecondary, fontSize: FONTS.sizes.sm, fontWeight: '600' },
  categoryChipTextActive: { color: '#FFF' },
  row: { justifyContent: 'space-between', paddingHorizontal: SPACING.lg },
  gridContent: { paddingBottom: 100 },
  card: {
    width: CARD_WIDTH, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md, overflow: 'hidden',
  },
  cardImage: { width: '100%', height: CARD_WIDTH * 1.2 },
  cardOverlay: { position: 'absolute', top: SPACING.sm, left: SPACING.sm },
  cardDiscount: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: BORDER_RADIUS.sm },
  cardDiscountText: { color: '#FFF', fontSize: FONTS.sizes.xs, fontWeight: '800' },
  cardContent: { padding: SPACING.md },
  cardTitle: { color: COLORS.text, fontSize: FONTS.sizes.md, fontWeight: '600', lineHeight: 18, marginBottom: SPACING.xs },
  cardPriceRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  cardOriginalPrice: { color: COLORS.textTertiary, fontSize: FONTS.sizes.xs, textDecorationLine: 'line-through' },
  cardSalePrice: { color: COLORS.text, fontSize: FONTS.sizes.md, fontWeight: '800' },
  cardDistance: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  cardDistanceText: { color: COLORS.textTertiary, fontSize: 10 },
  emptyState: { alignItems: 'center', paddingTop: 100, gap: SPACING.md },
  emptyText: { color: COLORS.textTertiary, fontSize: FONTS.sizes.lg },
  shopsList: { paddingHorizontal: SPACING.lg, paddingBottom: 100 },
  shopCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, gap: SPACING.md,
  },
  shopLogo: { width: 48, height: 48, borderRadius: BORDER_RADIUS.md },
  shopInfo: { flex: 1 },
  shopName: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  shopCity: { color: COLORS.textSecondary, fontSize: 12 },
  shopRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  shopRatingText: { color: COLORS.warning, fontSize: 14, fontWeight: '700' },
});
