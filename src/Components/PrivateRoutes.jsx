import React from 'react';
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {

  const token = localStorage.getItem("token");

  // ❌ no token → not logged in
  if (!token) {
    return <Navigate to="/" />;
  }

  // ✅ token exists → allow access
  return children;
}