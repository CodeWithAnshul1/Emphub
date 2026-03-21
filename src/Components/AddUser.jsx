import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddUser() {
     const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate =useNavigate();
    const token = localStorage.getItem("token");
    const BASE_URL=import.meta.env.VITE_API_URL;

    const loggedout = () =>{
      localStorage.removeItem("token");
      toast.success("Logged out successfully");

      navigate("/")
    }

   

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  try{
    
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    
    const data = await res.json();
    // console.log(data);
    if(data){
      toast.success("User add successfully");
      setEmail("");
      setName("");
    }
  }
  catch{
    toast.error("something went wrong");
  }
  };
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className='flex flex-col  space-y-10'>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Send Data</h2>
  
          <input
            type="text"
            placeholder="Enter Name"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <input
            type="email"
            placeholder="Enter Email"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send
          </button>
  
        </form>

        {/* <button onClick={loggedout} 
        className='bg-red-500 p-3 rounded-lg mx-20'> Logged out</button> */}
      </div>
      </div>
    );
}
