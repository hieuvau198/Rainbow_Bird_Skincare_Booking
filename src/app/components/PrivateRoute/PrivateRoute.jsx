import { message } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
import DecodeRole from "../DecodeRole";

export default function PrivateRoute({ allowedRoles, children }) {
  const accessToken = Cookies.get("_aT");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const userRole = DecodeRole();

  if (userRole === null || userRole === undefined || !allowedRoles.includes(userRole)) {
    message.warning("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
}
