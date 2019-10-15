import * as React from 'react';
import { StatePatternError } from './errors';
import { StateHook } from './types/hooks';

export const defaultHandlers = {
  setState: (state: object) => (newState: object) => ({
    ...state,
    ...newState,
  }),
};

export const wrapStateHook = (stateHook: StateHook) => (props: object) => {
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
