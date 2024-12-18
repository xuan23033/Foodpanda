import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import UnAuthorized from "./UnAuthorized";

const PrivateRoute = ({ children, redirect, type }) => {
  const { currentUser, userType } = useContext(AuthContext);
  const token = localStorage.getItem("SavedToken");

  if (!token) {
    // 如果沒有 token，重定向到登入頁面
    return <Navigate to={redirect} />;
  }

  if (currentUser && userType === type) {
    // 如果有有效 token 且用戶類型匹配，顯示子組件
    return children;
  }

  if (currentUser !== null) {
    // 用戶已經登入但沒有足夠權限，顯示未授權頁面
    return <UnAuthorized />;
  }

  // 如果用戶未登入，重定向到登入頁面
  return <Navigate to={redirect} />;
};

export default PrivateRoute;
