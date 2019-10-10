# API

## Table of Contents
  - Main API
    + [`statePatterns()`](#statePatterns)
    + [`renderProp()`](#renderProp)
    + [`decorator()`](#decorator)
    + [`context()`](#context)
  - Utils
    + [`hookSchema()`](#hookSchema)
    + [`stateHook()`](#stateHook)


## Main API

### statePatterns
`statePatterns` - _Creates an implementation of the state decorator, hook, render prop, and context provider/consumer patterns._

```javascript
/**
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object literal.
 * @return {Object} An object containing the state decorator, hook, and
 *    render prop provider patterns.
 *     i.e. { useHook, withState, State, Provider, Consumer }
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

### context
+ `context` -  _Creates an implementation of the state Context Provider/Consumer pattern._
```javascript
/**
 * @param {Function} stateHook A custom React hook to manage state.
 *    Important: This hook will receive props and must return an object.
 * @return {Object} An Object containing both the React Context
 *    Provider and Consumer. i.e. { Consumer: ..., Provider: ... }
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
```
