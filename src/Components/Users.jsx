// import { Types } from 'mongoose';
import React from 'react'
import {useState ,useEffect} from "react"
import { useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export default function Users() {
    const [users , setUsers] = useState([]);
    const [loading ,setLoading] =useState (false);
    const [search ,Setsearch] =useState("");
    const [msg , setmsg] =useState("");
    const [page , setPage] = useState(1);
    const token =localStorage.getItem("token");
    const navigate =useNavigate();
    const [totalPage , settotalPage] = useState(1);
    const limit = 6 ;
    const BASE_URL=import.meta.env.VITE_API_URL;
    

    useEffect(() => {
  let timer;

  if (search.trim() === "") {
    setmsg("");
    setPage(1);
    showusers();
  } else {
    timer = setTimeout(() => {
      setmsg("");
      searchusr();
    }, 1000); // 1 sec delay
  }

  return () => clearTimeout(timer); // ✅ cleanup
}, [search, page]);

     const searchusr = async()=>{
        try{

            const res = await fetch(`${BASE_URL}/search?page=${page}&limit=${limit}`,{
                method :"POST",
                headers :{
                    Authorization :`Bearer ${token}`,
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({search}),
            });
      const data = await res.json();
      if(data.message){
          setmsg(data.message);
          setUsers([]);
          const timer = setTimeout(()=>{
              setmsg("");
              return clearTimeout(timer);
            },3000);
        }
        else{
            
            setUsers(data.users);
            settotalPage(data.totalPages);
        }
        
        
    }
    catch(err){
         console.log(err);
        toast.error("Search failed");

    }
        

    }

    const showusers = async () => {
       try{ setLoading(true);
           const res = await fetch(`${BASE_URL}/users?page=${page}&limit=${limit}` ,{
            headers :{
                Authorization :`Bearer ${token}`,
            }
           });
           const data =  await res.json();
           setUsers(data.users);
           settotalPage(data.totalPages);



       }

       catch(error){
        console.log(error);

       }
       finally
       {
        setLoading(false);

       }
    }

    const Delete = async(id) =>{
       
        try{
            const res = await fetch(`${BASE_URL}/delete/${id}`,
                {
                    method : "DELETE",
                    headers : {
                        Authorization : `Bearer ${token}`,

                    }
                }
                        
            )

            // const data =  await res.json();
            // console.log(data);
            if(res.ok){
              toast.success("User Delete successfully");
            }
            showusers();
        }
        catch(err) {

            // console.log(err);
            toast.error(err);

        }

    }
  return (
    <>
   
    <div className=" flex mt-10 justify-center  items-center h-[20vh]">
  <div className="w-[80%] flex ">
    
    <input
      type="text"
      placeholder="Enter user name"
      value={search}
      onChange={(e) =>{
          
          Setsearch(e.target.value);
          setPage(1);
    }}
      
      className="flex-1 p-2 border border-gray-400 rounded-l"
    />

    <button
      onClick={searchusr}
      className="bg-blue-500 text-white px-2 py-2 rounded-r text-xl"
    >
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>

  </div>
 
  
</div>
    {loading? (
        <div className='flex justify-center items-center h-[60vh]'>
            <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
        </div>
    ) :(    
        <div>

            <div className='text-center text-xl'>{msg}</div>
        <div className='  grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5  h-full overflow-y-auto mb-20'>
        {users.map((user) =>(
            <div key={user._id} 
            className=' mx-auto w-[80%] p-5 space-y-3  bg-gray-100 rounded-md'>
                {/* <p> id: {user._id}</p> */}
                <p> Name :{user.name}</p>
                <p> Email :{user.email}</p>

                <button
                    onClick={() => navigate(`/update/${user._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                    Edit
                </button>
                <button
                    onClick={() =>Delete(user._id)}
                    className=" ml-5 bg-red-500 text-white px-3 py-1 rounded"
                    >
                    Delete
                </button>

             </div>
        ))}
        </div>

        <div className='fixed bottom-0 left-0 w-full bg-white  p-3 flex justify-between'>
            <button
            onClick={()=>setPage(page-1)}
            disabled ={page === 1}
            className=' flex  items-center bg-gray-200 p-2 rounded-lg gap-2'
            >
            <FaArrowLeft />
            Prev

            </button>
            <button
             onClick={()=>setPage(page+1)}
            disabled ={page >= totalPage}
            className=' flex  items-center bg-gray-200 p-2 rounded-lg gap-2'
            >
            Next
            <FaArrowRight />
            </button>
        </div>

    </div>

    )}

    
    
    </>
  );
}
