import React from 'react';
import renderer from 'react-test-renderer';
import { NotificationBadge, NotificationDot, TabBadge } from '../../app/components/NotificationBadge';

describe('NotificationBadge', () => {
  it('snapshot - malý badge', () => {
    const tree = renderer.create(<NotificationBadge count={5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - velký badge', () => {
    const tree = renderer.create(<NotificationBadge count={150} size="large" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - 99+ badge', () => {
    const tree = renderer.create(<NotificationBadge count={999} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - nulový count = null', () => {
    const tree = renderer.create(<NotificationBadge count={0} />).toJSON();
    expect(tree).toBeNull();
  });

  it('snapshot - null count = null', () => {
    const tree = renderer.create(<NotificationBadge count={null} />).toJSON();
    expect(tree).toBeNull();
  });
});

describe('NotificationDot', () => {
  it('snapshot', () => {
    const tree = renderer.create(<NotificationDot />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('TabBadge', () => {
  it('snapshot - focused', () => {
    const tree = renderer.create(
      <TabBadge icon="home" label="Domů" badgeCount={3} focused={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - unfocused', () => {
    const tree = renderer.create(
      <TabBadge icon="home" label="Domů" badgeCount={3} focused={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez badge', () => {
    const tree = renderer.create(
      <TabBadge icon="home" label="Domů" badgeCount={0} focused={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
