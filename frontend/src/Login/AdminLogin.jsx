import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../store/userSlice";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief network delay for UX
    setTimeout(() => {
      // Here we check the admin credentials (Hardcoded for now)
      if (username === "matty_admin" && password === "123456") {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            _id: "admin-id",
            username: "matty_admin",
            role: "admin",
          })
        );
        sessionStorage.setItem("token", "dummy-admin-token");
        dispatch(setAdmin(true));
        // Redirect to admin dashboard
        navigate("/adminDashboard");
      } else {
        setError("Invalid admin username or password");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden bg-[#0f1117]">
      {/* Background blobs (distinct from user login) */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 animate-fadeUp">
        <div className="glass-card p-8 sm:p-10 border-t border-t-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4 border border-white/10">
              <span className="text-2xl">🛡️</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-sm text-gray-400">Authorized personnel only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label
                htmlFor="username"
                className="block mb-1.5 text-sm font-medium text-gray-300"
              >
                Admin Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter admin username"
                className="form-input"
              />
            </div>
            
            <div>
              <label
                htmlFor="password"
                className="block mb-1.5 text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="form-input"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-6 !bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!shadow-purple-600/30"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
