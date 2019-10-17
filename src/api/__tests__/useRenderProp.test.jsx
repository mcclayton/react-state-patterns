import React, { useState } from 'react';
import { useRenderProp } from '../renderProp';
import { mount } from 'enzyme';
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

describe('useRenderProp', () => {
  const hook = (props) => {
    const [state, setState] = useState(props.initialState || {});
    return { state, setState };
  };

  it('calls `wrapStateHook` on the hook', () => {
    wrapStateHook.mockImplementation((hook) => hook);
    useRenderProp(hook);
    expect(wrapStateHook).toHaveBeenCalledWith(hook);
  });

  it('creates component with render prop that passes down hook return value', (done) => {
    const initialState = { foo: 'bar' };
    const Component = useRenderProp(hook);
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
