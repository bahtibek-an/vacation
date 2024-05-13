import React from "react";
import { Navigate } from "react-router-dom";
import { UserRole } from "../../axios/UserAPI";
import { useUserContext } from "../../context/UserContext";

interface IPrivateRoute {
  children: React.ReactNode;
  isAdminPage?: boolean
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children, isAdminPage }) => {
  const accessToken = localStorage.getItem("accessToken");
  const {user} = useUserContext()

  if (!accessToken) {
    return <Navigate to="/login" replace={true} />;
  }

  if(isAdminPage && user?.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
