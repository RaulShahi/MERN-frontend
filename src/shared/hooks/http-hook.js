import { useState, useCallback } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const clearError = () => {
    setError(null);
  };

  const sendRequest = useCallback(async (fn, payload) => {
    setIsLoading(true);
    try {
      const response = await fn(payload ?? payload);
      if (!response?.status) {
        throw new Error(response?.data?.message);
      }
      setIsLoading(false);

      return response;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);

      throw err;
    }
  }, []);

  return { isLoading, error, clearError, sendRequest };
};
