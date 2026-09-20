import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

function formatViewers(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function formatDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function LivestreamCard({ livestream, onPress, horizontal }) {
  const { title, streamer, status, viewers, category, duration, thumbnailUrl, deals } = livestream;
  const isLive = status === 'live';

  if (horizontal) {
    return (
      <TouchableOpacity style={styles.hCard} onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: thumbnailUrl }} style={styles.hThumb} />
        <View style={styles.hOverlay} />
        {isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
        {!isLive && (
          <View style={[styles.liveBadge, styles.upcomingBadge]}>
            <Ionicons name="time-outline" size={10} color="#FFF" />
            <Text style={styles.liveText}>BRZY</Text>
          </View>
        )}
        {viewers > 0 && (
          <View style={styles.viewersBadge}>
            <Ionicons name="eye" size={10} color="#FFF" />
            <Text style={styles.viewersText}>{formatViewers(viewers)}</Text>
          </View>
        )}
        <View style={styles.hBottom}>
          <Text style={styles.hTitle} numberOfLines={2}>{title}</Text>
          <Text style={styles.hStreamer}>{streamer.name}</Text>
        </View>
        {deals.length > 0 && (
          <View style={styles.dealsCount}>
            <Ionicons name="pricetag" size={10} color={COLORS.accent} />
            <Text style={styles.dealsCountText}>{deals.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.vCard} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: thumbnailUrl }} style={styles.vThumb} />
      <View style={styles.vOverlay} />

      {isLive && (
        <View style={styles.vLiveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.vLiveText}>LIVE</Text>
          <Text style={styles.vViewersText}>{formatViewers(viewers)} diváků</Text>
        </View>
      )}

      <View style={styles.vTopRight}>
        {streamer.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.primary} />
          </View>
        )}
      </View>

      <View style={styles.vBottom}>
        <View style={styles.vStreamerRow}>
          <View style={styles.vAvatar}>
            <Text style={styles.vAvatarText}>{streamer.name.charAt(0)}</Text>
          </View>
          <View style={styles.vStreamerInfo}>
            <Text style={styles.vStreamerName}>{streamer.name}</Text>
            <Text style={styles.vCategory}>{category}</Text>
          </View>
          {isLive && (
            <View style={styles.vDurationBadge}>
              <Text style={styles.vDurationText}>{formatDuration(duration)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.vTitle}>{title}</Text>

        {deals.length > 0 && (
          <View style={styles.vDealsRow}>
            <Ionicons name="pricetag" size={14} color={COLORS.accent} />
            <Text style={styles.vDealsText}>{deals.length} dealů v livestreamu</Text>
          </View>
        )}

        <View style={styles.vActions}>
          <TouchableOpacity style={styles.vActionBtn}>
            <Ionicons name="heart-outline" size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.vActionBtn}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.vActionBtn}>
            <Ionicons name="share-outline" size={22} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.vFollowBtn}>
            <Text style={styles.vFollowText}>Sledovat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(LivestreamCard);

const styles = StyleSheet.create({
  hCard: {
    width: 160,
    height: 220,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginRight: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  hThumb: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  hOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,20,16,0.45)',
  },
  liveBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  upcomingBadge: {
    backgroundColor: COLORS.primary,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
  },
  liveText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  viewersBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    gap: 3,
  },
  viewersText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  hBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.sm,
  },
  hTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  hStreamer: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
  },
  dealsCount: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  dealsCountText: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: '700',
  },
  vCard: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
  },
  vThumb: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  vOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,20,16,0.5)',
  },
  vLiveBadge: {
    position: 'absolute',
    top: 80,
    left: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BORDER_RADIUS.sm,
    gap: 5,
  },
  vLiveText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  vViewersText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  vTopRight: {
    position: 'absolute',
    top: 80,
    right: SPACING.lg,
  },
  verifiedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vBottom: {
    position: 'absolute',
    bottom: 90,
    left: SPACING.lg,
    right: SPACING.lg,
  },
  vStreamerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  vAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vAvatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  vStreamerInfo: {
    flex: 1,
  },
  vStreamerName: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  vCategory: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  vDurationBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  vDurationText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  vTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  vDealsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: 6,
  },
  vDealsText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  vActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  vActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vFollowBtn: {
    marginLeft: 'auto',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.full,
  },
  vFollowText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
