import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap, faBuilding, faLightbulb, faUserCircle } from '@fortawesome/free-solid-svg-icons';

// NavBar component
function MainPageNavbar({ userName = "Amit Kumar" }) {
  return (
    <nav className="w-full bg-white flex items-center justify-between px-8 py-4 sticky top-0 z-50 font-sans">
      {/* Left: Logo + Site Name */}
      <div className="flex items-center gap-2">
       
        <span className="text-2xl font-bold text-blue-600 tracking-wide select-none" style={{ letterSpacing: '1.5px' }}>
          Job<span className="text-black">Portal</span>
        </span>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-8 text-lg font-semibold">
        <NavLink to="/jobs"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-50 transition ${isActive ? "text-blue-600" : "text-gray-700"}`
          }>
          <FontAwesomeIcon icon={faBriefcase} />
          Jobs
        </NavLink>
        <NavLink to="/internships"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-50 transition ${isActive ? "text-blue-600" : "text-gray-700"}`
          }>
          <FontAwesomeIcon icon={faGraduationCap} />
          Internships
        </NavLink>
        <NavLink to="/companies"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-50 transition ${isActive ? "text-blue-600" : "text-gray-700"}`
          }>
          <FontAwesomeIcon icon={faBuilding} />
          Companies
        </NavLink>
        <NavLink to="/career-tips"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-50 transition ${isActive ? "text-blue-600" : "text-gray-700"}`
          }>
          <FontAwesomeIcon icon={faLightbulb} />
          Career Tips
        </NavLink>
      </div>

      {/* Right: Account (User) */}
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-blue-800" />
        <span className="text-lg font-semibold text-gray-800">{userName}</span>
      </div>
    </nav>
  );
}

export default MainPageNavbar;
