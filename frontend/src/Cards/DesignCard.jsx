// Cards/DesignCard.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDesign,
  updateDesign as updateDesignAction,
  deleteDesign as deleteDesignAction,
  fetchDesigns,
} from "../store/designSlice";
import axiosInstance from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

export default function DesignCard({ design }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(design.name || "Untitled Design");
  const [hovered, setHovered] = useState(false);

  const user =
    useSelector((state) => state.user.user) ||
    JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user?._id;
  const token = sessionStorage.getItem("token");

  const handleOpenDesign = () => {
    dispatch(setSelectedDesign(design));
    navigate("/editor");
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Delete "${design.name}"?`)) return;
    try {
      await axiosInstance.delete(`/api/designs/${design._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (userId) dispatch(fetchDesigns(userId));
    } catch (err) {
      console.error("Error deleting design:", err);
      alert("Delete failed");
    }
  };

  const handleNameUpdate = async (e) => {
    e.stopPropagation();
    try {
      const res = await axiosInstance.put(
        `/api/designs/${design._id}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateDesignAction(res.data));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating design name:", err);
      alert("Rename failed");
    }
  };

  const imgSrc =
    design.thumbnailUrl || design.assetUrl || design.thumbnail || "";

  const cardStyle = {
    background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "16px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: hovered
      ? "0 12px 32px rgba(0,0,0,0.4)"
      : "0 2px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
    overflow: "hidden",
  };

  return (
    <div
      style={cardStyle}
      onClick={handleOpenDesign}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="w-full aspect-video flex items-center justify-center overflow-hidden"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={design.name}
            className="w-full h-full object-contain transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <span className="text-3xl">🖼️</span>
            <span className="text-xs">No preview</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4">
        {/* Name row */}
        <div className="mb-3">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="form-input text-sm"
              autoFocus
            />
          ) : (
            <h2 className="font-semibold text-white truncate text-sm">
              {design.name || "Untitled Design"}
            </h2>
          )}
          <p className="text-xs text-gray-500 mt-0.5">
            {new Date(design.updatedAt).toLocaleDateString(undefined, {
              month: "short", day: "numeric", year: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <button
              onClick={handleNameUpdate}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
              style={{ background: "#16a34a" }}
            >
              Save
            </button>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-blue-300 transition-colors hover:bg-blue-600/20"
              style={{ border: "1px solid rgba(96,165,250,0.3)" }}
            >
              Rename
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-red-300 transition-colors hover:bg-red-600/20"
            style={{ border: "1px solid rgba(248,113,113,0.3)" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
