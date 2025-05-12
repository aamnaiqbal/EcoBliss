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

const ProtectedAdminRoute = () => {
  const adminAuth = useSelector((state) => state.auth.adminAuth);
  const token = cookies.get("jwt_admin_authorization");

  const isAuthenticated = adminAuth && token && !isTokenExpired(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;
