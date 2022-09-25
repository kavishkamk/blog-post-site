import { useState, useCallback, useEffect} from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
  const [tokenExpirationDay, setTokenExpirationDay] = useState();
  const [userId, setUserId] = useState(null);

  const logIn = useCallback((userId, token, expiration) => {
    setToken(token);
    setUserId(userId);
    const tokenExpirationDate = expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDay(tokenExpirationDate);
    localStorage.setItem("userData", JSON.stringify({userId, token, tokenExpirationDate: tokenExpirationDate.toISOString()}));
  } ,[]);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));

    if (storeData && storeData.token && new Date(storeData.tokenExpirationDate) > new Date()) {
      logIn(storeData.userId, storeData.token, new Date(storeData.tokenExpirationDate));
    }
  }, [logIn]);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDay(null);
    localStorage.removeItem("userData");
  }, []);


  useEffect(() => {
    if (token) {
      const remainingTime = tokenExpirationDay.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logOut, tokenExpirationDay]);

  return {token, logIn, logOut, userId};
};