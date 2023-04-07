import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { token } = useContext(AuthContext);

  const clearError = () => {
    setError(null);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const sendRequest = useCallback(async ({ fn, payload, params }) => {
    setIsLoading(true);
    try {
      const response = await fn({ payload, params, config });
      if (!response?.status) {
        throw new Error(response?.data?.message);
      }
      setIsLoading(false);

      return response;
    } catch (err) {
      setError(err?.message);
      setIsLoading(false);

      throw err;
    }
  }, []);

  return { isLoading, error, clearError, sendRequest };
};
