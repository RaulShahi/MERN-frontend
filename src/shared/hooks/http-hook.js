import { useEffect, useState } from "react";

export const useHttp = (fn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    try {
      setIsLoading(true);

      const sendRequest = async () => {
        const response = await fn();
        if (!response?.status) {
          throw new Error(response?.data?.message);
        }
        setData(response);
      };
      sendRequest();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, clearError, data };
};
