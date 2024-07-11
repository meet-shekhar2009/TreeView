import { useEffect, useState } from 'react';
const INTERVAL = 2000;
export default function useDataSource() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function getRandomData() {
    setLoading(true);
    const dataSize = Math.round(Math.random() * 10);
    const userId = () => Math.round(Math.random() * 100000);
    const datascource = new Array(dataSize)
      .fill(null)
      .map(() => `user ${userId()}`);

    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dataSize % 2 == 0 ? datascource : []);
        setLoading(false);
      }, INTERVAL);
    });

    return dataPromise;
  }

  useEffect(() => {
    getRandomData().then((m) => {
      setData(m as string[]);
    });
    setInterval(() => {
      const datasource = getRandomData();
      datasource.then((m) => {
        setData(m as string[]);
      });
    }, INTERVAL + 2000);
  }, []);

  return { data, loading };
}
