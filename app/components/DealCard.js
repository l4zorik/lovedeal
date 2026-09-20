import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated, Share } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { SHOPS } from '../constants/shops';
import { CATEGORIES } from '../constants/categories';
import { formatPrice, daysUntil, formatExpiry, getExpiryColor, formatDistance } from '../constants/formatting';

function getShop(shopId) { return SHOPS.find(s => s.id === shopId) || {}; }
function getCategory(catId) { return CATEGORIES.find(c => c.id === catId) || {}; }

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const FALLBACK_IMAGE = 'https://via.placeholder.com/800x1200/2A2118/FFF8F0?text=LoveDeal';
const AUTO_ADVANCE_MS = 8000;

function SpinningDisc({ avatar, config }) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!config?.spinningDisc) return;
    const anim = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 4000, useNativeDriver: true })
    );
    anim.start();
    return () => anim.stop();
  }, [config?.spinningDisc]);

  if (!config?.spinningDisc) return null;

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={[styles.spinningDisc, { transform: [{ rotate }] }]}>
      <View style={styles.spinningDiscInner}>
        <Image source={{ uri: avatar }} style={styles.spinningDiscImg} />
      </View>
    </Animated.View>
  );
}

function ProgressBar({ config, onDone }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!config?.progressBar) return;
    progress.setValue(0);
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: AUTO_ADVANCE_MS,
      useNativeDriver: false,
    });
    anim.start(({ finished }) => {
      if (finished) onDone?.();
    });
    return () => anim.stop();
  }, [config?.progressBar, onDone]);

  if (!config?.progressBar) return null;

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressBar, { width }]} />
    </View>
  );
}

function DealCard({ deal, isLite, config, scrollY, onDismiss, onLike, customization }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const heartTimer = useRef(null);
  const heartScale = useRef(new Animated.Value(0)).current;
  const [imgError, setImgError] = useState(false);
  const rightBarTranslateX = useRef(new Animated.Value(0)).current;
  const bottomInfoOpacity = useRef(new Animated.Value(1)).current;
  const videoRef = useRef(null);
  const [videoStatus, setVideoStatus] = useState({ isLoaded: false, playing: false });
  const [muted, setMuted] = useState(false);

  const hasVideo = !!deal.video;

  const cardStyle = customization?.cardStyle || 'elevated';
  const showDiscount = customization?.showDiscount !== false;
  const showOriginalPrice = customization?.showOriginalPrice !== false;
  const showTags = customization?.showTags !== false;
  const showSong = customization?.showSong !== false;
  const gradientOpacity = customization?.gradientOpacity || 0.6;

  useEffect(() => {
    return () => {
      if (heartTimer.current) clearTimeout(heartTimer.current);
      if (videoRef.current) {
        videoRef.current.stopAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (!config?.parallax || !scrollY) return;
    const listenerId = scrollY.addListener(({ value }) => {
      const p = Math.min(Math.abs(value) / SCREEN_HEIGHT, 1);
      rightBarTranslateX.setValue(p * 20);
      bottomInfoOpacity.setValue(1 - p * 0.5);
    });
    return () => scrollY.removeListener(listenerId);
  }, [scrollY, config?.parallax]);

  const handleDoubleTap = useCallback(() => {
    if (!liked) {
      setLiked(true);
      onLike?.(deal.id);
    }
    if (config?.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (!config?.animations) return;
    setShowHeart(true);
    heartScale.setValue(0);
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.2, useNativeDriver: true }),
      Animated.timing(heartScale, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(400),
      Animated.timing(heartScale, { toValue: 1.4, duration: 200, useNativeDriver: true }),
    ]).start(() => setShowHeart(false));
    if (heartTimer.current) clearTimeout(heartTimer.current);
    heartTimer.current = setTimeout(() => setShowHeart(false), 800);
  }, [liked, config, deal.id, onLike]);

  const handleLike = useCallback(() => {
    const next = !liked;
    setLiked(next);
    if (next) onLike?.(deal.id);
    if (config?.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [liked, config, deal.id, onLike]);

  const handleSave = useCallback(() => {
    setSaved(!saved);
    if (config?.haptics) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [saved, config]);

  const handleShare = useCallback(async () => {
    if (config?.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      await Share.share({
        message: `${deal.title} - ${deal.salePrice} | LoveDeal`,
        url: `lovedeal://deal/${deal.id}`,
      });
    } catch (e) {}
  }, [config, deal]);

  const handleAutoAdvance = useCallback(() => {
    onDismiss?.(deal.id);
  }, [deal.id, onDismiss]);

  const imageTranslateY = config?.parallax && scrollY
    ? scrollY.interpolate({
        inputRange: [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT],
        outputRange: [-SCREEN_HEIGHT * 0.15, 0, SCREEN_HEIGHT * 0.15],
        extrapolate: 'clamp',
      })
    : 0;

  const rightBarStyle = config?.parallax
    ? { transform: [{ translateX: rightBarTranslateX }] }
    : {};

  const bottomInfoStyle = config?.parallax
    ? { opacity: bottomInfoOpacity }
    : {};

  const ImageComponent = config?.animations ? Animated.Image : Image;

  return (
    <View style={styles.container}>
      <ProgressBar config={config} onDone={handleAutoAdvance} />

      <TouchableOpacity
        style={styles.imageArea}
        activeOpacity={1}
        onPress={hasVideo ? () => {
          if (videoStatus.playing) {
            videoRef.current?.pauseAsync();
          } else {
            videoRef.current?.playAsync();
          }
          if (config?.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } : handleDoubleTap}
      >
        {hasVideo ? (
          <Video
            ref={videoRef}
            source={{ uri: deal.video }}
            style={[styles.bgImage, config?.animations && { transform: [{ translateY: imageTranslateY }] }]}
            resizeMode={ResizeMode.COVER}
            shouldPlay={true}
            isLooping={true}
            isMuted={muted}
            useNativeControls={false}
            onPlaybackStatusUpdate={(status) => {
              setVideoStatus({
                isLoaded: status.isLoaded,
                playing: status.isPlaying,
              });
            }}
          />
        ) : (
          <ImageComponent
            source={{ uri: imgError ? FALLBACK_IMAGE : deal.image }}
            style={[
              styles.bgImage,
              config?.animations && { transform: [{ translateY: imageTranslateY }] },
            ]}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        )}
        <View style={styles.gradientTop} />
        {config?.simpleGradients ? null : (
          <View style={[styles.gradientBottom, { height: SCREEN_HEIGHT * 0.45, backgroundColor: `rgba(26,20,16,${gradientOpacity})` }]} />
        )}

        {hasVideo && (
          <View style={styles.videoBadge}>
            <Ionicons name={videoStatus.playing ? 'pause' : 'play'} size={14} color="#FFF" />
          </View>
        )}
        {hasVideo && (
          <TouchableOpacity
            style={styles.muteBtn}
            onPress={(e) => {
              e.stopPropagation?.();
              setMuted(!muted);
            }}
          >
            <Ionicons name={muted ? 'volume-mute' : 'volume-high'} size={16} color="#FFF" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {showHeart && config?.animations && (
        <View style={styles.heartOverlay}>
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <Ionicons name="heart" size={100} color={COLORS.primary} />
          </Animated.View>
        </View>
      )}

      <Animated.View style={[styles.rightBar, rightBarStyle]}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: deal.avatar }} style={styles.avatar} />
          <View style={styles.followBtn}>
            <Ionicons name="add" size={12} color="#FFF" />
          </View>
        </View>

        <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={30}
            color={liked ? COLORS.primary : COLORS.text}
          />
          <Text style={styles.actionLabel}>{deal.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={28} color={COLORS.text} />
          <Text style={styles.actionLabel}>{deal.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleSave}>
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={28}
            color={saved ? COLORS.accent : COLORS.text}
          />
          <Text style={styles.actionLabel}>{deal.saves}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
          <Ionicons name="arrow-redo-outline" size={28} color={COLORS.text} />
          <Text style={styles.actionLabel}>{deal.shares}</Text>
        </TouchableOpacity>

        <SpinningDisc avatar={deal.avatar} config={config} />
      </Animated.View>

      <Animated.View style={[styles.bottomInfo, bottomInfoStyle]}>
        <View style={styles.handleRow}>
          <Text style={styles.handle}>{deal.handle || deal.brand}</Text>
          {deal.verified && (
            <Ionicons name="checkmark-circle" size={16} color={COLORS.accent} />
          )}
          {deal.shopId && (() => { const shop = getShop(deal.shopId); return (
            <View style={styles.shopBadge}>
              <Image source={{ uri: shop.logo }} style={styles.shopLogo} />
              <Text style={styles.shopName}>{shop.name}</Text>
            </View>
          ); })()}
        </View>
        <Text style={styles.description} numberOfLines={2}>{deal.description || deal.title}</Text>

        {deal.category && (() => { const cat = getCategory(deal.category); return (
          <View style={[styles.categoryBadge, { backgroundColor: cat.color + '30' }]}>
            <Ionicons name={cat.icon} size={12} color={cat.color} />
            <Text style={[styles.categoryText, { color: cat.color }]}>{cat.name}</Text>
          </View>
        ); })()}

        {deal.type === 'ad' ? (
          <View style={styles.discountRow}>
            {showDiscount && deal.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{deal.discount}%</Text>
              </View>
            )}
            <Text style={styles.salePrice}>{deal.salePrice || formatPrice(deal.price)}</Text>
          </View>
        ) : showDiscount && (deal.discount || deal.originalPrice) ? (
          <View style={styles.discountRow}>
            {deal.discount ? (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{deal.discount}%</Text>
              </View>
            ) : null}
            {showOriginalPrice && deal.originalPrice ? (
              <Text style={styles.originalPrice}>{formatPrice(deal.originalPrice)}</Text>
            ) : null}
            <Text style={styles.salePrice}>{formatPrice(deal.price || deal.salePrice)}</Text>
          </View>
        ) : null}

        {deal.expiresAt && (
          <View style={styles.expiryRow}>
            <Ionicons name="time-outline" size={12} color={getExpiryColor(deal.expiresAt)} />
            <Text style={[styles.expiryText, { color: getExpiryColor(deal.expiresAt) }]}>
              {formatExpiry(deal.expiresAt)}
            </Text>
            {deal.distance != null && (
              <>
                <Text style={styles.expiryDot}>·</Text>
                <Ionicons name="navigate" size={12} color={COLORS.textSecondary} />
                <Text style={styles.distanceText}>{formatDistance(deal.distance)}</Text>
              </>
            )}
          </View>
        )}

        {showTags && deal.tags && (
          <View style={styles.tagsRow}>
            {deal.tags.slice(0, 3).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {showSong && (deal.brand || deal.song) && (
          <View style={styles.songRow}>
            <Ionicons name="musical-notes" size={12} color={COLORS.text} />
            <Text style={styles.songText} numberOfLines={1}>
              {deal.brand}{deal.song ? ' · ' + deal.song : ''}
            </Text>
          </View>
        )}

        {deal.location && (
          <View style={styles.locationRow}>
            <Ionicons name="location" size={12} color={COLORS.textSecondary} />
            <Text style={styles.locationText}>{deal.location}</Text>
            {deal.country && (
              <Text style={styles.countryFlag}>
                {EUROPEAN_FLAGS[deal.country] || deal.country}
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const EUROPEAN_FLAGS = {
  CZ: '🇨🇿',
  SK: '🇸🇰',
  PL: '🇵🇱',
  DE: '🇩🇪',
  AT: '🇦🇹',
  HU: '🇭🇺',
  EU: '🇪🇺',
};

export default memo(DealCard);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.background,
  },
  imageArea: {
    ...StyleSheet.absoluteFillObject,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(26,20,16,0.4)',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressTrack: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(200,132,45,0.2)',
    zIndex: 30,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.accent,
  },
  heartOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  rightBar: {
    position: 'absolute',
    right: 8,
    bottom: 200,
    alignItems: 'center',
    gap: 16,
    zIndex: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  followBtn: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -11,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 2,
  },
  actionLabel: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '600',
    textShadowColor: 'rgba(26,20,16,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  spinningDisc: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 1,
    marginTop: 4,
  },
  spinningDiscInner: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
    padding: 2,
    backgroundColor: COLORS.background,
  },
  spinningDiscImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  bottomInfo: {
    position: 'absolute',
    left: 12,
    right: 80,
    bottom: 200,
    zIndex: 10,
  },
  handleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  handle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(26,20,16,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  shopBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
    gap: 4,
  },
  shopLogo: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  shopName: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: '600',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
    gap: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  description: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 18,
    textShadowColor: 'rgba(26,20,16,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    marginBottom: 6,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  expiryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  expiryDot: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginHorizontal: 2,
  },
  distanceText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: 'rgba(200,132,45,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  songText: {
    color: COLORS.text,
    fontSize: 11,
    textShadowColor: 'rgba(26,20,16,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  originalPrice: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  salePrice: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  countryFlag: {
    fontSize: 12,
  },
  videoBadge: {
    position: 'absolute',
    top: 80,
    left: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  muteBtn: {
    position: 'absolute',
    top: 80,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
