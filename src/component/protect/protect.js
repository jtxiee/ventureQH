import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const isAuthenticated = !!storedUser && !!storedUser.token;

  return isAuthenticated ? Component : <Navigate to="/login-nv" />;
};

export default ProtectedRoute;
