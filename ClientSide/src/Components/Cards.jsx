import React, { useState } from "react";
import { FaBuilding, FaMoneyBill, FaSuitcase, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

function JobCard({ job, onClick, isSelected }) {
  const username = localStorage.getItem("username");
  const resumeUrl = localStorage.getItem("resume");
  const payload = { ...job, username, resumeUrl };

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function sendRequest(e) {
    e.stopPropagation(); // Prevent triggering parent's onClick
    if (applied || loading) return;
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
      onClick={onClick}
      className={`flex items-center justify-between w-full py-5 px-4 transition cursor-pointer rounded-md
        ${isSelected
          ? "bg-gray-800 border border-cyan-400 shadow-lg"
          : "hover:bg-gray-800/40"
        }
      `}
      style={{ minHeight: "80px" }}
    >
      {/* Left Section */}
      <div className="flex flex-col flex-1 min-w-0 pr-4">
        {/* Job Title and Employment Type */}
        <div className="flex items-center gap-3">
          <h3 className="truncate text-cyan-400 font-semibold text-lg">{job.title}</h3>
          <span
            className={`text-xs font-semibold uppercase px-2 py-0.5 rounded-full border
              ${job.type === "Full-time"
                ? "bg-green-900 border-green-500 text-green-400"
                : job.type === "Part-time"
                  ? "bg-yellow-900 border-yellow-500 text-yellow-400"
                  : "bg-gray-700 border-gray-600 text-gray-400"
              }
            `}
          >
            {job.type || (job.employmentType || "N/A")}
          </span>
        </div>

        {/* Company, Department and Location */}
        <div className="flex flex-wrap text-gray-400 text-xs mt-1 gap-x-4 gap-y-1">
          <span className="flex items-center gap-1 truncate max-w-[45%]">
            <FaBuilding className="text-cyan-500" />
            <span title={job.companyName}>{job.companyName || "Unknown Company"}</span>
          </span>

          <span className="flex items-center gap-1 truncate max-w-[35%]">
            <FaSuitcase />
            <span title={job.department || "Department not specified"}>
              {job.department || "N/A"}
            </span>
          </span>

          <span className="flex items-center gap-1 truncate max-w-[35%]">
            <FaMoneyBill className="text-green-400" />
            <span>
              {job.salaryRangeMinYearly && job.salaryRangeMaxYearly
                ? `$${job.salaryRangeMinYearly.toLocaleString()} - $${job.salaryRangeMaxYearly.toLocaleString()}`
                : "Salary not disclosed"}
            </span>
          </span>
        </div>

        {/* Location & Rating */}
        <div className="mt-1 flex items-center gap-4 text-gray-500 text-xs">
          <span className="truncate max-w-[70%]">{job.locationAddress || "Location not specified"}</span>
          {job.rating != null && (
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              <FaStar /> {job.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Short summary / description */}
        {job.descriptionBreakdown?.oneSentenceJobSummary && (
          <p className="mt-2 text-gray-300 text-sm line-clamp-2" title={job.descriptionBreakdown.oneSentenceJobSummary}>
            {job.descriptionBreakdown.oneSentenceJobSummary}
          </p>  
        )}
      </div>

      {/* Right Section: Apply Button */}
      <button
        onClick={sendRequest}
        disabled={applied || loading}
        className={`ml-3 px-5 py-2 rounded-md font-semibold text-sm shadow-md transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-400
          ${applied
            ? "bg-gray-600 text-gray-400 cursor-not-allowed border border-gray-600"
            : "bg-cyan-600 text-white hover:bg-cyan-700 border border-cyan-700"
          }
        `}
        style={{ minWidth: "110px" }}
      >
        {applied ? "Applied" : loading ? "Applying..." : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
