import React from "react";

function HRTable({ jobs, onSucceed }) {
  if (!Array.isArray(jobs)) jobs = [];

  return (
    <div className="overflow-x-auto rounded-2xl bg-green-900 shadow-lg border border-green-700 mt-4">
      <table className="min-w-full border-separate border-spacing-y-2 text-left">
        <thead className="bg-green-800 text-teal-200 text-base select-none">
          <tr>
            <th className="px-6 py-3 rounded-tl-2xl">User</th>
            <th className="px-6 py-3">Job Title</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Salary</th>
            <th className="px-6 py-3">Job Type</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3 rounded-tr-2xl">Applied On</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((app, idx) => (
            <tr
              key={app._id || idx}
              className="bg-green-800 hover:bg-green-700 transition-all duration-200 text-teal-100"
              style={{ height: "72px" }}
            >
              <td className="px-6 py-3 font-bold">{app.username || "Unknown User"}</td>
              <td className="px-6 py-3">{app.title || "N/A"}</td>
              <td className="px-6 py-3">{app.companyName || app.company || "N/A"}</td>
              <td className="px-6 py-3">
                {app.salaryRangeMinYearly
                  ? `$${app.salaryRangeMinYearly.toLocaleString()}`
                  : "N/A"}
              </td>
              <td className="px-6 py-3">{app.type || "N/A"}</td>
              <td className="px-6 py-3 truncate max-w-[180px]" title={app.email || "N/A"}>
                {app.email || "N/A"}
              </td>
              <td className="px-6 py-3">
                {app.createdAt
                  ? new Date(app.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  : "N/A"}
              </td>
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => onSucceed && onSucceed(app)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-1 rounded-md transition"
                  title="Mark as Succeeded"
                >
                  Succeed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HRTable;
