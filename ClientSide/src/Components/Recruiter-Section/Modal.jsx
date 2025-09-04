import React from "react";
import { NavLink } from "react-router-dom";

export default function RoleSelectModal({ open, onClose }) {
  if (!open) return null;

  // Replace with your LinkedIn values and redirect_uri!
  const handleLinkedInLogIn = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID, // Usually VITE_ prefixed for Vite
      redirect_uri: "http://localhost:8000/api/users/linkedInUrl", // put your redirect URI here
      scope: "openid profile email"
    });
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-2xl bg-opacity-60">
      <div className="bg-white flex flex-col justify-center rounded-xl shadow-2xl w-[90vw] h-[40vh] max-w-2xl p-8 relative border border-gray-200 transition-all">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600 text-3xl font-light"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Title and Subtitle */}
        <h2 className="text-2xl font-black text-black text-center mb-2 tracking-tight">
          Register or Login to Continue
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Select your role to get started
        </p>
        <div className="flex flex-col gap-6">
          {/* Job Seeker */}
          <NavLink
            to="/signup"
            className="
              flex items-center justify-center gap-3 py-3 px-4 w-full
              bg-black text-white rounded-lg font-bold
              hover:bg-indigo-600 hover:text-white shadow
              transition-all duration-200 ring-2 ring-transparent
              hover:ring-indigo-600 focus:outline-none
            "
            onClick={onClose}
          >
            <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" fill="white" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>
              Continue as <span className="font-semibold">Job Seeker</span>
            </span>
          </NavLink>
          {/* Recruiter */}
          <button
            onClick={handleLinkedInLogIn}
            className="
              flex items-center justify-center gap-3 py-3 px-4 w-full
              bg-white text-black border-2 border-gray-900 rounded-lg font-bold
              hover:bg-indigo-50 shadow
              transition-all duration-200 ring-2 ring-transparent
              hover:ring-indigo-600 focus:outline-none
            "
          >
            <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="3" fill="white" />
              <path d="M8 11h4m-2-2v6m0 4h.01" stroke="currentColor" />
            </svg>
            <span>
              Continue as <span className="font-semibold">Recruiter</span>
            </span>
            <span className="ml-2 bg-indigo-500 text-white px-2 py-0.5 rounded text-xs font-semibold shadow-sm">
              LinkedIn Only
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
