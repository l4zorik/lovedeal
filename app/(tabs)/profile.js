import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { USERS } from '../constants/users';
import { DEALS } from '../constants/deals';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Divider from '../components/Divider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const currentUser = USERS[0];

const MOCK_POSTS = DEALS.slice(0, 9).map((d, i) => ({
  id: d.id,
  title: d.title,
  image: d.image,
  likes: d.likes,
}));

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Avatar uri={currentUser.avatar} name={currentUser.name} size={88} online />
        <View style={styles.nameContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{currentUser.name}</Text>
            {currentUser.verified && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
            )}
          </View>
          <Text style={styles.username}>{currentUser.handle}</Text>
          {currentUser.location && (
            <View style={styles.locationRow}>
              <Ionicons name="location" size={12} color={COLORS.textSecondary} />
              <Text style={styles.locationText}>{currentUser.location}, {currentUser.country}</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.bio}>{currentUser.bio}</Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{currentUser.dealsPosted}</Text>
          <Text style={styles.statLabel}>Dealů</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{currentUser.followers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Sledujících</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{currentUser.following}</Text>
          <Text style={styles.statLabel}>Sleduje</Text>
        </View>
      </View>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={16} color={COLORS.warning} />
        <Text style={styles.ratingText}>{currentUser.rating} hodnocení</Text>
        <Text style={styles.joinedText}>členem od {currentUser.joinedAt}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Button title="Upravit profil" variant="outline" onPress={() => {}} style={styles.actionBtn} icon="✏️" />
        <Button title="Sdílet" variant="ghost" onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} style={styles.actionBtn} icon="🔗" />
      </View>

      <Divider />

      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
          onPress={() => setActiveTab('posts')}
        >
          <Ionicons name="grid" size={20} color={activeTab === 'posts' ? COLORS.primary : COLORS.textTertiary} />
          <Text style={[styles.tabText, activeTab === 'posts' && styles.tabTextActive]}>Dealy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'saved' && styles.tabActive]}
          onPress={() => setActiveTab('saved')}
        >
          <Ionicons name="bookmark" size={20} color={activeTab === 'saved' ? COLORS.primary : COLORS.textTertiary} />
          <Text style={[styles.tabText, activeTab === 'saved' && styles.tabTextActive]}>Uložené</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'liked' && styles.tabActive]}
          onPress={() => setActiveTab('liked')}
        >
          <Ionicons name="heart" size={20} color={activeTab === 'liked' ? COLORS.primary : COLORS.textTertiary} />
          <Text style={[styles.tabText, activeTab === 'liked' && styles.tabTextActive]}>Oblíbené</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {MOCK_POSTS.map(post => (
          <TouchableOpacity key={post.id} style={styles.gridItem}>
            <Image source={{ uri: post.image }} style={styles.gridImage} />
            <View style={styles.gridOverlay}>
              <Ionicons name="heart" size={12} color="#FFF" />
              <Text style={styles.gridLikes}>{post.likes}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.md,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  profileInfo: { alignItems: 'center', paddingHorizontal: SPACING.lg },
  nameContainer: { alignItems: 'center', marginTop: SPACING.md },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 22, fontWeight: '700', color: COLORS.text, marginRight: SPACING.xs },
  username: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { fontSize: 12, color: COLORS.textSecondary },
  bio: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', paddingHorizontal: SPACING.xl, marginTop: SPACING.md, lineHeight: 20 },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingHorizontal: SPACING.xl, marginTop: SPACING.lg,
  },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: COLORS.border },
  ratingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginTop: SPACING.md,
  },
  ratingText: { fontSize: 13, color: COLORS.warning, fontWeight: '600' },
  joinedText: { fontSize: 12, color: COLORS.textTertiary },
  actionsRow: {
    flexDirection: 'row', justifyContent: 'center', paddingHorizontal: SPACING.lg, marginTop: SPACING.lg, gap: SPACING.sm,
  },
  actionBtn: { flex: 1 },
  tabsRow: {
    flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
  },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
  },
  tabActive: { backgroundColor: COLORS.primary + '20' },
  tabText: { fontSize: 13, color: COLORS.textTertiary, fontWeight: '600' },
  tabTextActive: { color: COLORS.primary },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.xs,
  },
  gridItem: {
    width: (SCREEN_WIDTH - SPACING.xs * 2 - SPACING.xs * 2) / 3,
    aspectRatio: 1, margin: 2, borderRadius: BORDER_RADIUS.sm, overflow: 'hidden',
  },
  gridImage: { width: '100%', height: '100%' },
  gridOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 4,
  },
  gridLikes: { fontSize: 11, color: '#FFF', marginLeft: 4, fontWeight: '600' },
});
