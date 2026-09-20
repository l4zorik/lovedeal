import React from 'react';
import renderer from 'react-test-renderer';
import Badge from '../../app/components/Badge';

describe('Badge', () => {
  it('snapshot - primary', () => {
    const tree = renderer.create(<Badge>Hot</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - success', () => {
    const tree = renderer.create(<Badge variant="success">Active</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - warning', () => {
    const tree = renderer.create(<Badge variant="warning">Limited</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - error', () => {
    const tree = renderer.create(<Badge variant="error">Sold Out</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - outline', () => {
    const tree = renderer.create(<Badge variant="outline">New</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - small size', () => {
    const tree = renderer.create(<Badge size="small">XS</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - large size', () => {
    const tree = renderer.create(<Badge size="large">XL</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - with dot', () => {
    const tree = renderer.create(<Badge dot>Online</Badge>).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
