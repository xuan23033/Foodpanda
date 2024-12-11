import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import UnAuthorized from "./UnAuthorized";

const PrivateRoute = ({ children, redirect, type }) => {
  const { currentUser, userType } = useContext(AuthContext);
  let token = localStorage.getItem("SavedToken");
  if (token && currentUser && userType === type) {
    console.log("Authorized");
    return children;
  } else if (currentUser !== null) {
    console.log("UnAuthorized");
    return <UnAuthorized></UnAuthorized>;
  } else {
    window.location.href = redirect;
  }
};

export default PrivateRoute;
