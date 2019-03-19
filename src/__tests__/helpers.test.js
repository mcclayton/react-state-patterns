import { wrapStateHook } from '../helpers';
import { StatePatternError } from '../errors';

describe('wrapStateHook', () => {
  describe('when wrapping hook with no return', () => {
    it('throws a StatePatternError', () => {
      const stateHook = () => {};
      expect(wrapStateHook(stateHook)).toThrowError(StatePatternError);
    });
  });

  describe('when wrapping hook non-object literal return', () => {
    it('throws a StatePatternError', () => {
      const stateHook = () => new Array();
      expect(wrapStateHook(stateHook)).toThrowError(StatePatternError);
    });
  });

  describe('when wrapping hook with object literal return', () => {
    it('does not throw a StatePatternError', () => {
      const stateHook = () => ({ state: '', setState: () => {} });
      expect(wrapStateHook(stateHook)).not.toThrowError(StatePatternError);
    });
  });
});
