import * as React from 'react';
import { wrapStateHook } from '../helpers';
import { StateHook } from '../types/hooks';

interface PropConfig {
  children: React.ReactNode
};

interface RenderPropConfig {
  children: (props: object) => React.ReactNode
};

/**
 * Creates an implementation of the state render prop pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Component} A component with the state injected into the render prop.
 */
export const renderProp = (stateHook: StateHook): React.ReactNode => {
  const wrappedHook = wrapStateHook(stateHook);
  return ({ children, ...props }: PropConfig | RenderPropConfig): any => {
    return typeof children === 'function'
      ? children(wrappedHook(props))
      : children;
  };
};

export default renderProp;
