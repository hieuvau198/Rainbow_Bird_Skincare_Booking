import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ allowedRoles, children }) {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const userRoleCookie = Cookies.get("userRole");
  const userRole = userRoleCookie ? parseInt(userRoleCookie, 10) : null;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
