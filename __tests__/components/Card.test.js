import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Card, { CardHeader, CardContent, CardFooter } from '../../app/components/Card';

describe('Card', () => {
  it('snapshot - default', () => {
    const tree = renderer.create(
      <Card><Text>Content</Text></Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - elevated', () => {
    const tree = renderer.create(
      <Card variant="elevated"><Text>Content</Text></Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - outlined', () => {
    const tree = renderer.create(
      <Card variant="outlined"><Text>Content</Text></Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - filled', () => {
    const tree = renderer.create(
      <Card variant="filled"><Text>Content</Text></Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - compound card', () => {
    const tree = renderer.create(
      <Card>
        <CardHeader><Text>Title</Text></CardHeader>
        <CardContent><Text>Body</Text></CardContent>
        <CardFooter><Text>Footer</Text></CardFooter>
      </Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
