import { useAuth } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // ❌ logged in but NOT admin
  if (user.role !== "admin" && user.role !== "superadmin") {
    return <Navigate to="/clint" />; // redirect normal user
  }

  // ✅ admin / superadmin allowed
  return children;
}