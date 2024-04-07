import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

const PrivateRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
