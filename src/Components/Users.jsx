import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../context/Authcontext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { user } = useAuth(); // ✅ use global user

  const limit = 6;
  const BASE_URL = import.meta.env.VITE_API_URL;

  // ================= FETCH USERS =================
  const showuser = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/users?page=${page}&limit=${limit}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch users");
      }

      setUsers(data.users || []);
      setTotalPage(data.totalPages || 1);
      setMsg("");

    } catch (err) {
      toast.error(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH USERS =================
  const searchusr = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/usrsearch?page=${page}&limit=${limit}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setUsers([]);
        setMsg("User not found");
        return;
      }

      setUsers(data.users || []);
      setTotalPage(data.totalPages || 1);
      setMsg("");

    } catch (err) {
      toast.error("Search failed");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= ROLE CHANGE =================
  const changeRole = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/change-role/${id}`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, role: data.role } : u
        )
      );
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    let timer;

    if (search.trim() === "") {
      showuser();
    } else {
      timer = setTimeout(() => {
        searchusr();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [search, page]);

  // ================= UI =================
  return (
    <div>
      {/* SEARCH */}
      <div className="flex mt-10 justify-center items-center h-[20vh]">
        <div className="w-[80%] flex">
          <input
            type="text"
            placeholder="Enter user name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="flex-1 p-2 border border-gray-400 rounded-l"
          />

          <button className="bg-blue-500 text-white px-2 py-2 rounded-r text-xl">
            🔍
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          {/* MESSAGE */}
          {msg && <div className="text-center text-xl">{msg}</div>}

          {/* USER LIST */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
            {(users || []).map((u) => (
              <div
                key={u._id}
                className="mx-auto w-[80%] p-5 space-y-3 bg-gray-100 rounded-md"
              >
                <p>Email: {u.email}</p>
                <p>Role: {u.role}</p>

                {/* ONLY SUPERADMIN */}
                {user?.role === "superadmin" && (
                  <button
                    onClick={() => changeRole(u._id)}
                    className={`text-white px-2 py-1 rounded ${
                      u.role === "user" ? "bg-green-400" : "bg-red-500"
                    }`}
                  >
                    {u.role === "user" ? "Promote" : "Make user"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-3 flex justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center bg-gray-200 p-2 rounded-lg gap-2"
            >
              <FaArrowLeft />
              Prev
            </button>

            <button
              onClick={() => setPage((p) => p + 1)}
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