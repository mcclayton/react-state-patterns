import React from 'react';
import { wrapStateHook } from '../helpers';
import createRenderProp from './renderProp';
import createDecorator from './decorator';
import createContext from './context';

/**
 * Creates an implementation of the state decorator, hook, render
 * prop, and context provider/consumer pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Object} An object containing the state decorator, hook, and
 *    render prop provider patterns.
 *     i.e. { useHook, withState, State, Provider, Consumer }
 */
export const statePatterns = (stateHook) => {
  const wrappedStateHook = wrapStateHook(stateHook);
  const renderProp = createRenderProp(stateHook);
  const Decorator = createDecorator(stateHook);
  const Context = createContext(stateHook);

  return {
    useHook: wrappedStateHook,
    withState: Decorator,
    State: renderProp,
    Provider: Context.Provider,
    Consumer: Context.Consumer,
  };
};

export default statePatterns;
