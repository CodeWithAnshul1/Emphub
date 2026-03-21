import { useState } from 'react'
import Navbar from "./Components/Navbar";
import './App.css'
import AppRoutes from './Components/AppRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function App() {
  return (
    <>
    <Navbar />
    <AppRoutes />
   <ToastContainer
  position="top-right"
  style={{ top: "50px" ,width :"100%"}}   // pushes below navbar
  toastStyle={{
    minHeight: "40px",      // controls height
    fontSize: "16px",
    width:"100%",
    maxHeight :"400px"
  }}
/>
    </>
  )
}
