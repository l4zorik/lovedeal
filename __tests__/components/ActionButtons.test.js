import React from 'react';
import renderer from 'react-test-renderer';
import ActionButtons from '../../app/components/ActionButtons';

const mockDeal = {
  id: '1',
  likes: 1234,
  comments: 56,
  shares: 78,
  saves: 90,
};

describe('ActionButtons', () => {
  it('snapshot - defaultní stav', () => {
    const tree = renderer.create(
      <ActionButtons
        deal={mockDeal}
        isLiked={false}
        onLike={jest.fn()}
        isSaved={false}
        onSave={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - liked stav', () => {
    const tree = renderer.create(
      <ActionButtons
        deal={mockDeal}
        isLiked={true}
        onLike={jest.fn()}
        isSaved={false}
        onSave={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - saved stav', () => {
    const tree = renderer.create(
      <ActionButtons
        deal={mockDeal}
        isLiked={false}
        onLike={jest.fn()}
        isSaved={true}
        onSave={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - oba stavy', () => {
    const tree = renderer.create(
      <ActionButtons
        deal={mockDeal}
        isLiked={true}
        onLike={jest.fn()}
        isSaved={true}
        onSave={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
