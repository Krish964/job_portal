import React from "react";
import { NavLink } from "react-router-dom";
import { FaBriefcase, FaCheckCircle, FaBookmark, FaUser } from "react-icons/fa";

const BOXES = [
  { label: "Jobs", icon: <FaBriefcase /> },
  { label: "Applied", icon: <FaCheckCircle />, path: "/applied" },
  { label: "Saved", icon: <FaBookmark />, path: "/saved" },
  { label: "Profile", icon: <FaUser />, path: "/profile" }
];

function JobsTitleNav() {
  return (
    <div className="flex gap-6 justify-center my-20">
      {BOXES.map(box => (
        <NavLink
          key={box.path}
          to={box.path}
          className={({ isActive }) =>
            `flex gap-5 items-center justify-center w-56 h-18 rounded-xl border shadow cursor-pointer transition duration-200 font-semibold text-lg 
             ${isActive ? "scale-105 bg-indigo-500 text-white border-none" : "text-gray-900 border border-black hover:bg-indigo-500 hover:text-white hover:scale-105"}`
          }
          end
        >
          <span className="mb-2 text-2xl">{box.icon}</span>
          <span>{box.label}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default JobsTitleNav;
