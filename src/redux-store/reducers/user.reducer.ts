import { User, UserAction, USER_UPDATE } from '../types';

const initialState: User = {
  Age: 0,
  Name: 'NA',
};

export const UserReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
