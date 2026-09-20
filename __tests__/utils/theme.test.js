import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../app/constants/theme';

describe('COLORS', () => {
  it('obsahuje primární barvy', () => {
    expect(COLORS.primary).toBeDefined();
    expect(COLORS.primaryDark).toBeDefined();
    expect(COLORS.secondary).toBeDefined();
    expect(COLORS.accent).toBeDefined();
  });

  it('obsahuje barvy stavu', () => {
    expect(COLORS.success).toBeDefined();
    expect(COLORS.warning).toBeDefined();
    expect(COLORS.danger).toBeDefined();
  });

  it('obsahuje barvy pozadí', () => {
    expect(COLORS.background).toBeDefined();
    expect(COLORS.surface).toBeDefined();
    expect(COLORS.surfaceLight).toBeDefined();
    expect(COLORS.surfaceElevated).toBeDefined();
  });

  it('obsahuje barvy textu', () => {
    expect(COLORS.text).toBeDefined();
    expect(COLORS.textSecondary).toBeDefined();
    expect(COLORS.textTertiary).toBeDefined();
    expect(COLORS.textInverse).toBeDefined();
  });

  it('obsahuje barvy ohraničení', () => {
    expect(COLORS.border).toBeDefined();
    expect(COLORS.borderLight).toBeDefined();
  });

  it('obsahuje overlay barvy', () => {
    expect(COLORS.overlay).toBeDefined();
    expect(COLORS.overlayLight).toBeDefined();
  });

  it('obsahuje glass efekty', () => {
    expect(COLORS.glass).toBeDefined();
    expect(COLORS.glassBorder).toBeDefined();
  });

  it('obsahuje ad badge barvy', () => {
    expect(COLORS.adBadge).toBeDefined();
    expect(COLORS.adBadgeText).toBeDefined();
  });

  it('obsahuje gradient', () => {
    expect(COLORS.gradient.start).toBeDefined();
    expect(COLORS.gradient.end).toBeDefined();
  });

  it('obsahuje autumn paletu', () => {
    expect(COLORS.autumn.amber).toBeDefined();
    expect(COLORS.autumn.copper).toBeDefined();
    expect(COLORS.autumn.bronze).toBeDefined();
    expect(COLORS.autumn.sienna).toBeDefined();
    expect(COLORS.autumn.chocolate).toBeDefined();
    expect(COLORS.autumn.cream).toBeDefined();
    expect(COLORS.autumn.parchment).toBeDefined();
    expect(COLORS.autumn.moss).toBeDefined();
    expect(COLORS.autumn.olive).toBeDefined();
    expect(COLORS.autumn.rust).toBeDefined();
  });

  it('má konzistentní hex formát', () => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const hexColors = [
      COLORS.primary, COLORS.primaryDark, COLORS.secondary, COLORS.secondaryLight,
      COLORS.accent, COLORS.success, COLORS.warning, COLORS.danger,
      COLORS.background, COLORS.surface, COLORS.surfaceLight, COLORS.surfaceElevated,
      COLORS.text, COLORS.textInverse, COLORS.adBadge, COLORS.adBadgeText,
      COLORS.gradient.start, COLORS.gradient.end,
      COLORS.autumn.amber, COLORS.autumn.copper, COLORS.autumn.bronze,
      COLORS.autumn.sienna, COLORS.autumn.chocolate, COLORS.autumn.cream,
      COLORS.autumn.parchment, COLORS.autumn.moss, COLORS.autumn.olive, COLORS.autumn.rust,
    ];
    hexColors.forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });
  });
});

describe('FONTS', () => {
  it('má velikosti písma', () => {
    expect(FONTS.sizes.xs).toBeGreaterThanOrEqual(8);
    expect(FONTS.sizes.sm).toBeGreaterThanOrEqual(10);
    expect(FONTS.sizes.md).toBeGreaterThanOrEqual(12);
    expect(FONTS.sizes.lg).toBeGreaterThanOrEqual(14);
    expect(FONTS.sizes.xl).toBeGreaterThanOrEqual(16);
    expect(FONTS.sizes.xxl).toBeGreaterThanOrEqual(18);
    expect(FONTS.sizes.xxxl).toBeGreaterThanOrEqual(22);
    expect(FONTS.sizes.display).toBeGreaterThanOrEqual(28);
  });

  it('má rostoucí velikosti', () => {
    expect(FONTS.sizes.xs).toBeLessThan(FONTS.sizes.sm);
    expect(FONTS.sizes.sm).toBeLessThan(FONTS.sizes.md);
    expect(FONTS.sizes.md).toBeLessThan(FONTS.sizes.lg);
    expect(FONTS.sizes.lg).toBeLessThan(FONTS.sizes.xl);
    expect(FONTS.sizes.xl).toBeLessThan(FONTS.sizes.xxl);
    expect(FONTS.sizes.xxl).toBeLessThan(FONTS.sizes.xxxl);
    expect(FONTS.sizes.xxxl).toBeLessThan(FONTS.sizes.display);
  });
});

describe('SPACING', () => {
  it('má spacing hodnoty', () => {
    expect(SPACING.xs).toBeGreaterThan(0);
    expect(SPACING.sm).toBeGreaterThan(SPACING.xs);
    expect(SPACING.md).toBeGreaterThan(SPACING.sm);
    expect(SPACING.lg).toBeGreaterThan(SPACING.md);
    expect(SPACING.xl).toBeGreaterThan(SPACING.lg);
    expect(SPACING.xxl).toBeGreaterThan(SPACING.xl);
    expect(SPACING.xxxl).toBeGreaterThan(SPACING.xxl);
  });
});

describe('BORDER_RADIUS', () => {
  it('má border radius hodnoty', () => {
    expect(BORDER_RADIUS.sm).toBeGreaterThan(0);
    expect(BORDER_RADIUS.md).toBeGreaterThan(BORDER_RADIUS.sm);
    expect(BORDER_RADIUS.lg).toBeGreaterThan(BORDER_RADIUS.md);
    expect(BORDER_RADIUS.xl).toBeGreaterThan(BORDER_RADIUS.lg);
    expect(BORDER_RADIUS.full).toBe(9999);
  });
});

describe('SHADOWS', () => {
  it('má shadow velikosti', () => {
    expect(SHADOWS.sm).toBeDefined();
    expect(SHADOWS.md).toBeDefined();
    expect(SHADOWS.lg).toBeDefined();
  });

  it('shadow sm má nižší elevation než md', () => {
    expect(SHADOWS.sm.elevation).toBeLessThan(SHADOWS.md.elevation);
  });

  it('shadow md má nižší elevation než lg', () => {
    expect(SHADOWS.md.elevation).toBeLessThan(SHADOWS.lg.elevation);
  });

  it('každá shadow má potřebné vlastnosti', () => {
    [SHADOWS.sm, SHADOWS.md, SHADOWS.lg].forEach((shadow) => {
      expect(shadow.shadowColor).toBeDefined();
      expect(shadow.shadowOffset).toBeDefined();
      expect(shadow.shadowOffset.width).toBeDefined();
      expect(shadow.shadowOffset.height).toBeDefined();
      expect(shadow.shadowOpacity).toBeGreaterThanOrEqual(0);
      expect(shadow.shadowOpacity).toBeLessThanOrEqual(1);
      expect(shadow.shadowRadius).toBeGreaterThanOrEqual(0);
      expect(shadow.elevation).toBeGreaterThanOrEqual(0);
    });
  });
});
