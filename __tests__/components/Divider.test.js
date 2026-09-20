import React from 'react';
import renderer from 'react-test-renderer';
import Divider from '../../app/components/Divider';

describe('Divider', () => {
  it('snapshot - horizontal', () => {
    const tree = renderer.create(<Divider />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - vertical', () => {
    const tree = renderer.create(<Divider vertical />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
