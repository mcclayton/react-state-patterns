import { StatePatternError } from './errors';

export const defaultHandlers = (state) => ({
  setState: (newState) => ({
    ...state,
    ...newState,
  }),
});

export const wrapStateHook = (stateHook) => (props) => {
  const hookType = typeof stateHook;
  if (hookType !== 'function') {
    throw new StatePatternError(
      `Attempting to wrap invalid hook. Hook must be a function but received: ${hookType}.`
    );
  }
  const retVal = stateHook(props);
  if (!retVal || retVal.constructor !== Object) {
    throw new StatePatternError(
      `React hook must return an object literal \n Return was: ${retVal}`
    );
  }
  return retVal;
};
