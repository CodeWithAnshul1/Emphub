import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Menubar from './Menubar';
import { useAuth } from "../context/Authcontext";


export default function Navbar() {
  const { user } = useAuth();

  // const [currentUser, setCurrentUser] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;
  // const role = localStorage.getItem("role");

//   useEffect(() => {
//   const getUser = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/me`, {
//         credentials: "include",
//       });

//       if (!res.ok) {
//         return; // 🔥 stop error
       
//     }

//       const data = await res.json();
//       setCurrentUser(data.user);

//     } catch (err) {
//       setCurrentUser(null);
//     }
//   };

//   getUser();
// }, []);// ✅ only once

  return (
    <div className='flex h-12.5 fixed top-0 w-full items-center justify-between xl:space-x-4 p-4 px-5 bg-gray-200'>

      {/* ✅ safe check */}
      {
        (user?.role === "admin" ||user?.role === "superadmin") && (
          <Link to="/Add">Add-clients</Link>
        )

      }

      

      <Link to="/clint">Clients</Link>

      <Menubar />

    </div>
  );
}