import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const { user, loading } = useAuth(); // ✅ inside function

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}