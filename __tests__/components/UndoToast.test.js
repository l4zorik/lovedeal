import React from 'react';
import renderer from 'react-test-renderer';
import UndoToast from '../../app/components/UndoToast';

describe('UndoToast', () => {
  it('snapshot - neviditelný', () => {
    const tree = renderer.create(
      <UndoToast visible={false} dealName="Test Deal" onUndo={jest.fn()} onDismiss={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - viditelný', () => {
    const tree = renderer.create(
      <UndoToast visible={true} dealName="Test Deal" onUndo={jest.fn()} onDismiss={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - bez dealName', () => {
    const tree = renderer.create(
      <UndoToast visible={true} dealName={null} onUndo={jest.fn()} onDismiss={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
