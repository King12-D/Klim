import { useEffect, useState } from "react";

//Create a useFetch hook for fetching data
const useFetch = <T>(fetchFunc: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  //Create a fetchData variable
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      //Await the result from fetchFunction
      const result = await fetchFunc();

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occured"));
    } finally {
      setLoading(false);
    }
  };

  //Create a reset function to reset everything after rendering
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  //Idk why i'm using useEffect hook here, but i'll come back to it
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  //Return all the data
  return { data, loading, error, reFetch: fetchData, reset };
};

export default useFetch;
