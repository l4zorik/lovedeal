import React from 'react';
import renderer from 'react-test-renderer';
import Switch from '../../app/components/Switch';

describe('Switch', () => {
  it('snapshot - off', () => {
    const tree = renderer.create(<Switch value={false} onValueChange={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - on', () => {
    const tree = renderer.create(<Switch value={true} onValueChange={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - disabled', () => {
    const tree = renderer.create(<Switch value={false} onValueChange={() => {}} disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
