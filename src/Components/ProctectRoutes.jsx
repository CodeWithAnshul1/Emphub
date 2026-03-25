import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoutes({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "admin" || role === "superadmin") {
    return children;
  }

  return <Navigate to="/clint" />;
}