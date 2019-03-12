# API

## statePatterns
`statePatterns` - _Creates an implementation of the state decorator, hook, and render prop provider patterns_
```javascript
/**
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Object} An object containing the state decorator, hook, and
 *    render prop provider patterns.
 *     i.e. { useHook, withState, State }
 */
```

## stateHook
+ `stateHook` - _Creates an implementation of the state hook provider pattern._
```javascript
/**
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Function} A custom state hook function that returns the state and
 *    handlers in an object literal (Optionally wrapped in the namespace if
 *    provided)
 */
```

## renderProp
+ `renderProp` - _Creates an implementation of the state render prop provider pattern._
```javascript
/**
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Component} A component with the state injected into the render prop.
 */
```

## decorator
+ `decorator` -  _Creates an implementation of the state decorator provider pattern._
```javascript
/**
 * @param {Object} initialState The state to use initially
 * @param {Function} handlers A function that takes state as the argument and
 *    returns an object of handlers
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Function} The decorator HOC function that takes in a React Component
 *    and decorates it with the state.
 */
```
