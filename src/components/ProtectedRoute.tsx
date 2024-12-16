import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { token } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signIn" replace />;
  // if (!token) {
  //   console.log("User is not authenticated, redirecting to SignIn page.");
  //   return <Navigate to="/signIn" replace />;
  // }

  // return children;
};

export default ProtectedRoute;
