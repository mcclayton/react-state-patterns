![Logo](https://github.com/mcclayton/react-state-patterns/blob/master/assets/logo.png)

# react-state-patterns
[![npm version](https://badge.fury.io/js/react-state-patterns.svg)](https://badge.fury.io/js/react-state-patterns)
[![License](https://img.shields.io/npm/l/react-state-patterns.svg)](https://github.com/mcclayton/react-state-patterns/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/mcclayton/react-state-patterns.svg?style=svg)](https://circleci.com/gh/mcclayton/react-state-patterns)

Tiny utility package for easily creating reusable implementations of React state provider patterns.

🚀  [react-state-patterns](https://www.npmjs.com/package/react-state-patterns) makes it easy to (and reduces boilerplate) create implementations of common React state provider patterns.

⚠️  Powered by React Hooks under the hood. (This library has a peer dependency on `react: >= 16.8.0`)

#### Why?
`react-state-patterns` is incredibly simple, small, and lightweight — making it a great choice for applications that wish to keep their footprint small and do not want a complex state management solution.
This library is also great for those that wish to utilize React Hooks for reusable state but do not want to couple their presentational components directly with state (this makes unit testing components *much* easier 🌟).

`react-state-patterns` also makes state management modular — increasing code clarity and making organization of state a breeze 🍃.

# Getting Started

## Install
```bash
npm install react-state-patterns --save
```

## Creating State Patterns

#### Directly From Hook
```jsx
import useProviders, { hookSchema } from '@procore/react-state-patterns';

// Create the state provider patterns
const Counter = useProviders(props => {
  const [count, setCount] = useState(props.initialValue || 0);
  const handlers = {
    incrementBy: value => setCount(count + value),
    decrementBy: value => setCount(count - value)
  };
  // hookSchema(...)
  //    => { counter: { state: { count: 0 }, handlers: { incrementBy: (v) => {...}, decrementBy: (v) => {...} } } }
  return hookSchema({ count: count }, handlers, "counter");
});

// Counter = { useHook, withState, State, Provider, Consumer }
```

#### Using `useStateHook` util
[useStateHook API Docs](https://github.com/mcclayton/react-state-patterns/blob/master/API.md#useStateHook)
```jsx
import useProviders, { useStateHook } from '@procore/react-state-patterns';

// Create the state patterns
const Counter = useProviders(
  useStateHook(
    (props) => ({ count: props.initialValue || 0 }),
    {
      incrementBy: state => value => ({ ...state, count: state.count + value }),
      decrementBy: state => value => ({ ...state, count: state.count - value })
    },
    "counter"
  )
);

// Counter = { useHook, withState, State, Provider, Consumer }
```

## Use the patterns

#### Decorator Pattern
```jsx
const Displayer = ({ counter: { state, handlers }}) => (
  <React.Fragment>
    <div>{state.count}</div>
    <button onClick={() => handlers.decrementBy(1)}>Decrement</button>
    <button onClick={() => handlers.incrementBy(1)}>Increment</button>
  </React.Fragment>
);

const StatefulDisplayer = Counter.withState(Displayer);

const rootElement = document.getElementById("root");
ReactDOM.render(<StatefulDisplayer initialValue={5} />, rootElement);
```

#### Render Prop Pattern
```jsx
const Displayer = (props) => (
  <Counter.State initialValue={5}>
    {({ counter: { state, handlers } }) => (
      <React.Fragment>
        <div>{state.count}</div>
        <button onClick={() => handlers.decrementBy(1)}>Decrement</button>
        <button onClick={() => handlers.incrementBy(1)}>Increment</button>
      </React.Fragment>
    )}
  </Counter.State>
);
```

#### Context Provider/Consumer Pattern
```jsx
const Displayer = (props) => (
  <Counter.Provider initialValue={5}>
    <Counter.Consumer>
      {({ counter: { state, handlers } }) => (
        <React.Fragment>
          <div>{state.count}</div>
          <button onClick={() => handlers.decrementBy(1)}>Decrement</button>
          <button onClick={() => handlers.incrementBy(1)}>Increment</button>
        </React.Fragment>
      )}
    </Counter.Consumer>
  </Counter.Provider>
);
```

#### Custom Hook Pattern
```jsx
const Displayer = (props) => {
  const { counter: { state, handlers } } = Counter.useHook({ initialValue: 5 });

  return (
    <React.Fragment>
      <div>{state.count}</div>
      <button onClick={() => handlers.decrementBy(1)}>Decrement</button>
      <button onClick={() => handlers.incrementBy(1)}>Increment</button>
    </React.Fragment>
  );
};
```

## Code Style Guides
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[Prettier](https://prettier.io/) is run as a pre-commit hook to automatically
modify staged `.js` and `.jsx` files to adhere to base code style rules defined in the `.prettierrc`.

[Eslint](https://eslint.org/) is also used as an in-editor linter, so be sure to install
an appropriate [Eslint Plugin](https://eslint.org/docs/3.0.0/user-guide/integrations#editors) for your editor of choice.
Prettier rules are setup to take precedence and override any conflicting eslint rules.
