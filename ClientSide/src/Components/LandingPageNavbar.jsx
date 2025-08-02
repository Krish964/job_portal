import React from "react";
import { NavLink, Link } from "react-router-dom";

function LandingPageNav() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-gradient-to-r from-blue-900 via-black to-cyan-900 shadow-2xl sticky top-0 z-50 backdrop-filter backdrop-blur-md">
      {/* Logo */}
      <span
        className="text-4xl font-extrabold text-blue-400 tracking-widest select-none cursor-pointer transition-transform transform hover:scale-110 hover:text-cyan-400"
        style={{ letterSpacing: "2.5px" }}
      >
        Job<span className="text-white">Portal</span>
      </span>

      {/* Navigation Links */}
      <ul className="flex gap-12 font-semibold text-lg select-none">
        {[
          { name: "Home", to: "/" },
          { name: "About", to: "/about" },
          { name: "Contact", to: "/contact" },
          { name: "More", to: "/more" },
        ].map(({ name, to }) => (
          <li key={name} className="relative group cursor-pointer">
            {to ? (
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `text-gray-300 hover:text-cyan-400 transition duration-300 ${isActive ? "text-cyan-400 font-bold" : ""
                  }`
                }
              >
                {name}
              </NavLink>
            ) : (
              <span className="text-gray-300 hover:text-cyan-400 transition duration-300">
                {name}
              </span>
            )}
            {/* Underline effect */}
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-cyan-400 transition-all group-hover:w-full rounded-md"></span>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-6">
        {/* Login Button */}
        <Link
          to="/login"
          className="px-8 py-3 rounded-xl border-2 border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black transition duration-300 select-none shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400"
        >
          Login
        </Link>
        {/* Sign Up Button */}
        <Link
          to="/signup"
          className="px-8 py-3 rounded-xl border-2 border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black transition duration-300 select-none shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default LandingPageNav;
