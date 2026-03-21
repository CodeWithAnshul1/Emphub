import React from 'react'
import { useState } from 'react';
import {Link , useNavigate} from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';



export default function Navbar() {
  const navigate = useNavigate();
  const token =localStorage.getItem("token");

  const logout =()=>{
    if(token){
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/")
      
    }
    
  }
  return(
    <div className=' flex h-12.5 fixed  top-0 w-full  items-center justify-between  xl:justify-none xl:space-x-4 p-4 px-5 bg-gray-200 spacex-x-10 '>
      <Link  to="/Add">Add-User</Link>
      <Link to="/user"> Users</Link>
      <button onClick={logout} className="flex items-center gap-2">
  <FiLogOut size={20} />
  Logout
</button>
      {/* <Link to="/update">Update-User</Link> */}
      {/* <Link to="/delete">DleteUser</Link> */}
    </div>

  );
}
