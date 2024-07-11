import React, { useEffect, useState } from 'react';
import useDataSource from './useDataSource';

export default function NoEffect() {
  const { data, loading } = useDataSource();
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(true);

  if (isLoading === true && loading === false) {
    setisLoading(false);
  }

  useEffect(() => {
    if (data?.length > 0) {
      setUsers(data);
    }
  }, [data]);
  console.log('testing');

  if (isLoading) {
    return <h3>loading ...</h3>;
  }
  if (users.length <= 0) {
    return <h5>no data found!!</h5>;
  }
  return (
    <div>
      <h3>
        isLoading: {isLoading.toString()}, loading: {loading.toString()}
      </h3>
      {users.map((k) => (
        <div key={k}>{k}</div>
      ))}
    </div>
  );
}
