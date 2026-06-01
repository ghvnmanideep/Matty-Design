// pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesigns } from "../store/designSlice";
import DesignCard from "../Cards/DesignCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { list: designs = [], status } = useSelector(
    (state) => state.designs || {}
  );

  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user?._id;
  const username = user?.username;

  useEffect(() => {
    if (userId) {
      dispatch(fetchDesigns(userId));
    }
  }, [dispatch, userId]);

  const isLoading = status === "loading";

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            My Designs
          </h1>
          {username && (
            <p className="text-gray-400 text-sm mt-1">
              Welcome back, <span className="text-red-400 font-medium">{username}</span>!
            </p>
          )}
        </div>
        <Link
          to="/editor"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-900/30 self-start sm:self-auto"
          style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)" }}
        >
          <span className="text-lg leading-none">+</span>
          New Design
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        /* Skeleton Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="skeleton aspect-video w-full" />
              <div className="p-4 space-y-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : designs.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-xl font-semibold text-white mb-2">No designs yet</h2>
          <p className="text-gray-400 mb-6 max-w-xs">
            Start your creative journey — create your first design in the editor.
          </p>
          <Link
            to="/editor"
            className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)" }}
          >
            Open Editor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {designs.map((design) => (
            <DesignCard key={design._id} design={design} />
          ))}
        </div>
      )}
    </div>
  );
}
