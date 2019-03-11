import React from "react";

/**
 * Creates a state decorator, hook, and render prop pattern from a given
 * custom state hook.
 * @param {String} nameSpace The string to namespace the state under.
 * @param {Function} stateHook The custom state hook to create patterns from.
 */
const fromHook = (nameSpace, stateHook) => {
  const RenderProp = ({ children, ...props }) => {
    return typeof children === "function"
      ? children({ [nameSpace]: stateHook(props) })
      : children;
  };

  const Decorator = Component => props => (
    <Component {...{ [nameSpace]: stateHook(props), ...props }} />
  );

  // TODO: Validate the return signature of stateHook?

  return {
    useHook: stateHook,
    withState: Decorator,
    State: RenderProp,
  };
};

export default {
  fromHook,
};
