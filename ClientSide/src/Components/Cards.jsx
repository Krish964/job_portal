import React, { useState } from "react";
import { FaBuilding, FaMoneyBill, FaSuitcase } from "react-icons/fa";
import { toast } from "react-toastify";

function JobCard({ job }) {
  const username = localStorage.getItem("username");
  const resumeUrl = localStorage.getItem("resume");
  const payload = { ...job, username, resumeUrl };
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    if (applied || loading) return; // prevent multiple submits
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/users/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      await res.json();
      setApplied(true);
      toast.success("Your application has been submitted! 🎉", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (err) {
      toast.error("Error occurred: " + err.message, {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="max-w-2xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between
        bg-gray-900/70 border border-gray-700 rounded-xl shadow-md backdrop-blur-md p-6 my-5
        hover:shadow-lg hover:shadow-cyan-700/50 transition-shadow duration-300 group"
    >
      {/* Left: Job Details */}
      <div className="flex flex-col flex-1 space-y-2 mb-4 sm:mb-0">
        <h2 className="text-2xl font-semibold text-cyan-300 truncate select-none">
          {job.title}
        </h2>
        <div className="flex items-center gap-2 text-gray-400">
          <FaBuilding className="text-cyan-500" />
          <span className="font-medium">{job.company}</span>
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          {/* Salary */}
          <span className="flex items-center gap-2 bg-gray-800 text-gray-300 rounded-md px-3 py-1 text-sm font-medium border border-gray-700">
            <FaMoneyBill className="text-green-400" />
            {job.sallary}
          </span>
          {/* Job type */}
          <span
            className={`flex items-center gap-2 px-4 py-1 rounded-md text-xs font-semibold border ${job.job_type === "Full-time"
                ? "border-green-600 text-green-400 bg-green-900/20"
                : "border-yellow-600 text-yellow-400 bg-yellow-900/20"
              }`}
          >
            <FaSuitcase />
            {job.job_type}
          </span>
        </div>
      </div>

      {/* Right: Apply Button */}
      <button
        onClick={sendRequest}
        disabled={applied || loading}
        className={`w-full sm:w-auto ml-auto rounded-lg px-6 py-3 text-white font-semibold shadow
          bg-blue-800 border border-blue-700 transition-transform duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-400
          ${applied
            ? "opacity-60 cursor-not-allowed bg-gray-700 border-gray-600"
            : "hover:scale-105 hover:bg-blue-700"
          }`}
      >
        {applied ? "Applied" : loading ? "Applying..." : "Apply Now"}
      </button>
    </div>
  );
}

export default JobCard;
