import * as React from 'react';

/**
 * Creates a hook schema that can be returned from React hooks.
 * @param {Any} state The state which will be passed down to providers.
 * @param {Object} handlers The state handlers which will be passed down to providers.
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Object} An object containing with the handlers and state as keys.
 *    Optionally wrapped in the nameSpace. i.e. { nameSpace: { handlers: {}, state: {} } }
 */
export const hookSchema = (state: any, handlers: object = {}, nameSpace?: string): object => {
  const hookSchema = { handlers, state };
  return nameSpace ? { [nameSpace]: hookSchema } : hookSchema;
};

export default hookSchema;
