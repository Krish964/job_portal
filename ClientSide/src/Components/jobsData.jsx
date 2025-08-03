import React, { useState, useEffect } from "react";
import JobCard from "./Cards"; // ensure correct import
import JobDetail from "./JobFullDetail"; // ensure correct import

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
        console.log("Jobs fetched from API:", jobsData);
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

  console.log("Currently selected job:", selectedJob);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!jobs.length)
    return <p className="text-center mt-10 text-gray-400">No jobs available</p>;

  return (
    <div className=" flex bg-gray-900 text-white">
      {/* Left Panel (Jobs List) */}
      <div
        className="w-1/3 border-r border-gray-700 overflow-y-auto"
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

      {/* Right Panel (Selected Job Detail) */}
      <div
        className="flex-1 p-2 overflow-y-auto bg-gray-800  text-white"
        style={{ height: "100vh" }}
      >
        {selectedJob ? (
          <JobDetail job={selectedJob} />
        ) : (
          <p className="text-gray-400">Select a job to see details</p>
        )}
      </div>
    </div>
  );
}

export default Jobs;
