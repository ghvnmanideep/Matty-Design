import React from "react";
import { Link } from "react-router-dom";
import '../index.css';
import homeBack from "../assets/home_back.jpg";

export default function GetStarted() {
  return (
    <div
      className="relative w-full min-h-[calc(100vh-64px)] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${homeBack})` }}
    >
      {/* Layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      {/* Floating blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #ef4444, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f97316, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl animate-fadeUp">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm text-sm text-white/80 font-medium">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Your creative design studio
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-5 tracking-tight leading-tight">
          <span
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #f97316 60%, #facc15 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to Matty
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-10 text-white/80 leading-relaxed max-w-2xl mx-auto">
          Create stunning graphics, posters, and social media visuals with
          ease. Enjoy a powerful canvas editor right in your browser — no
          software needed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-base shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-red-600/40"
            style={{
              background: "linear-gradient(135deg, #dc2626, #ef4444)",
              boxShadow: "0 4px 24px rgba(220,38,38,0.35)",
            }}
          >
            Get Started — It's Free
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md font-medium text-base hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center">
          {[
            { label: "Canvas Tools", value: "12+" },
            { label: "Export Formats", value: "PNG & PDF" },
            { label: "Templates", value: "Growing" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-red-400">{stat.value}</div>
              <div className="text-sm text-white/60 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
