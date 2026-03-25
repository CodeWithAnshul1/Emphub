import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Menubar() {
  const [open, setOpen] = useState(false);
  const navigate =useNavigate();
  const token =localStorage.getItem("token");

  const logout =()=>{
    if(token){
        setOpen(false);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.success("Logged out successfully");
      navigate("/")
      
    }
    
  }

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => {
            if(!token) return ;

         setOpen(!open)}
        }
        className="relative w-5 h-5  flex flex-col justify-between z-50"
      >
        <span
          className={`block h-1 bg-black rounded transition-all duration-300 ${
            open ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block h-1 bg-white rounded transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-1 bg-black rounded transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-997 bg-black/40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[998]  h-screen bg-white shadow
        transform transition-transform duration-300 overflow-y-auto
        
        w-[60%] sm:w-[60%] md:w-[40%] lg:w-[30%]
        
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="bg-[#232F3E] text-white h-[110px] p-4 flex justify-between items-center">
          <button onClick={logout} className="flex items-center  gap-2">
            <FiLogOut size={20} />
            Logout
          </button>
          <button
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-100 p-4">
           
          <p>Menu Item 2</p>
          <p>Menu Item 3</p>
        </div>
      </div>
    </>
  );
}