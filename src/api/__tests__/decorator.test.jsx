import React, { useState } from 'react';
import { decorator } from '../decorator';
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

describe('decorator', () => {
  const hook = (props) => {
    const [state, setState] = useState(props.initialState || {});
    return { state, setState };
  };

  it('calls `wrapStateHook` on the hook', () => {
    wrapStateHook.mockImplementation((hook) => hook);
    decorator(hook);
    expect(wrapStateHook).toHaveBeenCalledWith(hook);
  });

  it('creates a decorator component that passes down hook return value', () => {
    const initialState = { foo: 'bar' };
    const withState = decorator(hook);
    const Component = ({ state, setState }) => (
      <div id="component" state={state} onChange={setState} />
    );
    const StatefulComponent = withState(Component);
    const wrapper = mount(<StatefulComponent initialState={initialState} />);
    const wrappedCmpt = wrapper.find('#component');
    expect(wrappedCmpt.prop('state')).toEqual(initialState);
    expect(typeof wrappedCmpt.prop('onChange')).toBe('function');
  });
});
