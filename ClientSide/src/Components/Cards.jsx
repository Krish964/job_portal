import React, { useState } from "react";
import { FaBuilding, FaMoneyBill, FaSuitcase, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

function JobCard({ job, onClick, isSelected }) {
  const username = localStorage.getItem("username");
  const resumeUrl = localStorage.getItem("resume");
  const email = localStorage.getItem("email");
  const payload = { ...job, username, resumeUrl, email };

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function sendRequest(e) {
    e.stopPropagation();
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
        theme: "light",
      });
    } catch (err) {
      toast.error("Error occurred: " + err.message, {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  function toggleSave(e) {
    e.stopPropagation();
    setSaved(!saved);
    toast.info(saved ? "Removed from saved jobs" : "Job saved", {
      position: "top-right",
      autoClose: 1500,
      theme: "light",
    });
  }

  const getJobTypeBadgeClass = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "bg-green-100 border-green-400 text-green-700";
      case "part-time":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      case "hybrid":
      case "hybrid full-time":
      case "hybrid/full-time":
      case "hybrid full time":
        return "bg-orange-100 border-orange-400 text-orange-700";
      default:
        return "bg-gray-200 border-gray-400 text-gray-600";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white shadow border border-gray-300 flex flex-col justify-between p-5 transition cursor-pointer rounded-xl
        ${isSelected ? "border-black shadow-lg scale-105" : "hover:border-gray-600 hover:scale-[1.03]"}
      `}
      style={{
        minHeight: "170px",
        width: "100%", // Full width of container
        margin: "12px 0",
        boxSizing: "border-box",
      }}
    >
      {/* Card Top: Title + Badge */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-900 font-bold text-lg truncate">{job.title}</h3>
        <span
          className={`text-xs font-semibold uppercase px-3 py-1 rounded border whitespace-nowrap ${getJobTypeBadgeClass(
            job.type
          )}`}
        >
          {job.type || job.employmentType || "N/A"}
        </span>
      </div>

      {/* Job Info Block */}
      <div className="flex flex-wrap text-gray-700 text-sm gap-x-6 gap-y-2 mb-3">
        <span className="flex items-center gap-1 truncate">
          <FaBuilding className="text-gray-500" />
          <span title={job.owner?.companyName || "Unknown Company"}>
            {job.owner?.companyName || "Unknown Company"}
          </span>
        </span>
        <span className="flex items-center gap-1 truncate">
          <FaSuitcase />
          <span title={job.department || "Department not specified"}>
            {job.department || "N/A"}
          </span>
        </span>
        <span className="flex items-center gap-1 truncate">
          <FaMoneyBill className="text-green-500" />
          <span>
            {job.descriptionBreakdown?.salaryRangeMinYearly &&
              job.descriptionBreakdown?.salaryRangeMaxYearly ? (
              <span className="text-gray-900 font-medium">
                ${job.descriptionBreakdown.salaryRangeMinYearly.toLocaleString()} - $
                {job.descriptionBreakdown.salaryRangeMaxYearly.toLocaleString()}
              </span>
            ) : (
              <span className="text-gray-500 italic">Salary not disclosed</span>
            )}
          </span>
        </span>
        {job.rating != null && (
          <span className="flex items-center gap-1 text-yellow-500 font-semibold">
            <FaStar /> {job.rating.toFixed(1)}
          </span>
        )}
        <span className="truncate text-gray-600" title={job.locationAddress || "Location not specified"}>
          {job.locationAddress || "Location not specified"}
        </span>
      </div>

      {/* Short Description */}
      {job.descriptionBreakdown?.oneSentenceJobSummary && (
        <p
          className="text-gray-700 text-sm mt-2 mb-4 line-clamp-2"
          title={job.descriptionBreakdown.oneSentenceJobSummary}
        >
          {job.descriptionBreakdown.oneSentenceJobSummary}
        </p>
      )}

      {/* Card Footer: Apply Button + Save Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={sendRequest}
          disabled={applied || loading}
          className={`px-6 py-2 rounded font-bold text-sm border transition-colors focus:outline-none ${applied
              ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
              : "bg-green-800 text-white border-black hover:bg-white hover:text-black"
            }`}
          style={{ minWidth: 110 }}
        >
          {applied ? "Applied" : loading ? "Applying..." : "Apply"}
        </button>

        {/* Save/Remove Button */}
        <button
          onClick={toggleSave}
          className={`ml-3 px-4 py-2 rounded font-semibold border transition-colors focus:outline-none ${saved ? "bg-black text-white border-black hover:bg-gray-800" : "bg-white text-black border-gray-400 hover:bg-gray-100"
            }`}
          title={saved ? "Remove from saved jobs" : "Save job"}
          aria-label={saved ? "Remove from saved jobs" : "Save job"}
          style={{ minWidth: 110 }}
        >
          {saved ? "Remove" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
