import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const PrivateRoute = ({ children, redirect, type }) => {
  const { currentUser, userType } = useContext(AuthContext);

  if (!currentUser || userType !== type) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default PrivateRoute;
