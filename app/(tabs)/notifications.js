import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'like',
    user: 'Petr Novak',
    avatar: null,
    text: 'se libi tvuj deal Nike Air Max -40%',
    time: '2m',
    icon: 'heart',
    color: '#FF6B6B',
    read: false,
  },
  {
    id: '2',
    type: 'like',
    user: 'Jana Vesela',
    avatar: null,
    text: 'se libi tvuj deal PS5 Slim',
    time: '10m',
    icon: 'heart',
    color: '#FF6B6B',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    user: 'Eva Dvorakova',
    avatar: null,
    text: 'te zacala sledovat',
    time: '15m',
    icon: 'person-add',
    color: '#4ECDC4',
    read: false,
  },
  {
    id: '4',
    type: 'comment',
    user: 'Jan Prochazka',
    avatar: null,
    text: 'okomentoval deal PS5 Slim: Paradni cena!',
    time: '1h',
    icon: 'chatbubble',
    color: '#FFD93D',
    read: true,
  },
  {
    id: '5',
    type: 'save',
    user: 'Marie Horakova',
    avatar: null,
    text: 'ulozila tvuj deal Alza iPhone 15',
    time: '2h',
    icon: 'bookmark',
    color: '#6BCB77',
    read: true,
  },
  {
    id: '6',
    type: 'system',
    user: 'LoveDeal',
    avatar: null,
    text: 'Tvej deal Nike dostal 1000 liku! Jsi popularni!',
    time: '5h',
    icon: 'flame',
    color: COLORS.primary,
    read: true,
  },
  {
    id: '7',
    type: 'reward',
    user: 'LoveDeal',
    avatar: null,
    text: 'Ziskal jsi odmenu 50 Kc za sdileni dealu',
    time: '1d',
    icon: 'gift',
    color: '#9B59B6',
    read: true,
  },
  {
    id: '8',
    type: 'comment',
    user: 'Tomas Cerny',
    avatar: null,
    text: 'odpovedel na tvuj komentar u dealu Switch',
    time: '2d',
    icon: 'chatbubble',
    color: '#FFD93D',
    read: true,
  },
];

const FILTERS = [
  { id: 'all', label: 'Vse' },
  { id: 'like', label: 'Libi' },
  { id: 'comment', label: 'Komentare' },
  { id: 'follow', label: 'Sledujici' },
  { id: 'save', label: 'Ulozeni' },
  { id: 'system', label: 'System' },
];

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filteredNotifications =
    activeFilter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === activeFilter);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Upozorneni</Text>
            {unreadCount > 0 && (
              <Text style={styles.unreadBadge}>{unreadCount} novych</Text>
            )}
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={markAllAsRead} style={styles.markReadButton}>
              <Ionicons name="checkmark-done" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={22} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterChip, activeFilter === filter.id && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text
                style={[styles.filterText, activeFilter === filter.id && styles.filterTextActive]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationCard, !item.read && styles.notificationCardUnread]}
          >
            <View style={[styles.avatarCircle, { backgroundColor: item.color + '25' }]}>
              {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
              ) : (
                <Ionicons name={item.icon} size={22} color={item.color} />
              )}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationText} numberOfLines={2}>
                <Text style={styles.notificationUser}>{item.user} </Text>
                {item.text}
              </Text>
              <View style={styles.notificationMeta}>
                <Text style={styles.notificationTime}>{item.time}</Text>
                <View style={[styles.typeDot, { backgroundColor: item.color }]} />
              </View>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={48} color={COLORS.textTertiary} />
            <Text style={styles.emptyText}>Zadna upozorneni</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.text,
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
  },
  unreadBadge: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  markReadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterRow: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surfaceLight,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.text,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    gap: SPACING.md,
  },
  notificationCardUnread: {
    backgroundColor: COLORS.glass,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginVertical: 2,
    borderBottomWidth: 0,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  notificationUser: {
    color: COLORS.text,
    fontWeight: '700',
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: 4,
  },
  notificationTime: {
    color: COLORS.textTertiary,
    fontSize: FONTS.sizes.xs,
  },
  typeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xxxl * 2,
    gap: SPACING.md,
  },
  emptyText: {
    color: COLORS.textTertiary,
    fontSize: FONTS.sizes.lg,
  },
});
