import { BASE_URL } from '../Components/constant';

export type ApiMethod = <T>(
  method: string,
  endpoint?: string,
  data?: any,
  transform?: (value: any) => any
) => Promise<T | null>;

export const transform = (data: any) => {
  const datasource = Object.entries(data).map(([id, value]: [string, any]) => ({
    ...value,
    id,
  }));
  return datasource.sort((a, b) => {
    if (a.modifiedOn > b.modifiedOn) return 1;
    if (b.modifiedOn > a.modifiedOn) return -1;

    return 0;
  });
};

export default (database: string, databasetype: string = 'mongo') => {
  const get: ApiMethod = async (method, endpoint, data, transform) => {
    try {
      const init: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          dbname: database,
          dbtype: databasetype,
        },
      };

      if (data) {
        init.body = JSON.stringify(data);
      }

      const fetchPromise = await fetch(`${BASE_URL}${endpoint || ''}`, init);
      if (fetchPromise.status !== 200) {
        return null;
      }
      const response = await fetchPromise.json();
      return transform ? transform(response) : response;
    } catch (error) {
      throw error;
    }
  };

  const execute: ApiMethod = async (method, endpoint, data, transform) => {
    return await get(method, endpoint, data, transform);
  };

  return {
    get,
    create: execute,
    remove: execute,
    patch: execute,
    findOne: execute,
    execute,
  };
};
