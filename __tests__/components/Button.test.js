import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../app/components/Button';

describe('Button', () => {
  it('snapshot - primary', () => {
    const tree = renderer.create(<Button title="Uložit" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - secondary', () => {
    const tree = renderer.create(<Button title="Zrušit" variant="secondary" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - outline', () => {
    const tree = renderer.create(<Button title="Více" variant="outline" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - ghost', () => {
    const tree = renderer.create(<Button title="Tichý" variant="ghost" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - danger', () => {
    const tree = renderer.create(<Button title="Smazat" variant="danger" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - small size', () => {
    const tree = renderer.create(<Button title="Malé" size="small" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - large size', () => {
    const tree = renderer.create(<Button title="Velké" size="large" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - disabled', () => {
    const tree = renderer.create(<Button title="Zakázáno" disabled onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - with icon', () => {
    const tree = renderer.create(<Button title="S ikonou" icon="+" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
