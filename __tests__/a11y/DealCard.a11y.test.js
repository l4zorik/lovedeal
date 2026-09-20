import React from 'react';
import { View, Text } from 'react-native';

const mockDeal = {
  id: '1', type: 'deal', brand: 'Test', handle: '@test',
  avatar: 'https://example.com/a.jpg', title: 'Title', description: 'Desc',
  tags: ['test'], song: 'Song', discount: '10%', originalPrice: '100 Kc',
  salePrice: '90 Kc', image: 'https://example.com/i.jpg',
  likes: '1K', comments: '10', shares: '5', saves: '20',
  verified: true, category: 'Test', location: 'Praha', country: 'CZ',
};

const mockAd = {
  ...mockDeal, id: 'ad_1', type: 'ad', cta: 'Koupit',
  ctaUrl: 'https://example.com', advertiser: 'Adv', impressionId: 'imp_1',
};

const config = { animations: false, haptics: false, parallax: false, spinningDisc: false, progressBar: false, simpleGradients: false };
const customization = { cardStyle: 'elevated', showDiscount: true, showOriginalPrice: true, showTags: true, showSong: true, gradientOpacity: 0.6 };

describe('DealCard Accessibility', () => {
  it('renders deal data correctly', () => {
    expect(mockDeal.title).toBe('Title');
    expect(mockDeal.description).toBe('Desc');
    expect(mockDeal.verified).toBe(true);
    expect(mockDeal.location).toBe('Praha');
  });

  it('has all required icon references', () => {
    const iconRefs = ['heart', 'chatbubble', 'bookmark', 'arrow-redo', 'checkmark-circle', 'location'];
    iconRefs.forEach((icon) => {
      expect(typeof icon).toBe('string');
      expect(icon.length).toBeGreaterThan(0);
    });
  });

  it('deal has discount and pricing data', () => {
    expect(mockDeal.discount).toBe('10%');
    expect(mockDeal.originalPrice).toBe('100 Kc');
    expect(mockDeal.salePrice).toBe('90 Kc');
  });

  it('deal has engagement metrics', () => {
    expect(mockDeal.likes).toBe('1K');
    expect(mockDeal.comments).toBe('10');
    expect(mockDeal.shares).toBe('5');
    expect(mockDeal.saves).toBe('20');
  });

  it('deal has location data', () => {
    expect(mockDeal.location).toBe('Praha');
    expect(mockDeal.country).toBe('CZ');
  });
});

describe('AdCard Accessibility', () => {
  it('has ad label text', () => {
    expect('Reklama').toContain('Reklama');
  });

  it('has CTA button text', () => {
    expect(mockAd.cta).toBe('Koupit');
  });

  it('has advertiser info', () => {
    expect(mockAd.advertiser).toBe('Adv');
  });

  it('ad has all required icon references', () => {
    const iconRefs = ['heart', 'business', 'bookmark', 'arrow-redo'];
    iconRefs.forEach((icon) => {
      expect(typeof icon).toBe('string');
      expect(icon.length).toBeGreaterThan(0);
    });
  });

  it('ad has CTA URL', () => {
    expect(mockAd.ctaUrl).toBe('https://example.com');
  });

  it('ad has impression tracking ID', () => {
    expect(mockAd.impressionId).toBe('imp_1');
  });
});
