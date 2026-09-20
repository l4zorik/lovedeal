import React from 'react';
import renderer from 'react-test-renderer';
import AdCard from '../../app/components/AdCard';

const mockAd = {
  id: 'ad_1',
  type: 'ad',
  brand: 'Test Advertiser',
  handle: '@testadvertiser',
  avatar: 'https://example.com/avatar.jpg',
  title: 'Test Ad Title',
  description: 'Test ad description',
  tags: ['test', 'ad'],
  song: 'Ad Song',
  discount: '30%',
  originalPrice: '500 Kč',
  salePrice: '350 Kč',
  image: 'https://example.com/ad-image.jpg',
  likes: '500',
  comments: '50',
  shares: '100',
  saves: '200',
  verified: true,
  category: 'Test',
  location: 'Online',
  country: 'CZ',
  cta: 'Koupit',
  ctaUrl: 'https://example.com',
  advertiser: 'Test Advertiser',
  impressionId: 'imp_001',
};

const mockConfig = {
  animations: false,
  haptics: false,
  parallax: false,
  spinningDisc: false,
  progressBar: false,
};

const defaultCustomization = {
  gradientOpacity: 0.6,
};

describe('AdCard', () => {
  it('snapshot - defaultní stav', () => {
    const tree = renderer.create(
      <AdCard
        deal={mockAd}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - s CTA', () => {
    const tree = renderer.create(
      <AdCard
        deal={mockAd}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez CTA URL', () => {
    const adWithoutCTA = { ...mockAd, ctaUrl: null, cta: null };
    const tree = renderer.create(
      <AdCard
        deal={adWithoutCTA}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - lite mode', () => {
    const tree = renderer.create(
      <AdCard
        deal={mockAd}
        isLite={true}
        config={{ ...mockConfig, spinningDisc: false, progressBar: false }}
        scrollY={null}
        onDismiss={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez tagů', () => {
    const adWithoutTags = { ...mockAd, tags: [] };
    const tree = renderer.create(
      <AdCard
        deal={adWithoutTags}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
