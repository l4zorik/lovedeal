import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';

export default function CreateDealScreen() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  const discount =
    originalPrice && price
      ? Math.round((1 - parseFloat(price) / parseFloat(originalPrice)) * 100)
      : 0;

  const handleSubmit = () => {
    if (!title || !price || !selectedCategory) return;
    setTitle('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setSelectedCategory(null);
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novy deal</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <View style={styles.cameraIconWrap}>
                <Ionicons name="camera" size={36} color={COLORS.primary} />
              </View>
              <Text style={styles.imageText}>Pridat foto dealu</Text>
              <Text style={styles.imageSubtext}>Kleknutim pridete fotografii</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <Text style={styles.label}>Nazev dealu</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputIcon}>
              <Ionicons name="pricetag" size={18} color={COLORS.primary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="napr. Mleko 1l za 19.90"
              placeholderTextColor={COLORS.textTertiary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <Text style={styles.label}>Cena</Text>
          <View style={styles.priceRow}>
            <View style={[styles.inputRow, styles.priceInput]}>
              <View style={styles.inputIcon}>
                <Ionicons name="cash" size={18} color={COLORS.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="19.90"
                placeholderTextColor={COLORS.textTertiary}
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={[styles.inputRow, styles.priceInput]}>
              <View style={styles.inputIcon}>
                <Ionicons name="cash-outline" size={18} color={COLORS.textTertiary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="24.90"
                placeholderTextColor={COLORS.textTertiary}
                value={originalPrice}
                onChangeText={setOriginalPrice}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Ionicons name="trending-down" size={16} color={COLORS.success} />
              <Text style={styles.discountText}>Sleva {discount}%</Text>
            </View>
          )}

          <Text style={styles.label}>Kategorie</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === cat.id && {
                    backgroundColor: cat.color + '20',
                    borderColor: cat.color,
                  },
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <View
                  style={[
                    styles.categoryIconWrap,
                    selectedCategory === cat.id && { backgroundColor: cat.color + '30' },
                  ]}
                >
                  <Ionicons
                    name={cat.icon}
                    size={22}
                    color={selectedCategory === cat.id ? cat.color : COLORS.textTertiary}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory === cat.id && { color: cat.color },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Popis</Text>
          <View style={[styles.inputRow, styles.descriptionRow]}>
            <View style={styles.inputIconTop}>
              <Ionicons name="document-text" size={18} color={COLORS.textTertiary} />
            </View>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Popiste svuj deal..."
              placeholderTextColor={COLORS.textTertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!title || !price || !selectedCategory) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!title || !price || !selectedCategory}
          >
            <Ionicons name="add-circle" size={22} color={COLORS.text} />
            <Text style={styles.submitText}>Nahrat deal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: SPACING.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: SPACING.xxxl,
  },
  imagePicker: {
    height: 200,
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.borderLight,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.lg,
  },
  cameraIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.glass,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  imageText: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  imageSubtext: {
    color: COLORS.textTertiary,
    fontSize: FONTS.sizes.sm,
    marginTop: 2,
  },
  form: {
    padding: SPACING.lg,
  },
  label: {
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: {
    paddingLeft: SPACING.md,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: FONTS.sizes.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  priceRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  priceInput: {
    flex: 1,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(107, 142, 35, 0.12)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  discountText: {
    color: COLORS.success,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: SPACING.xs,
  },
  categoryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    fontWeight: '500',
  },
  descriptionRow: {
    alignItems: 'flex-start',
  },
  inputIconTop: {
    paddingLeft: SPACING.md,
    paddingTop: SPACING.md,
  },
  descriptionInput: {
    minHeight: 100,
    paddingTop: SPACING.md,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING.xxl,
    gap: SPACING.sm,
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
  submitText: {
    color: COLORS.text,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
});
