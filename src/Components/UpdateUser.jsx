import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function UpdateUser() {
  const {id} = useParams() ;
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
 
  const BASE_URL=import.meta.env.VITE_API_URL;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/clint/${id}`,{
      method:"PUT",
      credentials: "include" ,
      headers:{
       
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        email
      })
    });

    const data = await res.json();
    console.log(data);
    setName("");
    setEmail("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form 
      onSubmit={handleUpdate}
      className="bg-white p-8 rounded shadow-md w-96 space-y-4">

        <h2 className="text-2xl font-bold text-center">Update User</h2>

        <input
        type="text"
        placeholder="Enter New Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="w-full border p-2 rounded"
        />

        <input
        type="email"
        placeholder="Enter New Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        />

        <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update User
        </button>

      </form>

    </div>
  );
}
