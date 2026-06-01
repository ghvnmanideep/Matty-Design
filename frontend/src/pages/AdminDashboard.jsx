// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosinstance";
import { useDispatch } from "react-redux";
import { setAllUsers } from "../store/userSlice";

export default function AdminDashboard() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // fetch designs (admin)
  useEffect(() => {
    const fetchAllDesigns = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/admin/designs");
        setDesigns(res.data);
      } catch (err) {
        console.error("Error fetching all designs:", err);
        setDesigns([]);
      }
      setLoading(false);
    };
    fetchAllDesigns();
  }, []);

  // fetch users -> redux
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/admin/getUsers");
        if (res) dispatch(setAllUsers(res.data));
      } catch (error) {
        console.log("Error fetching allUsers", error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  // delete a design (admin)
  const handleDelete = async (designId) => {
    if (!window.confirm("Delete this design?")) return;
    try {
      await axiosInstance.delete(`/api/admin/designs/${designId}`);
      setDesigns((prev) => prev.filter((d) => d._id !== designId));
      alert("Design deleted.");
    } catch (err) {
      alert("Failed to delete design.");
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Overview of all user designs and platform content.
        </p>
      </div>

      {/* Stats row (placeholder for actual stats if needed) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 border-l-4 border-l-blue-500">
          <div className="text-gray-400 text-sm font-medium mb-1">Total Designs</div>
          <div className="text-2xl font-bold text-white">{designs.length}</div>
        </div>
      </div>

      {/* Designs Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">All User Designs</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : designs.length === 0 ? (
          <div className="glass-card p-8 text-center text-gray-400">
            No designs found on the platform.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {designs.map((design) => (
              <div key={design._id} className="glass-card flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1">
                {/* Thumbnail */}
                <div className="aspect-video bg-black/40 flex items-center justify-center border-b border-white/5">
                  {design.thumbnailUrl ? (
                    <img
                      className="w-full h-full object-contain"
                      src={design.thumbnailUrl}
                      alt={design.name}
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-gray-600 text-xs">No Preview</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-sm truncate mb-1" title={design.name}>
                    {design.name || "Untitled"}
                  </h3>
                  <div className="text-xs text-gray-400 flex flex-col gap-1 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="text-gray-500">👤</span> {design.username || "Unknown"}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-500">🔲</span> Shapes: {Array.isArray(design.Shapes) ? design.Shapes.length : 0}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleDelete(design._id)}
                      className="w-full py-1.5 rounded-lg text-xs font-semibold text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/20"
                    >
                      Delete Design
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
