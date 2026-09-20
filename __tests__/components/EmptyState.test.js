import React from 'react';
import renderer from 'react-test-renderer';
import EmptyState from '../../app/components/EmptyState';

describe('EmptyState', () => {
  it('snapshot - title only', () => {
    const tree = renderer.create(<EmptyState title="Žádné výsledky" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - with message', () => {
    const tree = renderer.create(<EmptyState title="Prázdný košík" message="Přidejte něco" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - with icon', () => {
    const tree = renderer.create(<EmptyState icon="cart-outline" title="Košík" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
