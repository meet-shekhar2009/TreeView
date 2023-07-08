import { json } from 'node:stream/consumers';

export const setLocalStorageValue = <T>(key: string, value: T) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, (value as unknown as string).toString());
  }
};

export const getLocalStorageValue = (key: string) => {
  let value = localStorage.getItem(key);
  if (value === null || value === undefined) return null;
  try {
    return JSON.parse(value);
  } catch (error) {}
  return value;
};
export const IS_AUTH = 'isAuthenticated';

export const setIsAuthenticated = (value: any) =>
  setLocalStorageValue(IS_AUTH, value);

export const getIsAuthenticated = () => {
  let value = getLocalStorageValue(IS_AUTH);

  return value;
};

export interface UserType {
  name: string;
  picture: string;
}
