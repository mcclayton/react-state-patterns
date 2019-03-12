# react-state-patterns
Tiny utility package for easily creating React state patterns.

Powered by React Hooks under the hood.

# Examples

## Creating State Patterns
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

## Use the patterns

### Decorator Pattern
```jsx
const Displayer = ({ counter: { state, handlers }}) => {
  return (
    <React.Fragment>
      <div>{state.count}</div>
      <button onClick={() => handlers.decrementBy(1)}>Decrement</button>
      <button onClick={() => handlers.incrementBy(1)}>Increment</button>
    </React.Fragment>
  );
};

const StatefulDisplayer = Counter.withState(Displayer);

const rootElement = document.getElementById("root");
ReactDOM.render(<StatefulDisplayer initialState={{ count: 0 }} />, rootElement);
```

### Render Prop Pattern
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

### Custom Hook Pattern
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
