import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Modal, { BottomSheet } from '../../app/components/Modal';

describe('Modal', () => {
  it('snapshot - visible with title', () => {
    const tree = renderer.create(
      <Modal visible={true} onClose={() => {}} title="Nastavení">
        <Text>Content</Text>
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - hidden', () => {
    const tree = renderer.create(
      <Modal visible={false} onClose={() => {}} title="Skrytý">
        <Text>Content</Text>
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - small size', () => {
    const tree = renderer.create(
      <Modal visible={true} onClose={() => {}} size="small" title="Malý">
        <Text>Content</Text>
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - large size', () => {
    const tree = renderer.create(
      <Modal visible={true} onClose={() => {}} size="large" title="Velký">
        <Text>Content</Text>
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - full size', () => {
    const tree = renderer.create(
      <Modal visible={true} onClose={() => {}} size="full">
        <Text>Full screen</Text>
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - no close button', () => {
    const tree = renderer.create(
      <Modal visible={true} onClose={() => {}} showClose={false} title="Bez zavření">
        <Text>Content</Text>
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - no title', () => {
    const tree = renderer.create(
      <Modal visible={true} onClose={() => {}}>
        <Text>Just content</Text>
      </Modal>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('BottomSheet', () => {
  it('snapshot - visible with title', () => {
    const tree = renderer.create(
      <BottomSheet visible={true} onClose={() => {}} title="Dolní panel">
        <Text>Sheet content</Text>
      </BottomSheet>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - hidden', () => {
    const tree = renderer.create(
      <BottomSheet visible={false} onClose={() => {}} title="Skrytý">
        <Text>Sheet content</Text>
      </BottomSheet>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - no title', () => {
    const tree = renderer.create(
      <BottomSheet visible={true} onClose={() => {}}>
        <Text>No title</Text>
      </BottomSheet>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
