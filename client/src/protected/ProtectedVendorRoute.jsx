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

const ProtectedVendorRoute = () => {
  const vendorAuth = useSelector((state) => state.auth.vendorAuth);
  const token = cookies.get("jwt_vendor_authorization");

  const isAuthenticated = vendorAuth && token && !isTokenExpired(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/vendor/login" replace />;
};

export default ProtectedVendorRoute;
