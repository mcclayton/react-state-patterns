import React, { useState } from 'react';
import { wrapStateHook, defaultHandlers } from './helpers';

/**
 * Main API
 */

/**
 * Creates an implementation of the state render prop pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Component} A component with the state injected into the render prop.
 */
const createRenderProp = (stateHook) => {
  const wrappedHook = wrapStateHook(stateHook);
  return ({ children, ...props }) => {
    return typeof children === 'function'
      ? children(wrappedHook(props))
      : children;
  };
};

/**
 * Creates an implementation of the state decorator pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Function} The decorator HOC function that takes in a React Component
 *    and decorates it with the state.
 */
const createDecorator = (stateHook) => (Component) => (props) => (
  <Component {...{ ...stateHook(props), ...props }} />
);

/**
 * Creates an implementation of the state Context Provider/Consumer pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Object} An Object containing both the React Context
 *    Provider and Consumer. i.e. { Consumer: ..., Provider: ... }
 */
const createContext = (stateHook) => {
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

/**
 * Creates an implementation of the state decorator, hook, render
 * prop, and context provider/consumer pattern.
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Object} An object containing the state decorator, hook, and
 *    render prop provider patterns.
 *     i.e. { useHook, withState, State, Provider, Consumer }
 */
const createStatePatterns = (stateHook) => {
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

/**
 * Creates a hook schema that can be returned from React hooks.
 * @param {Any} state The state which will be passed down to providers.
 * @param {Object} handlers The state handlers which will be passed down to providers.
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Object} An object containing with the handlers and state as keys.
 *    Optionally wrapped in the nameSpace. i.e. { nameSpace: { handlers: {}, state: {} } }
 */
const getHookSchema = (state, handlers = {}, nameSpace) => {
  const hookSchema = { handlers, state };
  return nameSpace ? { [nameSpace]: hookSchema } : hookSchema;
};

/**
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers i.e. (state) => ({ myHandler: () => ({ ...state }) })
 *    Each handler's return value will be used as the new state when invoked.
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Function} A custom React state hook that accepts props and returns an object
 *    of the form { nameSpace: { handlers: {}, state: {} } } }
 *     i.e. { useHook, withState, State }
 */
const createStateHook = (
  initialState = {},
  handlers = defaultHandlers,
  nameSpace
) => (props) => {
  const [state, setState] = useState(initialState);

  const handlersWithState = handlers(state);
  const stateHandlers = Object.keys(handlersWithState).reduce(
    (acc, handlerKey) => {
      acc[handlerKey] = (...args) =>
        setState({
          ...state,
          ...handlersWithState[handlerKey](...args),
        });
      return acc;
    },
    {}
  );
  return getHookSchema(state, stateHandlers, nameSpace);
};

/**
 * Export the API
 */
export const statePatterns = createStatePatterns;
export const renderProp = createRenderProp;
export const decorator = createDecorator;
export const context = createContext;
export const stateHook = createStateHook;

export const hookSchema = getHookSchema;

export default {
  statePatterns,
  renderProp,
  decorator,
  stateHook,
  context,
  hookSchema,
};
