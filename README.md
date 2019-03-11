# react-state-patterns
Tiny utility package for easily creating React state patterns.

# Examples

## fromHook
```javascript
import { fromHook } from 'react-state-patterns';

// Create the state patterns from a custom React state hook.
const Counter = fromHook("counter", ({ initialValue = 0, ...props }) => {
  const [value, setCount] = useState(initialValue);

  return {
    value,
    increase: () => setCount(value + 1),
    decrease: () => setCount(value - 1)
  };
});
```

## Use the patterns

### Decorator Pattern
```javascript
const Displayer = ({ counter, ...props }) => {
  return (
    <React.Fragment>
      <div>{counter.value}</div>
      <button onClick={counter.decrease}>Decrement</button>
      <button onClick={counter.increase}>Increment</button>
    </React.Fragment>
  );
};

const StatefulDisplayer = Counter.withState(Displayer);
```

### Render Prop Pattern
```javascript
const Displayer = (props) => (
  <Counter.State initialValue={0}>
    {({ counter }) => (
      <React.Fragment>
        <div>{counter.value}</div>
        <button onClick={counter.decrease}>Decrement</button>
        <button onClick={counter.increase}>Increment</button>
      </React.Fragment>
    )}
  </Counter.State>
);
```

### Custom Hook Pattern
```javascript
const Displayer = (props) => {
  const { value, increase, decrease } = Counter.useHook({ initialValue: 0 });

  return (
    <React.Fragment>
      <div>{value}</div>
      <button onClick={decrease}>Decrement</button>
      <button onClick={increase}>Increment</button>
    </React.Fragment>
  );
};
```
