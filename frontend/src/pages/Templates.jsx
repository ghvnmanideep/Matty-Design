import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const url = category
          ? `/api/templates?category=${encodeURIComponent(category)}`
          : "/api/templates";
        const res = await axiosInstance.get(url);
        setTemplates(res.data || []);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [category]);

  const handleTemplateClick = (templateId) => {
    navigate(`/editor?templateId=${templateId}`);
  };

  return (
    <div className="page-container">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Templates
          </h1>
          <p className="text-gray-400 text-sm">
            Start your design with one of our ready-to-use templates.
          </p>
        </div>
        
        {/* Search / Filter */}
        <div className="relative w-full sm:w-64">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            🔍
          </span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Filter by category..."
            className="form-input pl-10 w-full"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="skeleton aspect-[5/3] w-full rounded-b-none" />
              <div className="p-4 space-y-2">
                <div className="skeleton h-3 w-1/3 rounded" />
                <div className="skeleton h-4 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-xl font-semibold text-white mb-2">No templates found</h2>
          <p className="text-gray-400 text-sm">
            Try adjusting your category filter to see more options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((t) => (
            <div
              key={t._id}
              className="glass-card group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
              onClick={() => handleTemplateClick(t._id)}
            >
              {/* Image Area */}
              <div className="relative aspect-[5/3] overflow-hidden bg-black/40 rounded-t-[15px]">
                {t.imageUrl ? (
                  <img
                    src={t.imageUrl}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <span className="text-3xl mb-1">🖼️</span>
                    <span className="text-xs">No preview</span>
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    Use Template
                  </span>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-4 border-t border-white/10">
                <div className="inline-block px-2 py-0.5 rounded bg-white/5 text-gray-300 text-xs font-medium mb-2 border border-white/10">
                  {t.category || "General"}
                </div>
                <h3 className="font-semibold text-white truncate text-sm">
                  {t.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
