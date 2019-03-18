import React, { useState } from 'react';
import { renderProp } from '../index';
import { mount } from 'enzyme';
// Mock out wrapStateHook
jest.mock('../helpers', () => ({
  wrapStateHook: jest.fn(),
}));
import { wrapStateHook } from '../helpers';

beforeEach(() => {
  // Require non-mocked wrapStateHook by default
  wrapStateHook.mockImplementationOnce(
    require.requireActual('../helpers').wrapStateHook
  );
});

describe('renderProp', () => {
  const hook = (props) => {
    const [state, setState] = useState(props.initialState || {});
    return { state, setState };
  };

  it('calls `wrapStateHook` on the hook', () => {
    wrapStateHook.mockImplementation((hook) => hook);
    renderProp(hook);
    expect(wrapStateHook).toHaveBeenCalledWith(hook);
  });

  it('creates Provider/Consumer that pass down hook return value', (done) => {
    const initialState = { foo: 'bar' };
    const Component = renderProp(hook);
    mount(
      <Component initialState={initialState}>
        {({ state, setState }) => {
          expect(state).toEqual(initialState);
          expect(typeof setState).toBe('function');
          done();
          return <div />;
        }}
      </Component>
    );
  });
});
