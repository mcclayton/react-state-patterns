import React, { useState } from 'react';
import { context } from '../index';
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

describe('context', () => {
  const hook = (props) => {
    const [state, setState] = useState(props.initialState || {});
    return { state, setState };
  };

  it('calls `wrapStateHook` on the hook', () => {
    wrapStateHook.mockImplementation((hook) => hook);
    context(hook);
    expect(wrapStateHook).toHaveBeenCalledWith(hook);
  });

  it('creates Provider/Consumer that pass down hook return value', (done) => {
    const initialState = { foo: 'bar' };
    const { Provider, Consumer } = context(hook);
    mount(
      <Provider initialState={initialState}>
        <div>
          <Consumer>
            {({ state, setState }) => {
              expect(state).toEqual(initialState);
              expect(typeof setState).toBe('function');
              done();
              return <div />;
            }}
          </Consumer>
        </div>
      </Provider>
    );
  });
});
