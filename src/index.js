import React, { useState } from 'react';

/**
 * Helpers
 */
const _defaultHandlers = (state) => ({
  setState: (newState) => ({
    ...state,
    ...newState,
  }),
});

/**
 * Main API
 */

/**
 * Creates an implementation of the state hook pattern.
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 */
const createStateHook = (
  initialState = {},
  handlers = _defaultHandlers,
  nameSpace
) => (props) => {
  const hookInitialState = props && props.initialState;
  const [state, setState] = useState(hookInitialState || initialState);

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

  const hookSchema = {
    handlers: {
      setState,
      ...stateHandlers,
    },
    state,
  };

  if (nameSpace) {
    return { [nameSpace]: hookSchema };
  } else {
    return hookSchema;
  }
};

/**
 * Creates an implementation of the state render prop pattern.
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 */
const createRenderProp = (
  initialState = {},
  handlers = _defaultHandlers,
  nameSpace
) => {
  const stateHook = createStateHook(initialState, handlers, nameSpace);
  const renderProp = ({ children, ...props }) => {
    return typeof children === 'function'
      ? children(stateHook(props))
      : children;
  };
  return renderProp;
};

/**
 * Creates an implementation of the state decorator pattern.
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 */
const createDecorator = (
  initialState = {},
  handlers = _defaultHandlers,
  nameSpace
) => {
  const stateHook = createStateHook(initialState, handlers, nameSpace);
  const Decorator = (Component) => (props) => (
    <Component {...{ ...stateHook(props), ...props }} />
  );
  return Decorator;
};

/**
 * Creates an implementation of the state decorator, hook, and render
 * prop pattern.
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 */
const createStatePatterns = (
  initialState = {},
  handlers = _defaultHandlers,
  nameSpace
) => {
  const stateHook = createStateHook(initialState, handlers, nameSpace);
  const renderProp = createRenderProp(initialState, handlers, nameSpace);
  const Decorator = createDecorator(initialState, handlers, nameSpace);

  return {
    useHook: stateHook,
    withState: Decorator,
    State: renderProp,
  };
};

/**
 * Export the API
 */
export const statePatterns = createStatePatterns;
export const stateHook = createStateHook;
export const renderProp = createRenderProp;
export const decorator = createDecorator;

export default {
  statePatterns,
  stateHook,
  renderProp,
  decorator,
};
