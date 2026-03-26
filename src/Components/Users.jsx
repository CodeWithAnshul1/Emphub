import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, Setsearch] = useState("");
  const [msg, setmsg] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, settotalPage] = useState(1);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const limit = 6;
  const BASE_URL = import.meta.env.VITE_API_URL;

  // ================= USE EFFECT =================
  useEffect(() => {
    let timer;

    if (search.trim() === "") {
      setmsg("");
      showuser();
    } else {
      timer = setTimeout(() => {
        setmsg("");
        searchusr();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [search, page]);

  // ================= GET USERS =================
  const showuser = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/users?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch users");
      }

      setUsers(data.users);
      settotalPage(data.totalPages);

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================
 const searchusr = async () => {
  try {
    setLoading(true);

    const res = await fetch(
      `${BASE_URL}/usrsearch?page=${page}&limit=${limit}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      }
    );

    if (!res.ok) {
      setUsers([]); // 🔥 prevent crash
      setmsg("User not found");
      return;
    }

    const data = await res.json();

    setUsers(data.users || []); // 🔥 safe fallback
    settotalPage(data.totalPages || 1);

  } catch (err) {
    console.log(err);
    setUsers([]); // 🔥 prevent crash
    toast.error("Search failed");
  } finally {
    setLoading(false);
  }
};

const changeRole = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/change-role/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return;
    }

    toast.success(data.msg);

    // 🔥 update UI without reload
    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, role: data.role } : u
      )
    );

  } catch (err) {
    console.log(err);
    toast.error("Failed to update role");
  }
};

  // ================= UI =================
  return (
    <div>
      <div className="flex mt-10 justify-center items-center h-[20vh]">
        <div className="w-[80%] flex">
          <input
            type="text"
            placeholder="Enter user name"
            value={search}
            onChange={(e) => {
              Setsearch(e.target.value);
              setPage(1);
            }}
            className="flex-1 p-2 border border-gray-400 rounded-l"
          />

          <button className="bg-blue-500 text-white px-2 py-2 rounded-r text-xl">
            🔍
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="text-center text-xl">{msg}</div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
            {users.map((user) => (
              <div
                key={user._id}
                className="mx-auto w-[80%] p-5 space-y-3 bg-gray-100 rounded-md"
              >
                {/* <p>Name: {user.name}</p> */}
                <p>Email: {user.email}</p>

                {role === "superadmin" && (
                  <>
                    <button
                    onClick={()=>changeRole(user._id)}
                     className={` text-white px-2 py-1 rounded ${user.role=== "user"?"bg-green-400":"bg-red-500"}`}>
                      {user.role==="user"?"Permote": "Make user"}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-3 flex justify-between">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="flex items-center bg-gray-200 p-2 rounded-lg gap-2"
            >
              <FaArrowLeft />
              Prev
            </button>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPage}
              className="flex items-center bg-gray-200 p-2 rounded-lg gap-2"
            >
              Next
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}