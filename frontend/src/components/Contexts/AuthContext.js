import React, { useState, createContext } from "react";
import jwtDecode from "jwt-decode";
import axios from "../Api/Api";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setuserType] = useState(null);
  const [loading, setloading] = useState(false);

  const loginResturant = (email, password, loginRoute) => {
    setloading(true);
    axios
      .post(loginRoute, {
        email: email,
        password: password,
      })
      .then((response) => {
        setloading(false);
        let token = response.headers["x-auth-token"];
        token = jwtDecode(token);
        console.log(token);
        setToken(token);
        setCurrentUser(true);
        setuserType(token.userType);
        localStorage.setItem("SavedToken", token.toString());
        localStorage.setItem("currentUser", true);
        localStorage.setItem("restaurantName", token.restaurantName);
        localStorage.setItem("userType", token.userType);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
        setloading(false);
      });
  };
  const loginCustomer = (username, password, loginRoute) => {
    setloading(true);
    axios
      .post(loginRoute, {
        username: username,
        password: password,
      })
      .then((response) => {
        let token = response.headers["x-auth-token"];
        token = jwtDecode(token);
        setCurrentUser(true);
        setuserType(token.userType);
        localStorage.setItem("SavedToken", token.toString());
        localStorage.setItem("currentUser", true);
        localStorage.setItem("username", token.username);
        localStorage.setItem("userType", token.userType);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
        setloading(false);
      });
  };
  const logout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("restaurantName");
    localStorage.removeItem("username");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("SavedToken");
    localStorage.removeItem("Items");
    window.location.href = "/";
  };
  return (
    <div>
      <AuthContext.Provider
        value={{
          currentUser,
          loginResturant,
          loginCustomer,
          logout,
          token,
          loading,
          userType,
          setCurrentUser,
          setuserType,
        }}
      >
        {!loading && props.children}
      </AuthContext.Provider>
    </div>
  );
};
export default AuthProvider;
