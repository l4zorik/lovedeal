import React from 'react';
import renderer from 'react-test-renderer';
import DealCard from '../../app/components/DealCard';
import { COLORS } from '../../app/constants/theme';

const mockDeal = {
  id: '1',
  type: 'deal',
  brand: 'Test Brand',
  handle: '@testhandle',
  avatar: 'https://example.com/avatar.jpg',
  title: 'Test Deal Title',
  description: 'Test description',
  tags: ['test', 'deal'],
  song: 'Test Song',
  discount: '20%',
  originalPrice: '1000 Kč',
  salePrice: '800 Kč',
  image: 'https://example.com/image.jpg',
  likes: '1.2K',
  comments: '100',
  shares: '50',
  saves: '200',
  verified: true,
  category: 'Test',
  location: 'Praha',
  country: 'CZ',
};

const mockConfig = {
  animations: false,
  haptics: false,
  parallax: false,
  spinningDisc: false,
  progressBar: false,
  simpleGradients: false,
};

const defaultCustomization = {
  cardStyle: 'elevated',
  showDiscount: true,
  showOriginalPrice: true,
  showTags: true,
  showSong: true,
  gradientOpacity: 0.6,
};

describe('DealCard', () => {
  it('snapshot - defaultní stav', () => {
    const tree = renderer.create(
      <DealCard
        deal={mockDeal}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez tagů', () => {
    const dealWithoutTags = { ...mockDeal, tags: [] };
    const tree = renderer.create(
      <DealCard
        deal={dealWithoutTags}
        isLite={false}
        config={{ ...mockConfig }}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={{ ...defaultCustomization, showTags: false }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez slevy', () => {
    const tree = renderer.create(
      <DealCard
        deal={mockDeal}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={{ ...defaultCustomization, showDiscount: false }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - lite mode', () => {
    const tree = renderer.create(
      <DealCard
        deal={mockDeal}
        isLite={true}
        config={{ ...mockConfig, spinningDisc: false, progressBar: false }}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez písničky', () => {
    const tree = renderer.create(
      <DealCard
        deal={mockDeal}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={{ ...defaultCustomization, showSong: false }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez originální ceny', () => {
    const tree = renderer.create(
      <DealCard
        deal={mockDeal}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={{ ...defaultCustomization, showOriginalPrice: false }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez ověření', () => {
    const unverifiedDeal = { ...mockDeal, verified: false };
    const tree = renderer.create(
      <DealCard
        deal={unverifiedDeal}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez location', () => {
    const noLocationDeal = { ...mockDeal, location: null };
    const tree = renderer.create(
      <DealCard
        deal={noLocationDeal}
        isLite={false}
        config={mockConfig}
        scrollY={null}
        onDismiss={jest.fn()}
        onLike={jest.fn()}
        customization={defaultCustomization}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
