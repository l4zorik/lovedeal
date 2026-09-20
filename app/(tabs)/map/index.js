import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import Chip from '../../components/Chip';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Rating from '../../components/Rating';

const FILTERS = [
  { id: 'all', label: 'Vse', icon: 'apps' },
  { id: 'food', label: 'Jidlo', icon: 'restaurant' },
  { id: 'electronics', label: 'Elektronika', icon: 'hardware-chip' },
  { id: 'fashion', label: 'Moda', icon: 'shirt' },
  { id: 'home', label: 'Domacnost', icon: 'home' },
  { id: 'sports', label: 'Sport', icon: 'football' },
];

const MOCK_MARKERS = [
  { id: 1, name: 'Albert Praha', deals: 12, rating: 4.2, lat: 50.075, lng: 14.437 },
  { id: 2, name: 'Lidl Brno', deals: 8, rating: 4.5, lat: 49.195, lng: 16.606 },
  { id: 3, name: 'Alza Praha', deals: 25, rating: 4.7, lat: 50.100, lng: 14.450 },
  { id: 4, name: 'Decathlon Brno', deals: 15, rating: 4.6, lat: 49.200, lng: 16.610 },
  { id: 5, name: 'H&M Praha', deals: 18, rating: 4.0, lat: 50.080, lng: 14.420 },
];

export default function MapScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMarker(marker);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa</Text>
        <TouchableOpacity>
          <Ionicons name="locate" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersRow}
        contentContainerStyle={styles.filtersContent}
      >
        {FILTERS.map(filter => (
          <Chip
            key={filter.id}
            label={filter.label}
            icon={filter.icon}
            selected={activeFilter === filter.id}
            onPress={() => setActiveFilter(filter.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={64} color={COLORS.textTertiary} />
        <Text style={styles.mapText}>Mapa se nacita...</Text>
        <Text style={styles.mapSubtext}>Zobrazuji deals v okoli</Text>
      </View>

      <View style={styles.markersList}>
        <Text style={styles.markersTitle}>Deals poblize ({MOCK_MARKERS.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MOCK_MARKERS.map(marker => (
            <TouchableOpacity
              key={marker.id}
              onPress={() => handleMarkerPress(marker)}
              style={[styles.markerCard, selectedMarker?.id === marker.id && styles.markerCardActive]}
            >
              <Avatar name={marker.name} size={32} />
              <Text style={styles.markerName} numberOfLines={1}>{marker.name}</Text>
              <Text style={styles.markerDeals}>{marker.deals} deals</Text>
              <Rating value={marker.rating} size={10} showValue={false} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {selectedMarker && (
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Avatar name={selectedMarker.name} size={40} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailName}>{selectedMarker.name}</Text>
              <Rating value={selectedMarker.rating} size={12} />
            </View>
            <TouchableOpacity onPress={() => setSelectedMarker(null)}>
              <Ionicons name="close" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.detailDeals}>{selectedMarker.deals} aktivnich dealu</Text>
          <View style={styles.detailActions}>
            <TouchableOpacity style={styles.detailAction}>
              <Ionicons name="navigate" size={20} color={COLORS.primary} />
              <Text style={styles.detailActionText}>Navigovat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction}>
              <Ionicons name="list" size={20} color={COLORS.primary} />
              <Text style={styles.detailActionText}>Deals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction}>
              <Ionicons name="call" size={20} color={COLORS.primary} />
              <Text style={styles.detailActionText}>Zavolat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  filtersRow: {
    maxHeight: 50,
  },
  filtersContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  mapSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  markersList: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  markersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  markerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginRight: SPACING.sm,
    width: 140,
    alignItems: 'center',
  },
  markerCardActive: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  markerName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  markerDeals: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  detailCard: {
    position: 'absolute',
    bottom: 100,
    left: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  detailName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  detailDeals: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailAction: {
    alignItems: 'center',
  },
  detailActionText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
});
