import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContexts";

const PrivateRoute = ({ element, roles }) => {
  const { isAuthenticated, userData } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userData?.role)) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page or back to the dashboard
  }

  return element;
};

export default PrivateRoute;
