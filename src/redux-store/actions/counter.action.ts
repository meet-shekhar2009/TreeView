import { CounterAction, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../types';
export const incrementCounter = (): CounterAction => {
  return {
    type: INCREMENT_COUNTER,
    desc: 'Decrement the counter value',
  };
};
export const decrementCounter = (): CounterAction => {
  return {
    type: DECREMENT_COUNTER,
    desc: 'Decrement the counter value',
  };
};
