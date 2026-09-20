import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from '../../app/components/Avatar';

describe('Avatar', () => {
  it('snapshot - with image', () => {
    const tree = renderer.create(
      <Avatar uri="https://example.com/photo.jpg" name="Petr Novák" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - initials fallback', () => {
    const tree = renderer.create(<Avatar name="Jan Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - single word name', () => {
    const tree = renderer.create(<Avatar name="Petr" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - no name', () => {
    const tree = renderer.create(<Avatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - with online dot', () => {
    const tree = renderer.create(
      <Avatar name="Eva" online />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - custom size', () => {
    const tree = renderer.create(
      <Avatar name="Tom" size={80} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
