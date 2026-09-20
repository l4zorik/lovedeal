import React from 'react';
import renderer from 'react-test-renderer';
import { QuickAction, QuickActionsGrid, ActionButton } from '../../app/components/QuickActions';

describe('QuickAction', () => {
  it('snapshot - základní', () => {
    const tree = renderer.create(
      <QuickAction icon="heart" label="Like" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - s badge', () => {
    const tree = renderer.create(
      <QuickAction icon="heart" label="Like" onPress={jest.fn()} badge={5} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - s barvou', () => {
    const tree = renderer.create(
      <QuickAction icon="heart" label="Like" color="#FF0000" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('QuickActionsGrid', () => {
  it('snapshot', () => {
    const actions = [
      { icon: 'heart', label: 'Like', onPress: jest.fn() },
      { icon: 'bookmark', label: 'Save', onPress: jest.fn() },
      { icon: 'share', label: 'Share', onPress: jest.fn() },
    ];
    const tree = renderer.create(<QuickActionsGrid actions={actions} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ActionButton', () => {
  it('snapshot - default', () => {
    const tree = renderer.create(
      <ActionButton label="Click" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - primary', () => {
    const tree = renderer.create(
      <ActionButton label="Click" variant="primary" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - danger', () => {
    const tree = renderer.create(
      <ActionButton label="Delete" variant="danger" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - small', () => {
    const tree = renderer.create(
      <ActionButton label="Small" size="small" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - disabled', () => {
    const tree = renderer.create(
      <ActionButton label="Disabled" disabled onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - s ikonou', () => {
    const tree = renderer.create(
      <ActionButton icon="add" label="Add" onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
