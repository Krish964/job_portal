import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [recruiter , setRecruiter] = useState()
  useEffect(() => {
    const getrecruiterData = async () => {
      const response = await fetch("http://localhost:8000/api/users/getRecruiterData", {
        method: "get",
        credentials : "include"
      })
 
      const data = await response.json()
      if (response.ok) {
        setRecruiter(data.recruiter)
        
      }
    }

    getrecruiterData()
  }, [isOpen])
  


  return (
    // Modal Overlay
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xl bg-opacity-40 z-50">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-indigo-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Avatar */}
        <img
          src={recruiter?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(recruiter?.name || "Recruiter")}`}
          alt="Recruiter Avatar"
          className="w-24 h-24 rounded-full border-2 border-indigo-200 mb-4"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(recruiter?.name || "Recruiter")}`;
          }}
        />

        {/* Name */}
        <h3 className="text-xl font-bold text-indigo-700 mb-2">{recruiter?.name || "Recruiter Name"}</h3>
        {/* Email */}
        <p className="text-sm text-gray-500 mb-2">{recruiter?.email || "Email@example.com"}</p>
        {/* Additional Info */}
        <div className="w-full mt-4 space-y-1">
          {/* Add more fields if needed */}
        </div>
        {/* Edit Button (Optional) */}
        <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
