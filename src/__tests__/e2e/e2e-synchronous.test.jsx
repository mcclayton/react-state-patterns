import React, { useState } from 'react';
import statePatterns, { stateHook, hookSchema } from '../../api';
import { mount } from 'enzyme';

const Displayer = ({ counter: { state, handlers } }) => (
  <React.Fragment>
    <div id="count">{state.count}</div>
    <button id="increment" onClick={() => handlers.incrementBy(1)} />
    <button id="decrement" onClick={() => handlers.decrementBy(1)} />
  </React.Fragment>
);

function assertCounterScenario(Decorator) {
  const StatefulDisplayer = Decorator.withState(Displayer);
  const initialCount = 5;
  const wrapper = mount(<StatefulDisplayer initialValue={initialCount} />);

  const _getCount = (wrapper) => Number.parseInt(wrapper.find('#count').text());

  const incrementButton = wrapper.find('#increment');
  const decrementButton = wrapper.find('#decrement');

  // Count initial state is set from props
  expect(_getCount(wrapper)).toBe(initialCount);

  // Increment handler works
  incrementButton.simulate('click');
  incrementButton.simulate('click');
  expect(_getCount(wrapper)).toBe(initialCount + 2);

  // Decrement handler works
  decrementButton.simulate('click');
  expect(_getCount(wrapper)).toBe(initialCount + 1);
}

describe('React State Patterns Library', () => {
  describe('counter end-to-end scenaioro', () => {
    describe('using stateHook', () => {
      describe('with string namespace', () => {
        it('succeeds end-to-end interactions', () => {
          const Counter = statePatterns(
            stateHook(
              (props) => ({ count: props.initialValue || 0 }),
              {
                incrementBy: (state) => (value) => ({
                  count: state.count + value,
                }),
                decrementBy: (state) => (value) => ({
                  count: state.count - value,
                }),
              },
              'counter'
            )
          );

          assertCounterScenario(Counter);
        });
      });

      describe('with functional namespace transform', () => {
        it('succeeds end-to-end interactions', () => {
          const Counter = statePatterns(
            stateHook(
              (props) => ({ count: props.initialValue || 0 }),
              {
                incrementBy: (state) => (value) => ({
                  count: state.count + value,
                }),
                decrementBy: (state) => (value) => ({
                  count: state.count - value,
                }),
              },
              ({ state, handlers }) => ({
                counter: {
                  state,
                  handlers,
                },
              })
            )
          );

          assertCounterScenario(Counter);
        });
      });
    });

    describe('directly from hook', () => {
      it('succeeds end-to-end interactions', () => {
        const Counter = statePatterns((props) => {
          const [count, setCount] = useState(props.initialValue || 0);
          const handlers = {
            incrementBy: (value) => setCount(count + value),
            decrementBy: (value) => setCount(count - value),
          };
          return hookSchema({ count: count }, handlers, 'counter');
        });

        assertCounterScenario(Counter);
      });
    });
  });
});
