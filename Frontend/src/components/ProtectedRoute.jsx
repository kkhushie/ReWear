import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("rewear_token");

   // If not logged in, redirect to login
   if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;

}

export default ProtectedRoute