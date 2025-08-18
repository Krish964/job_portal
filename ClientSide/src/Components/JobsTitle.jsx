import React from "react";
import { FaBuilding } from "react-icons/fa";

function JobsTitle({ job }) {
  if (!job) return <div>No Job Data</div>;

  const companyName = job.owner?.companyName || "Unknown Company";
  const shortName = companyName.length > 18 ? companyName.slice(0, 18) + "..." : companyName;

  return (
    <div
      className="flex items-center gap-3 cursor-pointer border-r-1 border-b-2 rounded-lg bg-gradient-to-tr bg-white shadow-md px-6 py-4 max-w-xs font-medium text-gray-900 select-none
        transition duration-300 ease-in-out
        hover:bg-black hover:text-white hover:scale-110 hover:border-transparent"
      title={companyName}
      style={{ userSelect: "none" }}
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-700 text-white shadow">
        <FaBuilding size={22} />
      </span>
      <span className="flex-1 text-center">
        {shortName}
      </span>
    </div>
  );
}

export default JobsTitle;
