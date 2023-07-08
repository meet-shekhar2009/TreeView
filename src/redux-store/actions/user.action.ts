import { User, USER_UPDATE, UserAction } from '../types';
export const saveUser = (user: User): UserAction => {
  return {
    type: USER_UPDATE,
    desc: 'Add/Updates the user',
    payload: user,
  };
};
