import React from 'react';
import renderer from 'react-test-renderer';
import Chip from '../../app/components/Chip';

describe('Chip', () => {
  it('snapshot - default', () => {
    const tree = renderer.create(<Chip label="Móda" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - selected', () => {
    const tree = renderer.create(<Chip label="Aktivní" selected onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - outline', () => {
    const tree = renderer.create(<Chip label="Border" variant="outline" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - filled', () => {
    const tree = renderer.create(<Chip label="Filled" variant="filled" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot - with icon', () => {
    const tree = renderer.create(<Chip label="Star" icon="star" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
