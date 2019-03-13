import { StatePatternError } from './errors';

export const wrapStateHook = (stateHook) => (props) => {
  const retVal = stateHook(props);
  if (!retVal || retVal.constructor !== Object) {
    throw new StatePatternError(
      `React hook must return an object literal \n Return was: ${retVal}`
    );
  }
  return retVal;
};
