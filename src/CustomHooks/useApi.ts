import { useEffect, useState } from 'react';
import { BASE_URL } from '../Components/constant';
import apiService from '../Components/utils';

const useApi = <T>(
  method: string,
  database: string,
  endpoint?: string,
  transform?: (value: any) => any,
  data?: any
): [T[] | null, boolean, any, any] => {
  const [response, setResponse] = useState<T[] | null>(null);
  const [isProcessing, setProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await apiService(database).get(
        method,
        endpoint,
        data,
        transform
      );

      setResponse([...(response as T[])]);
      setProcessing(false);
    })();
  }, [reloadData]);

  return [response, isProcessing, setReloadData, error];
};

export default useApi;
