import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user) {
    return children;
  }
  return <Navigate to="/singin" state={{ from: location }} replace />;
};

export default PrivateRouter;
