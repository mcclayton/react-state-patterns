# API

## Table of Contents
  - Main API
    + [`statePatterns()`](#statePatterns)
    + [`renderProp()`](#renderProp)
    + [`decorator()`](#decorator)
  - Utils
    + [`hookSchema()`](#hookSchema)
    + [`stateHook()`](#stateHook)


## Main API

### statePatterns
`statePatterns` - _Creates an implementation of the state decorator, hook, and render prop provider patterns_
```javascript
/**
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object literal.
 * @return {Object} An object containing the state decorator, hook, and
 *    render prop provider patterns.
 *     i.e. { useHook, withState, State }
 */
```

### renderProp
+ `renderProp` - _Creates an implementation of the state render prop provider pattern._
```javascript
/**
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object literal.
 * @return {Component} A component with the state injected into the render prop.
 */
```

### decorator
+ `decorator` -  _Creates an implementation of the state decorator provider pattern._
```javascript
/**
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object literal.
 * @return {Function} The decorator HOC function that takes in a React Component
 *    and decorates it with the state.
 */
```


## Utils

### hookSchema
+ `hookSchema` - _Creates a hook schema that can be returned from React hooks._
```javascript
/**
 * @param {Any} state The state which will be passed down to providers.
 * @param {Object} handlers The state handlers which will be passed down to providers.
 * @param {?String} nameSpace An optional string to namespace the
 *    state and handlers under.
 * @return {Object} An object containing with the handlers and state as keys.
 *    Optionally wrapped in the nameSpace. i.e. { nameSpace: { handlers: {}, state: {} } }
 */
```

### stateHook
+ `stateHook` - _Creates a custom React state hook that accepts props and returns an object of the form:_
`{ nameSpace: { handlers: {}, state: {} } } }`
```javascript
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
```
