import React from 'react'
import { useState } from 'react';
import {Link , useNavigate} from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';

console.log()



export default function Navbar() {
  const navigate = useNavigate();
  const token =localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout =()=>{
    if(token){
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.success("Logged out successfully");
      navigate("/")
      
    }
    
  }
  return(
    <div className=' flex h-12.5 fixed  top-0 w-full  items-center justify-between  xl:justify-none xl:space-x-4 p-4 px-5 bg-gray-200 spacex-x-10 '>
     { (role === "admin" || role === "superadmin")&& (

      <Link  to="/Add">Add-clints</Link>
     )}
      <Link to="/clint"> Clints</Link>
      <Link>Admin</Link>

      <button onClick={logout} className="flex items-center gap-2">
  <FiLogOut size={20} />
  Logout
</button>
      
    </div>

  );
}
