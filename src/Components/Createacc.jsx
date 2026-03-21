import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Createacc() {
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const BASE_URL=import.meta.env.VITE_API_URL;
    

    const handlecreate = async (e) => {
      e.preventDefault();
      try{
        setLoading(true);
          const res = await fetch(`${BASE_URL}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, pass }),
        });
        
        //   const data = await res.json();
        //   if(data.token){
          //     // console.log(data.token);
          //      localStorage.setItem("token",data.token);
          //   }
          
          if(res.ok){
            
            setPass("");
            setEmail("");
            toast.success("new User Create successfully");
            const timer =setTimeout(() => {
              navigate("/");
              return clearTimeout(timer) ;       
            },1000);
          }
        }
        catch(err){
          toast.error("something went wrong");

        }
        finally{
          setLoading(false);
        }
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
  
        <form
          onSubmit={handlecreate}
          className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
  
          <input
            type="email"
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
  
         <button
             type="submit"
             disabled={loading}
             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
              >
            {loading ? "Creating..." : "Create Account"}
        </button>

       
  
        </form>
  
      </div>
    );
  
}
