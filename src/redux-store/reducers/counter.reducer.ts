import { CounterAction, DECREMENT_COUNTER, INCREMENT_COUNTER } from '../types';

const initialState = {
  value: 0,
};

export const counterReducer = (state = initialState, action: CounterAction) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, value: state.value + 1 };

    case DECREMENT_COUNTER:
      return { ...state, value: state.value <= 0 ? 0 : state.value - 1 };

    default:
      return state;
  }
};
