import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";

export default function PrivateRoute({ allowedRoles, children }) {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const userRole = Cookies.get("userRole");

  if (!userRole || !allowedRoles.includes(userRole)) {
    message.warning("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
}
