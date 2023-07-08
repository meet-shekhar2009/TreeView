import { useEffect, useState } from 'react';
import { getLocalStorageValue, setLocalStorageValue } from './storageUtils';

type cbFunc<T> = (val: T) => T;

const useLocalStorage = <T>(
  key: string,
  initialValue: T | undefined | cbFunc<T> = undefined
) => {
  const [state, setState] = useState<T>(() => {
    let currentStorageValue = getLocalStorageValue(key);

    if (initialValue === 'function') {
      return (initialValue as cbFunc<T>)(currentStorageValue);
    }
    if (currentStorageValue) return currentStorageValue;
    if (initialValue !== undefined) return initialValue;
    return null;
  });

  useEffect(() => {
    setLocalStorageValue(key, state);
  }, [key, state]);

  return [state, setState] as [T, typeof setState];
};
export default useLocalStorage;
