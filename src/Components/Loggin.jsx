import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


export default function Loggin() {
     const [password, setPass] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const BASE_URL=import.meta.env.VITE_API_URL;
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{

        const res = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();
        if(data.token){
          localStorage.setItem("token",data.token);
          toast.success("loggin succesfully");
          const timer = setTimeout(()=>{
            navigate("/Add");
            // return clearTimeout(timer);
          },1000);
          setPass("");
          setEmail("");
        }
        else{
          toast.error("somthing went Wrong");

        }
      }
      catch(err){
        toast.error("somthing went Wrong");

      }
      
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
  
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Loggin please</h2>
  
          <input
            type="text"
            placeholder="Enter email"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <input
            type="password"
            placeholder="Enter Password"
            required
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            sign in 
          </button>

          <button  onClick={() => navigate("/createacc")}className='pl-15 text-blue-500 hover:text-blue-700'> create new account</button>
  
        </form>
  
      </div>
    );
}
