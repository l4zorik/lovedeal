import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function ActionButtons({ deal, isLiked, onLike, isSaved, onSave }) {
  const formatCount = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return String(num);
  };

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLike();
  };

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSave();
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleComment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLike}>
        <View style={[styles.iconCircle, isLiked && styles.iconCircleActive]}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={28}
            color={isLiked ? COLORS.primary : COLORS.text}
          />
        </View>
        <Text style={styles.count}>{formatCount(deal.likes + (isLiked ? 1 : 0))}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleComment}>
        <View style={styles.iconCircle}>
          <Ionicons name="chatbubble-outline" size={26} color={COLORS.text} />
        </View>
        <Text style={styles.count}>{formatCount(deal.comments)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <View style={[styles.iconCircle, isSaved && styles.iconCircleSaved]}>
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={26}
            color={isSaved ? COLORS.accent : COLORS.text}
          />
        </View>
        <Text style={styles.count}>{formatCount(deal.saves + (isSaved ? 1 : 0))}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <View style={styles.iconCircle}>
          <Ionicons name="arrow-redo-outline" size={26} color={COLORS.text} />
        </View>
        <Text style={styles.count}>{formatCount(deal.shares)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: SPACING.lg,
  },
  button: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleActive: {
    backgroundColor: COLORS.primary + '30',
  },
  iconCircleSaved: {
    backgroundColor: COLORS.accent + '30',
  },
  count: {
    color: COLORS.text,
    fontSize: FONTS.sizes.xs,
    marginTop: 4,
    fontWeight: '600',
  },
});
