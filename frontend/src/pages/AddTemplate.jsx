//pages/AddTemplate.jsx
import React, { useState } from "react";
import axiosInstance from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

export default function AddTemplate() {
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateCategory, setNewTemplateCategory] = useState("");
  const [imageData, setImageData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tplError, setTplError] = useState("");
  const [tplLoading, setTplLoading] = useState(false);

  const navigate = useNavigate();

  // Convert image -> base64 and create preview
  const onPickImage = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    
    // Create preview URL for immediate display
    const objectUrl = URL.createObjectURL(f);
    setPreviewUrl(objectUrl);

    const reader = new FileReader();
    reader.onloadend = () => setImageData(reader.result);
    reader.readAsDataURL(f);
  };

  // Submit template
  const handleAddTemplate = async (e) => {
    e.preventDefault();
    setTplError("");
    if (!newTemplateName || !newTemplateCategory || !imageData) {
      setTplError("Please fill all fields and upload an image.");
      return;
    }
    setTplLoading(true);
    try {
      const res = await axiosInstance.post("/api/admin/templates", {
        name: newTemplateName,
        category: newTemplateCategory,
        imageData,
      });

      // redirect to editor with the newly added template
      navigate("/editor", { state: { template: res.data } });
    } catch (err) {
      console.error(err);
      setTplError("Failed to add template.");
    } finally {
      setTplLoading(false);
    }
  };

  return (
    <div className="page-container flex items-center justify-center">
      <div className="w-full max-w-2xl animate-fadeUp">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Add Official Template</h1>
          <p className="text-gray-400 text-sm">Upload a new template for users to use.</p>
        </div>

        <div className="glass-card p-6 md:p-8">
          {tplError && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {tplError}
            </div>
          )}

          <form onSubmit={handleAddTemplate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-300">
                  Template Name
                </label>
                <input
                  type="text"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  placeholder="e.g. Summer Sale Banner"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  value={newTemplateCategory}
                  onChange={(e) => setNewTemplateCategory(e.target.value)}
                  placeholder="e.g. Social Media, Poster"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-300">
                Template Image
              </label>
              
              <div className="mt-2 flex justify-center rounded-xl border border-dashed border-white/20 px-6 py-10 bg-white/5 relative hover:bg-white/10 transition-colors group">
                <div className="text-center">
                  {previewUrl ? (
                    <div className="mb-4 relative">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="mx-auto h-48 object-contain rounded border border-white/10 shadow-lg" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                        <span className="text-white text-sm font-medium">Click to change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-4xl text-gray-400">📁</span>
                    </div>
                  )}
                  <div className="flex text-sm leading-6 text-gray-400 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-red-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 hover:text-red-300"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={onPickImage}
                        accept="image/*"
                        required={!imageData}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
                {/* Invisible file input covering the whole area for drag & drop feel */}
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={onPickImage}
                  accept="image/*"
                  title=""
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={tplLoading}
                className="w-full sm:w-auto btn-primary px-8"
              >
                {tplLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : (
                  "Add Template"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
