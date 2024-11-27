import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteType = {
  children: ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteType> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}