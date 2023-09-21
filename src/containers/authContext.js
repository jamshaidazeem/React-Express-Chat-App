import React, { createContext, useContext, useState } from "react";
import { getCookie } from "../utilis/helper";

const authContext = createContext(null);

export const useAuth = () => {
  // returns context object value e.g (loggedInUser, saveUserInContext, clearUserFromContext) using useContext hook
  const { loggedInUser, saveUserInContext, clearUserFromContext } =
    useContext(authContext);
  return {
    loggedInUser: JSON.parse(loggedInUser),
    saveUserInContext,
    clearUserFromContext,
  };
};

export const AuthContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const saveUserInContext = () => {
    const tokenData = getCookie("tokenData");
    if (tokenData) {
      setLoggedInUser(tokenData);
    }
  };

  const clearUserFromContext = () => {
    setLoggedInUser(null);
  };

  return (
    <authContext.Provider
      value={{ loggedInUser, saveUserInContext, clearUserFromContext }}
    >
      {children}
    </authContext.Provider>
  );
};
