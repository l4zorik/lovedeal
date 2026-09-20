import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../app/components/Input';

describe('Input', () => {
  it('snapshot - basic', () => {
    const tree = renderer.create(
      <Input placeholder="Email" value="" onChangeText={() => {}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - with label', () => {
    const tree = renderer.create(
      <Input label="Heslo" placeholder="••••" value="" onChangeText={() => {}} secureTextEntry />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - with icon', () => {
    const tree = renderer.create(
      <Input icon="search" placeholder="Hledej..." value="" onChangeText={() => {}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - with error', () => {
    const tree = renderer.create(
      <Input placeholder="Email" value="bad" onChangeText={() => {}} error="Neplatný email" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - disabled', () => {
    const tree = renderer.create(
      <Input placeholder="Zakázáno" value="" onChangeText={() => {}} disabled />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - multiline', () => {
    const tree = renderer.create(
      <Input placeholder="Popis..." value="" onChangeText={() => {}} multiline />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - with value', () => {
    const tree = renderer.create(
      <Input placeholder="Email" value="petr@example.com" onChangeText={() => {}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
