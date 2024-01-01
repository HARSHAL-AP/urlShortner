import { useState, useEffect } from 'react';

interface UseFetchDataResult<Data = any> {
  data: Data | null;
  loading: boolean;
  error:boolean;
}

const useFetchData = <Data = any>(url: string): UseFetchDataResult<Data> => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: Data = await response.json();
        setData(result);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
