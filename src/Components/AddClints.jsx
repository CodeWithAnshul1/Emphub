import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddUser() {
     const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [ add , setAdd] = useState("");
    const navigate =useNavigate();
    const token = localStorage.getItem("token");
    const BASE_URL=import.meta.env.VITE_API_URL;
    // console.log(token);

    // const loggedout = () =>{
    //   localStorage.removeItem("token");
    //   toast.success("Logged out successfully");

    //   navigate("/")
    // }

   

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  try{
    
    const res = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, number ,add }),
    });
    
    const data = await res.json();
    // console.log(data);
    if(data){
      toast.success("User add successfully");
      setName("");
      setNumber("");
      setAdd("");
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
          <h2 className="text-2xl font-bold text-center">Add New Clint</h2>
  
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <input
            type="text"
            placeholder="phone Number"
            maxLength={10}
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={number}
            onChange={(e) => setNumber(e.target.value.replace(/\D/g,""))}
          />
          <input
            type="text"
            placeholder="Address"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
  
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
  
        </form>

       
      </div>
      </div>
    );
}
