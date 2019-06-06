import { hookSchema } from '../hookSchema';

describe('hookSchema', () => {
  const handlers = { myHandler: () => {} };
  const state = { foo: 'bar' };

  describe('with no namespace provided', () => {
    it('creates hook schema without namespace', () => {
      const actual = hookSchema(state, handlers);
      expect(actual).toEqual({
        handlers: handlers,
        state: state,
      });
    });
  });

  describe('with namespace provided', () => {
    it('creates hook schema with namespace', () => {
      const actual = hookSchema(state, handlers, 'myNamespace');
      expect(actual).toEqual({
        myNamespace: {
          handlers: handlers,
          state: state,
        },
      });
    });
  });

  describe('with null arguments passed', () => {
    it('creates hook schema correctly', () => {
      const actual = hookSchema(null, null, null);
      expect(actual).toEqual({ handlers: null, state: null });
    });
  });
});
