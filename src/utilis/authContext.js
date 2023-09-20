import React, { createContext, useContext, useState } from "react";
import { getCookie } from "./helper";

const authContext = createContext(null);

export const useAuth = () => {
  // returns context object using useContext hook
  return useContext(authContext);
};

export const AuthContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const saveUserInContext = () => {
    const tokenData = getCookie("tokenData");
    setLoggedInUser(tokenData);
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
