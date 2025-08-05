import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faBuilding,
  faLightbulb,
  faBars,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {Logout} from "./index.js";

function MainPageNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("User");
 const [modal , showModal]  = useState(false)
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser === "admin" ? storedUser : "Admin-user");
    }
  }, []);

  // Toggle modal on icon click
  const toggleModal = () => {
    showModal((prev) => !prev);
  };

  const menuItems = [
    { name: "Jobs", to: "/jobs", icon: faBriefcase },
    { name: "Internships", to: "/internships", icon: faGraduationCap },
    { name: "Companies", to: "/companies", icon: faBuilding },
    { name: "Career Tips", to: "/career-tips", icon: faLightbulb },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black backdrop-blur-md border-b border-cyan-600 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center select-none z-50">
          <span
            className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-widest transition hover:brightness-125 duration-300"
            style={{ letterSpacing: "2px" }}
          >
            Job<span className="text-white">Portal</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 font-semibold text-lg items-center text-gray-200">
          {menuItems.map(({ name, to, icon }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg relative transition duration-300 transform cursor-pointer 
                 ${isActive
                  ? "text-cyan-400 font-bold shadow-lg scale-110"
                  : "hover:text-cyan-300 hover:scale-110 hover:shadow-cyan-700/50"
                }`
              }
            >
              <FontAwesomeIcon icon={icon} />
              <span>{name}</span>
            </NavLink>
          ))}
        </div>

        {/* User Info */}
        <div className="hidden md:flex items-center gap-5 cursor-pointer select-none">
          <div className="relative group transition-transform duration-300 hover:scale-110">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-4xl text-cyan-400 drop-shadow-xl group-hover:drop-shadow-cyan-600 transition duration-300"
              onClick={toggleModal}
              tabIndex={0} 
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleModal();
              }}
              role="button"
            />
           
            {modal && <Logout/>}

            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-black animate-pulse"></span>
          </div>
          <span className="text-white font-semibold cursor-default transition-colors duration-300 hover:text-cyan-300 select-text md:select-none text-lg font-mono">
            {username}
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-50 text-cyan-400 hover:text-cyan-200 focus:outline-none p-2 transition-transform duration-300"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 w-full h-screen bg-black/90 backdrop-blur-lg transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12 text-gray-300 font-semibold text-xl px-6">
          {menuItems.map(({ name, to, icon }) => (
            <NavLink
              key={name}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-10 py-4 rounded-lg w-full justify-center cursor-pointer transition duration-200
                 ${isActive
                  ? "text-cyan-400 font-bold scale-110 bg-cyan-900/40 shadow-lg"
                  : "hover:text-cyan-400 hover:scale-105 hover:bg-cyan-900/30"
                }`
              }
            >
              <FontAwesomeIcon icon={icon} size="lg" />
              {name}
            </NavLink>
          ))}

          {/* Mobile User Info */}
          <div className="flex items-center gap-6 mt-20 group hover:scale-105 transition-transform duration-300 cursor-default select-none">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-6xl text-cyan-400 group-hover:drop-shadow-cyan-600 transition duration-300"
            />
            <span className="text-white font-semibold text-2xl group-hover:text-cyan-300 font-mono">
              {username}
            </span>
            <span className="w-5 h-5 bg-green-500 rounded-full border-2 border-black animate-pulse"></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MainPageNavbar;
