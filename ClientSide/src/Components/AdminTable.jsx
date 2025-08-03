import React from "react";
import { FaBuilding, FaSuitcase, FaMoneyBill } from "react-icons/fa";

function JobTableList({ jobs, onEdit }) {
  if (!Array.isArray(jobs)) jobs = [];

  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-900 shadow-lg border border-gray-800 mt-4">
      <table className="min-w-full border-separate border-spacing-y-2 text-left">
        <thead className="bg-gray-800 text-cyan-300 text-base select-none">
          <tr>
            <th className="px-6 py-3 rounded-tl-2xl">User</th>
            <th className="px-6 py-3">Job Title</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Salary</th>
            <th className="px-6 py-3">Job Type</th>
            <th className="px-6 py-3">Email</th> {/* Changed from Status to Email */}
            <th className="px-6 py-3 rounded-tr-2xl">Applied On</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((app, idx) => (
            <tr
              key={app._id || idx}
              className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 text-cyan-100"
              style={{ height: "72px" }}
            >
              {/* User */}
              <td className="px-6 py-3 font-bold">{app.username || "Unknown User"}</td>
              {/* Job Title */}
              <td className="px-6 py-3">{app.title || "N/A"}</td>
              {/* Company */}
              <td className="px-6 py-3">{app.companyName || app.company || "N/A"}</td>
              {/* Salary */}
              <td className="px-6 py-3">
                {app.salaryRangeMinYearly
                  ? `$${app.salaryRangeMinYearly.toLocaleString()}`
                  : "N/A"}
              </td>
              {/* Job Type */}
              <td className="px-6 py-3">{app.type || "N/A"}</td>
              {/* Email Column (replacing Status) */}
              <td className="px-6 py-3 truncate max-w-[180px]" title={app.email || "N/A"}>
                {app.email || "N/A"}
              </td>
              {/* Applied On */}
              <td className="px-6 py-3">
                {app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  : "N/A"}
              </td>
              {/* Action - Edit Button */}
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => onEdit && onEdit(app)}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-1 rounded-md transition"
                  title="Edit Application"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTableList;
