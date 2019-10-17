import * as React from 'react';
import { defaultHandlers } from '../helpers';
import hookSchema from './hookSchema';
import { StatePatternError } from '../errors';
import { StateHook } from '../types/hooks';

interface InitialStateFunc {
  (props: object): object
};

type InitialState = object | InitialStateFunc;

interface TransformConfig {
  state: object,
  handlers: object,
};

interface TransformFunc {
  ({ state, handlers }: TransformConfig): object
};

interface AccumulatorDict {
  [key: string]: (...args: any[]) => any
};

interface StateHandlersDict {
  [key: string]: (state: any) => (...args: any[]) => any;
};


const _getInitialState = (initialState: InitialState, props: object): object => {
  if (typeof initialState === 'function') {
    return initialState(props);
  }
  return initialState;
};

/**
 * @param {Object|Function} initialState The state to use initially.
 *    This argument is either an object, representing the initial state, or a
 *    function that takes in props and returns the initial state which can be derived
 *    from the passed in props.
 * @param {Object} handlers An object whose keys are function state handlers.
 *    Every state handler receives state and payload arguments and must return either a new state to be shallowly merged or undefined.
 *    Returning undefined will not mutate the state.
 *    Handlers are of the form (state) => (...args) => ({ ...stateToMerge })
 * @param {?String|?Function} transform An optional string or function to transform the
 *    shape of the state and handlers. When a string, the state/handlers are namespaced
 *    under it. When a function, transform takes in an object argument containing state/handlers
 *    and whatever is returned by the function will be the resulting shape.
 *     i.e. ({ state, handlers }) => ({ nested: { namespace: { state, handlers } } })
 * @return {Function} A custom React state hook that accepts props and returns an object
 *    of the form { handlers: {}, state: {} } unless transformed by a transform string/function.
 */
export const useStateHook = (
  initialState: InitialState = {},
  handlers: StateHandlersDict = defaultHandlers,
  transform?: string | TransformFunc,
): StateHook => (props: object) => {
  const initState = _getInitialState(initialState, props);
  const [state, setState] = React.useState(initState);
  const stateRef = React.useRef(initState);
  React.useEffect(() => {
    stateRef.current = state;
  });

  const stateHandlers = Object.keys(handlers).reduce((acc: AccumulatorDict, handlerKey: string) => {
    acc[handlerKey] = (...args: any[]) => {
      const returnedState = handlers[handlerKey](stateRef.current)(...args);
      if (returnedState) {
        setState({
          ...stateRef.current,
          ...returnedState,
        });
      }
    };
    return acc;
  }, {});
  if (!transform || typeof transform === 'string') {
    // Treat transform as a string namespace
    return hookSchema(state, stateHandlers, transform);
  } else if (typeof transform === 'function') {
    // Transform as a function
    return transform({ state, handlers: stateHandlers });
  } else {
    throw new StatePatternError(
      `stateHook's transform argument expects either a string or function, but found: ${typeof transform}`
    );
  }
};

export default useStateHook;
