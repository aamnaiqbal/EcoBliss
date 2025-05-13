import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ProtectedCustomerRoute = () => {
  const userAuth = useSelector((state) => state.auth.userAuth);
  const token = cookies.get("jwt_authorization");

  const isAuthenticated = userAuth && token && !isTokenExpired(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/user/login" replace />;
};

export default ProtectedCustomerRoute;
