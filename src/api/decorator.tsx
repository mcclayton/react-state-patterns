import * as React from 'react';
import { wrapStateHook } from '../helpers';
import { StateHook } from '../types/hooks';

export interface HOC {
  (Component: React.ComponentType): React.FunctionComponent
};

/**
 * Creates an implementation of the state decorator pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Function} The decorator HOC function that takes in a React Component
 *    and decorates it with the state.
 */
export const decorator = (stateHook: StateHook): HOC => {
  const wrappedHook = wrapStateHook(stateHook);
  return (Component: React.ComponentType): React.FunctionComponent => (props: any) => (
    <Component {...{ ...wrappedHook(props), ...props }} />
  );
};

export default decorator;
