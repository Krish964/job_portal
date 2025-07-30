import React from "react";

function JobCard({ job }) {
  return (
    <div className="max-w-2xl w-full mx-auto flex items-center justify-between bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-100 px-6 py-5 transition duration-200 cursor-pointer">
      {/* Left: Job info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h2>
        <div className="text-base text-gray-700 mb-1">{job.company}</div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <span className="bg-gray-100 rounded px-3 py-1">Package: {job.package}</span>
          <span className={`px-3 py-1 rounded ${job.job_type === "Full-time"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"}`}>
            {job.job_type}
          </span>
        </div>
      </div>

      {/* Right: Apply button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 text-base font-semibold transition">
        Apply Now
      </button>
    </div>
  );
}

export default JobCard;
