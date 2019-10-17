import React, { useState } from 'react';
import { useProviders } from '../stateProviders';
// Mock out wrapStateHook
jest.mock('../../helpers', () => ({
  wrapStateHook: jest.fn(),
}));
import { wrapStateHook } from '../../helpers';

beforeEach(() => {
  // Require non-mocked wrapStateHook by default
  wrapStateHook.mockImplementationOnce(
    require.requireActual('../../helpers').wrapStateHook
  );
});

describe('useProviders', () => {
  const hook = (props) => {
    const [state, setState] = useState(props.initialState || {});
    return { state, setState };
  };

  it('calls `wrapStateHook` on the hook', () => {
    wrapStateHook.mockImplementation((hook) => hook);
    useProviders(hook);
    expect(wrapStateHook).toHaveBeenCalledWith(hook);
  });

  it('creates hook, renderProp, decorator, and Provider/Consumer patterns', () => {
    const patterns = useProviders(hook);
    expect(patterns.useHook).toBeInstanceOf(Function);
    expect(patterns.State).toBeInstanceOf(Function);
    expect(patterns.withState).toBeInstanceOf(Function);
    expect(patterns.Provider).toBeInstanceOf(Function);
    expect(patterns.Consumer).toBeInstanceOf(Object);
  });
});
