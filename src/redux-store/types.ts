export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const USER_UPDATE = 'USER_UPDATE';

export interface CounterAction {
  type: string;
  desc: string;
}

export interface User {
  Name: string;
  Age: number;
}

export interface UserAction extends CounterAction {
  payload: User;
}
export interface Counter {
  value: number;
}
export interface State {
  Counter: Counter;
  User: User;
}
