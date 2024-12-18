import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setCurrentUser(null);
    setUserType(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    setCurrentUser(token);
    setUserType(userType);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userType, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
