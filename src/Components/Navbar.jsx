import React from 'react';
import { Link } from "react-router-dom";
import Menubar from './Menubar';
import { useAuth } from "../context/Authcontext";

export default function Navbar() {
  const { user } = useAuth();

  // ✅ clean role check
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  return (
    <div className='flex h-12.5 fixed top-0 w-full items-center justify-between xl:space-x-4 p-4 px-5 bg-gray-200'>

      {/* ✅ Only admin/superadmin can see */}
      {isAdmin && (
        <Link to="/Add">Add-clients</Link>
      )}

      <Link to="/clint">Clients</Link>

      <Menubar />

    </div>
  );
}