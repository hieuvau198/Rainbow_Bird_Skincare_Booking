import { message } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";
import DecodeRole from "../DecodeRole";
import UserRole from "../../../enums/userRole";

export default function PrivateRoute({ allowedRoles, children }) {
  const accessToken = Cookies.get("__atok");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const userRole = DecodeRole();

  if (userRole === null || userRole === undefined || !allowedRoles.includes(userRole)) {
    message.warning("You do not have permission to access this page.");
    if (userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) {
      return <Navigate to="/management/dashboard" replace />;
    } else if (userRole === UserRole.STAFF) {
      return <Navigate to="/management/service" replace />;
    } else if (userRole === UserRole.THERAPIST) {
      return <Navigate to="/management/schedule" replace />;
    } else if (userRole === UserRole.CUSTOMER) {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
