import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GLogin from "../Login/GLogin.jsx";
import { FiUser, FiLock } from "react-icons/fi";

const CLIENT_ID =
  "551070839040-qh22gqelveth5aaiqfan1fm43v0tvs7s.apps.googleusercontent.com";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        (import.meta.env.VITE_API_URL || "http://localhost:5000") +
          "/api/auth/login",
        { username, password }
      );

      const { token, _id, username: userName, role } = res.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem(
        "user",
        JSON.stringify({ _id, username: userName, role, token })
      );
      dispatch(setUser({ _id, username: userName, role, token }));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden bg-[#0f1117]">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />

      <div className="w-full max-w-md relative z-10 animate-fadeUp">
        <div className="glass-card p-8 sm:p-10 border-t border-t-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight gradient-text mb-2">
              Matty
            </h1>
            <h2 className="text-xl text-gray-300 font-medium">Welcome Back</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block mb-1.5 text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiUser />
                </div>
                <input
                  type="text"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input pl-10"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1.5 text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiLock />
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="shrink-0 px-4 text-xs text-gray-500 uppercase font-medium">
                Or continue with
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>
            
            <div className="flex justify-center">
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <GLogin />
              </GoogleOAuthProvider>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
