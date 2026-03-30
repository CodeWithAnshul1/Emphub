import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to="/" />;

  return children;
}