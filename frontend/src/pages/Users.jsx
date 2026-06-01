// pages/Users.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosinstance";
import { FiUsers, FiMail, FiCalendar, FiShield, FiAlertCircle, FiUser } from "react-icons/fi";

function Users() {
  const storeUsers = useSelector((s) => s.user.allUsers);
  const isAdmin = useSelector((s) => s.user.isAdmin);
  const [users, setUsers] = useState(storeUsers || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsers(storeUsers);
  }, [storeUsers]);

  useEffect(() => {
    async function ensureUsers() {
      if (!isAdmin) return;
      if (users && users.length > 0) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/admin/getUsers");
        setUsers(res.data || []);
      } catch (e) {
        console.error("Users fetch error", e);
      } finally {
        setLoading(false);
      }
    }
    ensureUsers();
  }, []); // eslint-disable-line

  if (!isAdmin) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="glass-card p-10 text-center max-w-sm w-full border-t-red-500/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-center mb-6 text-red-500 relative z-10">
            <FiAlertCircle size={56} className="drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 relative z-10">Access Denied</h2>
          <p className="text-gray-400 relative z-10">You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Platform Users</h1>
        <p className="text-gray-400 text-sm">
          Manage and view all registered users.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="glass-card p-12 text-center text-gray-400 flex flex-col items-center justify-center animate-fadeIn">
          <FiUsers size={56} className="mb-4 text-gray-500 opacity-50" />
          <p className="text-lg font-medium text-gray-300">No users found</p>
          <p className="text-sm mt-1">There are currently no users on the platform.</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs uppercase bg-black/40 text-gray-400 border-b border-white/10">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><FiUser size={14} /> User</div>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><FiMail size={14} /> Email</div>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><FiShield size={14} /> Role</div>
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><FiCalendar size={14} /> Joined</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-white font-bold shrink-0">
                          {u.username ? u.username.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="font-medium text-white">{u.username}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm flex items-center gap-1.5 w-fit ${
                        u.role === "admin" 
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/30 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" 
                          : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      }`}>
                        {u.role === "admin" ? <FiShield size={12} /> : <FiUser size={12} />}
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
