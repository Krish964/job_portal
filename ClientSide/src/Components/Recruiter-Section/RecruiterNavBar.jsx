import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileModal from "./Profile";

function RecruiterNavbar() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);


  const handleLogout = () => {
    toast.success("Successfully logged out!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-white text-gray-900 px-8 py-4 shadow-md sticky top-0 z-50 border-b">
      {/* Site Title */}
      <div
        className="text-xl font-extrabold tracking-widest cursor-pointer text-indigo-700"
        onClick={() => navigate("/")}
      >
        JobPortal
      </div>

      {/* Center placeholder */}
      <div className="hidden md:flex space-x-12 font-semibold text-gray-600 text-lg select-none">
        <div className="cursor-default">Recruiter Dashboard</div>
      </div>

      {/* Right side: Profile + Logout */}
      <div className="flex items-center space-x-6">
        {/* Recruiter Profile Icon (opens modal, shows recruiter name) */}
        <div
          className="flex items-center cursor-pointer hover:text-indigo-700 transition"
          aria-label="Profile"
          title="Profile"
          onClick={() => setModalOpen(true)} // Only open modal, no navigation
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 rounded-full border-2 border-indigo-100 p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.923 13.923 0 0112 15c2.283 0 4.424.512 6.369 1.436M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {/* <span className="ml-2 sm:block font-semibold text-gray-900 select-none">{recruiter.name}</span> */}
        </div>
        <ProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-indigo-600 hover:bg-indigo-700 transition rounded-md px-4 py-2 font-semibold text-white select-none shadow"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default RecruiterNavbar;
