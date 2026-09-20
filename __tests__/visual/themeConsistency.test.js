import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../app/constants/theme';
import { CUSTOMIZATION_PRESETS } from '../../app/constants/mockData';

function parseColor(color) {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
    };
  }
  return null;
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Theme Consistency', () => {
  it('všechny barvy jsou validní hex', () => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const hexColors = [
      COLORS.primary, COLORS.primaryDark, COLORS.secondary, COLORS.secondaryLight,
      COLORS.accent, COLORS.success, COLORS.warning, COLORS.danger,
      COLORS.background, COLORS.surface, COLORS.surfaceLight, COLORS.surfaceElevated,
      COLORS.text, COLORS.textInverse, COLORS.adBadge, COLORS.adBadgeText,
      COLORS.gradient.start, COLORS.gradient.end,
    ];
    hexColors.forEach((color) => {
      expect(color).toMatch(hexRegex);
    });
  });

  it('font sizes jsou >= 10', () => {
    Object.values(FONTS.sizes).forEach((size) => {
      expect(size).toBeGreaterThanOrEqual(10);
    });
  });

  it('spacing hodnoty jsou > 0 a klesají', () => {
    expect(SPACING.xs).toBeGreaterThan(0);
    expect(SPACING.sm).toBeGreaterThan(SPACING.xs);
    expect(SPACING.md).toBeGreaterThan(SPACING.sm);
    expect(SPACING.lg).toBeGreaterThan(SPACING.md);
    expect(SPACING.xl).toBeGreaterThan(SPACING.lg);
    expect(SPACING.xxl).toBeGreaterThan(SPACING.xl);
    expect(SPACING.xxxl).toBeGreaterThan(SPACING.xxl);
  });

  it('border radius hodnoty jsou > 0', () => {
    Object.entries(BORDER_RADIUS).forEach(([key, value]) => {
      expect(value).toBeGreaterThan(0);
    });
  });

  it('shadows mají rozumné hodnoty', () => {
    Object.values(SHADOWS).forEach((shadow) => {
      expect(shadow.shadowOpacity).toBeGreaterThanOrEqual(0);
      expect(shadow.shadowOpacity).toBeLessThanOrEqual(1);
      expect(shadow.elevation).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Color Contrast (WCAG AA)', () => {
  it('text na background splňuje 4.5:1 pro běžný text', () => {
    const textLum = relativeLuminance(parseColor(COLORS.text));
    const bgLum = relativeLuminance(parseColor(COLORS.background));
    const ratio = contrastRatio(textLum, bgLum);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('textSecondary na background má rozumný kontrast', () => {
    const textLum = relativeLuminance(parseColor(COLORS.textSecondary));
    const bgLum = relativeLuminance(parseColor(COLORS.background));
    const ratio = contrastRatio(textLum, bgLum);
    expect(ratio).toBeGreaterThanOrEqual(3.0);
  });

  it('primary barva na tmavém pozadí má kontrast', () => {
    const primaryLum = relativeLuminance(parseColor(COLORS.primary));
    const bgLum = relativeLuminance(parseColor(COLORS.background));
    const ratio = contrastRatio(primaryLum, bgLum);
    expect(ratio).toBeGreaterThanOrEqual(3.0);
  });

  it('adBadgeText na adBadge má kontrast', () => {
    const textLum = relativeLuminance(parseColor(COLORS.adBadgeText));
    const bgLum = relativeLuminance(parseColor(COLORS.adBadge));
    const ratio = contrastRatio(textLum, bgLum);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

describe('Customization Presets', () => {
  it('všechny presety mají platné hodnoty', () => {
    Object.values(CUSTOMIZATION_PRESETS).forEach((preset) => {
      expect(typeof preset.name).toBe('string');
      expect(typeof preset.description).toBe('string');
      expect(['flat', 'elevated', 'glass']).toContain(preset.cardStyle);
      expect(typeof preset.showDiscount).toBe('boolean');
      expect(typeof preset.showOriginalPrice).toBe('boolean');
      expect(typeof preset.showTags).toBe('boolean');
      expect(typeof preset.showSong).toBe('boolean');
      expect(preset.gradientOpacity).toBeGreaterThanOrEqual(0);
      expect(preset.gradientOpacity).toBeLessThanOrEqual(1);
    });
  });

  it('minimal preset má nejmenší gradientOpacity', () => {
    expect(CUSTOMIZATION_PRESETS.minimal.gradientOpacity)
      .toBeLessThanOrEqual(CUSTOMIZATION_PRESETS.standard.gradientOpacity);
  });

  it('premium preset má největší gradientOpacity', () => {
    expect(CUSTOMIZATION_PRESETS.premium.gradientOpacity)
      .toBeGreaterThanOrEqual(CUSTOMIZATION_PRESETS.standard.gradientOpacity);
  });

  it('minimal nemá tags a song', () => {
    expect(CUSTOMIZATION_PRESETS.minimal.showTags).toBe(false);
    expect(CUSTOMIZATION_PRESETS.minimal.showSong).toBe(false);
  });

  it('standard a premium mají tags a song', () => {
    expect(CUSTOMIZATION_PRESETS.standard.showTags).toBe(true);
    expect(CUSTOMIZATION_PRESETS.standard.showSong).toBe(true);
    expect(CUSTOMIZATION_PRESETS.premium.showTags).toBe(true);
    expect(CUSTOMIZATION_PRESETS.premium.showSong).toBe(true);
  });
});
