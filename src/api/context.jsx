import React from 'react';
import { wrapStateHook } from './helpers';

/**
 * Creates an implementation of the state Context Provider/Consumer pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Object} An Object containing both the React Context
 *    Provider and Consumer. i.e. { Consumer: ..., Provider: ... }
 */
export const context = (stateHook) => {
  const wrappedHook = wrapStateHook(stateHook);
  const Context = React.createContext({});
  const Provider = ({ children, ...props }) => (
    <Context.Provider value={wrappedHook(props)}>{children}</Context.Provider>
  );

  return {
    Provider,
    Consumer: Context.Consumer,
  };
};

export default context;
