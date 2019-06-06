import React, { useState } from 'react';
import { defaultHandlers } from './helpers';
import hookSchema from './hookSchema';

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
export const stateHook = (
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
  return hookSchema(state, stateHandlers, nameSpace);
};

export default stateHook;
