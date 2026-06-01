// src/pages/About.jsx
import React from "react";
import homeBack from "../assets/home_back.jpg";

const features = [
  { icon: "🎨", title: "Canvas Editor", desc: "Shapes, images & text tools on a powerful interactive canvas." },
  { icon: "📤", title: "Image Uploads", desc: "Upload images directly from your device into your designs." },
  { icon: "🔤", title: "Text Styling", desc: "Customize fonts, colors, and sizes to match your vision." },
  { icon: "↩️", title: "Undo / Redo", desc: "Full history control so you never lose creative momentum." },
  { icon: "💾", title: "Save Designs", desc: "Designs are saved to your personal dashboard automatically." },
  { icon: "🔐", title: "Secure Auth", desc: "JWT-based authentication keeps your work private and safe." },
];

export default function About() {
  return (
    <div
      className="relative w-full min-h-[calc(100vh-64px)] bg-center bg-cover bg-no-repeat flex flex-col items-center justify-start text-white"
      style={{ backgroundImage: `url(${homeBack})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 py-16 sm:py-20 animate-fadeUp">
        {/* Hero Title */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About Matty
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            <strong className="text-white">Matty</strong> is your creative companion — a modern,
            browser-based design tool built with the MERN stack. Create posters, banners, and
            social media visuals with ease. No complex software, no limits.
          </p>
        </div>

        {/* Features Grid */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8 text-orange-400">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-4 p-5 rounded-2xl transition-transform duration-200 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span className="text-3xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div
          className="text-center p-8 rounded-2xl"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-orange-400">Our Mission</h2>
          <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
            We're here to make designing accessible for everyone — from students to social media
            managers. Matty's simple yet powerful tools help you create beautiful designs, fast.
          </p>
        </div>

        <p className="mt-10 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Matty — Built with ❤️ using React, Redux, TailwindCSS &
          Node.js.
        </p>
      </div>
    </div>
  );
}
