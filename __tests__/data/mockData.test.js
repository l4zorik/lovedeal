import { DEALS, CATEGORIES, EUROPEAN_COUNTRIES, CUSTOMIZATION_PRESETS } from '../../app/constants/mockData';

describe('DEALS', () => {
  it('je neprázdné pole', () => {
    expect(Array.isArray(DEALS)).toBe(true);
    expect(DEALS.length).toBeGreaterThan(0);
  });

  it('každý deal má povinné fields', () => {
    DEALS.forEach((deal) => {
      expect(deal.id).toBeDefined();
      expect(deal.type).toBeDefined();
      expect(deal.brand).toBeDefined();
      expect(deal.handle).toBeDefined();
      expect(deal.avatar).toBeDefined();
      expect(deal.title).toBeDefined();
      expect(deal.description).toBeDefined();
      expect(deal.image).toBeDefined();
      expect(deal.likes).toBeDefined();
      expect(deal.comments).toBeDefined();
      expect(deal.shares).toBeDefined();
      expect(deal.saves).toBeDefined();
    });
  });

  it('má mix deal a ad typů', () => {
    const types = DEALS.map((d) => d.type);
    expect(types).toContain('deal');
    expect(types).toContain('ad');
  });

  it('ad deals mají CTA fields', () => {
    DEALS.filter((d) => d.type === 'ad').forEach((ad) => {
      expect(ad.cta).toBeDefined();
      expect(ad.ctaUrl).toBeDefined();
      expect(ad.advertiser).toBeDefined();
      expect(ad.impressionId).toBeDefined();
    });
  });

  it('každý deal má validní image URL', () => {
    DEALS.forEach((deal) => {
      expect(deal.image).toMatch(/^https?:\/\//);
    });
  });

  it('každý deal má validní avatar URL', () => {
    DEALS.forEach((deal) => {
      expect(deal.avatar).toMatch(/^https?:\/\//);
    });
  });

  it('deal deals mají tags jako pole', () => {
    DEALS.filter((d) => d.type === 'deal').forEach((deal) => {
      expect(Array.isArray(deal.tags)).toBe(true);
      expect(deal.tags.length).toBeGreaterThan(0);
    });
  });

  it('každý deal má kategorii', () => {
    DEALS.forEach((deal) => {
      expect(deal.category).toBeDefined();
      expect(typeof deal.category).toBe('string');
    });
  });

  it('deal deals mají slevu', () => {
    DEALS.filter((d) => d.type === 'deal').forEach((deal) => {
      expect(deal.discount).toBeDefined();
      expect(deal.salePrice).toBeDefined();
    });
  });

  it('obsahuje české a evropské lokace', () => {
    const locations = DEALS.map((d) => d.country);
    expect(locations).toContain('CZ');
  });
});

describe('CATEGORIES', () => {
  it('je neprázdné pole', () => {
    expect(Array.isArray(CATEGORIES)).toBe(true);
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it('každá kategorie má id, name a icon', () => {
    CATEGORIES.forEach((cat) => {
      expect(cat.id).toBeDefined();
      expect(cat.name).toBeDefined();
      expect(cat.icon).toBeDefined();
    });
  });

  it('má kategorii "Vše"', () => {
    const all = CATEGORIES.find((c) => c.id === 'all');
    expect(all).toBeDefined();
  });
});

describe('EUROPEAN_COUNTRIES', () => {
  it('je neprázdné pole', () => {
    expect(Array.isArray(EUROPEAN_COUNTRIES)).toBe(true);
    expect(EUROPEAN_COUNTRIES.length).toBeGreaterThan(0);
  });

  it('každá země má id, name a flag', () => {
    EUROPEAN_COUNTRIES.forEach((country) => {
      expect(country.id).toBeDefined();
      expect(country.name).toBeDefined();
      expect(country.flag).toBeDefined();
    });
  });

  it('má Česko', () => {
    const cz = EUROPEAN_COUNTRIES.find((c) => c.id === 'CZ');
    expect(cz).toBeDefined();
    expect(cz.name).toBe('Česko');
  });
});

describe('CUSTOMIZATION_PRESETS', () => {
  it('má 3 presety', () => {
    expect(CUSTOMIZATION_PRESETS.minimal).toBeDefined();
    expect(CUSTOMIZATION_PRESETS.standard).toBeDefined();
    expect(CUSTOMIZATION_PRESETS.premium).toBeDefined();
  });

  it('každý preset má name a description', () => {
    Object.values(CUSTOMIZATION_PRESETS).forEach((preset) => {
      expect(preset.name).toBeDefined();
      expect(preset.description).toBeDefined();
    });
  });

  it('presety mají cardStyle', () => {
    expect(CUSTOMIZATION_PRESETS.minimal.cardStyle).toBe('flat');
    expect(CUSTOMIZATION_PRESETS.standard.cardStyle).toBe('elevated');
    expect(CUSTOMIZATION_PRESETS.premium.cardStyle).toBe('glass');
  });

  it('presety mají gradientOpacity v rozumném rozmezí', () => {
    Object.values(CUSTOMIZATION_PRESETS).forEach((preset) => {
      expect(preset.gradientOpacity).toBeGreaterThanOrEqual(0);
      expect(preset.gradientOpacity).toBeLessThanOrEqual(1);
    });
  });

  it('presety mají boolean showXxx flags', () => {
    Object.values(CUSTOMIZATION_PRESETS).forEach((preset) => {
      expect(typeof preset.showDiscount).toBe('boolean');
      expect(typeof preset.showOriginalPrice).toBe('boolean');
      expect(typeof preset.showTags).toBe('boolean');
      expect(typeof preset.showSong).toBe('boolean');
    });
  });
});
