import React, { useState, useEffect } from "react";
import JobCard from "./Cards";   // Ensure this path correct hai
import JobDetail from "./JobFullDetail"; // Ensure correct import

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.joinrise.io/api/v1/jobs/public?page=1&limit=20&sort=desc&sortedBy=createdAt&jobLoc="
    )
      .then((res) => res.json())
      .then((data) => {
        const jobsData = data.result?.jobs || [];
        setJobs(jobsData);
        setSelectedJob(jobsData[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch jobs");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!jobs.length)
    return <p className="text-center mt-10 text-gray-400">No jobs available</p>;

  return (
    <>
      {/* Inline CSS for custom modern scrollbar (can move to global CSS) */}
      <style>{`
        /* Webkit scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(100, 255, 218, 0.3);
          border-radius: 3px;
          transition: background-color 0.3s;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(100, 255, 218, 0.7);
        }
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 255, 218, 0.3) transparent;
        }
        .custom-scrollbar:hover {
          scrollbar-color: rgba(100, 255, 218, 0.7) transparent;
        }
      `}</style>

      <div className="flex h-screen bg-gray-900 text-white">
        {/* Left Panel - Job List */}
        <div
          className="w-1/3 border-r border-gray-700 overflow-y-auto custom-scrollbar"
          style={{ height: "100vh" }}
        >
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onClick={() => setSelectedJob(job)}
              isSelected={selectedJob?._id === job._id}
            />
          ))}
        </div>

        {/* Right Panel - Job Details */}
        <div
          className="flex-1 p-6 overflow-y-auto bg-gray-800 text-white custom-scrollbar"
          style={{ height: "100vh" }}
        >
          {selectedJob ? (
            <JobDetail job={selectedJob} />
          ) : (
            <p className="text-gray-400">Select a job to see details</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Jobs;
