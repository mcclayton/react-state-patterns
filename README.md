# react-state-patterns
[![npm version](https://badge.fury.io/js/react-state-patterns.svg)](https://badge.fury.io/js/react-state-patterns)

Tiny utility package for easily creating reusable implementations of React state provider patterns.

🚀  [react-state-patterns](https://www.npmjs.com/package/react-state-patterns) makes it easy to (and reduces boilerplate) create implementations of common React state provider patterns.

⚠️  Powered by React Hooks under the hood. (This library has a peer dependency on `react: ^16.8.0`)

# Getting Started

## Install
```bash
npm install react-state-patterns --save
```

## Usage

### API
[View API Docs Here](https://github.com/mcclayton/react-state-patterns/blob/master/API.md)

### Creating State Patterns
```jsx
import { statePatterns } from 'react-state-patterns';

// Create the state patterns
const Counter = statePatterns(
  { count: 0 },
  state => ({
    decrementBy: (value) => ({
      count: state.count - value
    }),
    incrementBy: (value) => ({
      count: state.count + value
    }),
  }),
  "counter"
);
```

### Use the patterns

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
ReactDOM.render(<StatefulDisplayer initialState={{ count: 0 }} />, rootElement);
```

#### Render Prop Pattern
```jsx
const Displayer = (props) => (
  <Counter.State initialState={{ count: 0 }}>
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

#### Custom Hook Pattern
```jsx
const Displayer = (props) => {
  const { counter: { state, handlers } } = Counter.useHook({ initialState: { count: 0 } });

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
