import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const login = useCallback((uId, token, expirationDate) => {
    setToken(token);
    setUserId(uId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uId,
        token,
        expirationDate: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expirationDate)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
