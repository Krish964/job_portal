import React from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPageNav() {
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    { name: "More", to: "/more" },
  ];

  return (
    <nav className="flex justify-between  items-center px-10 py-4 bg-white sticky top-0 z-50 border-b border-gray-300">
      {/* Logo */}
      <motion.span
        className="text-4xl font-extrabold tracking-widest select-none cursor-pointer"
        
        >
        Job<span className="text-indigo-500">Portal</span>
      </motion.span>


      {/* Navigation Links */}
      <ul className="flex gap-12 font-semibold  select-none text-xl">
        {navLinks.map(({ name, to }) => (
          <li key={name} className="relative group">
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-gray-700 hover:text-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-indigo-600 rounded-md ${isActive ? "text-black font-bold" : "font-normal"
                }`
              }
              tabIndex={0}
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {name}
              {/* Underline animation */}
              <motion.span
                layoutId="underline"
                className="absolute left-0 -bottom-1 h-[2px] rounded-full bg-teal-600"
                initial={false}
                animate={{ width: isActive => (isActive ? "100%" : "0%") }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-5">
        {/* Login Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-md cursor-pointer"
        >
          <Link
            to="/login"
            className="px-6 py-2 border border-black text-black rounded-md font-medium transition-colors duration-200  block select-none"
            aria-label="Login"
          >
            Login
          </Link>
        </motion.div>

        {/* Sign Up Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-md cursor-pointer"
        >
          <Link
            to="/signup"
            className="px-6 py-2 bg-black text-white rounded-md font-medium  duration-200 focus:outline-none block select-none"
            aria-label="Sign Up"
          >
            Sign Up
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}

export default LandingPageNav;
