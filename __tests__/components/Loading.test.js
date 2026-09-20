import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../app/components/Loading';

describe('Loading', () => {
  it('snapshot - default', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - small', () => {
    const tree = renderer.create(<Loading size="small" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
