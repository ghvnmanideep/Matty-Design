// Header/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAdmin } from "../store/userSlice";
import mattyLogo from "../assets/mattyLogo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const authStatus = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setAdmin(false));
    navigate("/");
  };

  const navItems = [
    { name: "Editor",          route: "/editor",         active: !!authStatus || isAdmin },
    { name: "Templates",       route: "/templates",      active: true },
    { name: "Dashboard",       route: "/dashboard",      active: !!authStatus && !isAdmin },
    { name: "Admin Dashboard", route: "/admindashboard", active: isAdmin },
    { name: "Users",           route: "/users",          active: isAdmin },
    { name: "Add Template",    route: "/addtemp",        active: isAdmin },
    { name: "Login",           route: "/signin",         active: !authStatus && !isAdmin },
    { name: "Admin Login",     route: "/admin",          active: !authStatus && !isAdmin },
    { name: "Sign Up",         route: "/register",       active: !authStatus && !isAdmin },
    { name: "About",           route: "/about",          active: true },
  ].filter((item) => item.active);

  const activeLinkClass = "text-red-400 font-semibold";
  const baseLinkClass =
    "text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium";

  return (
    <nav
      className={`w-full bg-gray-950 sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/40" : ""
      }`}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={mattyLogo} alt="Matty Logo" className="h-9 w-auto" />
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Matty
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.route}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm ${
                  isActive ? activeLinkClass : baseLinkClass
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {(authStatus || isAdmin) && (
            <button
              onClick={handleLogout}
              className="ml-3 px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30"
            >
              Logout
            </button>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-5 bg-gray-300 rounded transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-300 rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-300 rounded transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div
          className="md:hidden animate-slideDown border-t px-4 py-4 flex flex-col gap-1"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "#0f1117",
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.route}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg text-sm ${
                  isActive
                    ? "bg-red-600/10 text-red-400 font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-red-400"
                } transition-colors duration-150`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {(authStatus || isAdmin) && (
            <button
              onClick={handleLogout}
              className="mt-2 w-full px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
