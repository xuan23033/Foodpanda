import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = (token, userType) => {
    setCurrentUser(token);
    setUserType(userType);
    localStorage.setItem("token", token);
    localStorage.setItem("userType", userType);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, userType, setCurrentUser, setUserType, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
