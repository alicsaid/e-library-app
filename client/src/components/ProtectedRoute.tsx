import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode; // Explicitly typing the children prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userDetails = localStorage.getItem("token"); // Pronađi token u localStorage

  return !userDetails ? <Navigate to="/" /> : <>{children}</>;
};

export default ProtectedRoute;
