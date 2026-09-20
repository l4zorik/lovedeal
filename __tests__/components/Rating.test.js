import React from 'react';
import renderer from 'react-test-renderer';
import Rating from '../../app/components/Rating';

describe('Rating', () => {
  it('snapshot - 5 stars', () => {
    const tree = renderer.create(<Rating value={5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - 3.5 stars', () => {
    const tree = renderer.create(<Rating value={3.5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - 0 stars', () => {
    const tree = renderer.create(<Rating value={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - custom max 10', () => {
    const tree = renderer.create(<Rating value={7} max={10} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - hide value', () => {
    const tree = renderer.create(<Rating value={4} showValue={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - large size', () => {
    const tree = renderer.create(<Rating value={4} size={24} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
