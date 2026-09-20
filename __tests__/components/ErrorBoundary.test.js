import React from 'react';
import renderer from 'react-test-renderer';
import { ErrorBoundary } from '../../app/components/ErrorBoundary';

function ThrowError({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <></>;
}

describe('ErrorBoundary', () => {
  it('snapshot - normální render', () => {
    const tree = renderer.create(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('snapshot - chybový stav', () => {
    const tree = renderer.create(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('zachytává chyby z dětí', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const tree = renderer.create(
      <ErrorBoundary onError={jest.fn()}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(tree.toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
});
