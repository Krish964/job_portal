import React, { useState, useEffect } from "react";
import JobCard from "./Cards"; // Ensure this path is correct
import JobDetail from "./JobFullDetail"; // Ensure this path is correct
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);

  // Handler for pagination change - activate loading immediately
  const handleChange = (event, value) => {
    setLoading(true);
    setPage(value);
  };

  useEffect(() => {
    setError(null); // Reset errors on page change
    fetch(
      `https://api.joinrise.io/api/v1/jobs/public?page=${page}&limit=20&sort=desc&sortedBy=createdAt&jobLoc=`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
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
  }, [page]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">Loading...</p>
    );
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!jobs.length)
    return (
      <p className="text-center mt-10 text-gray-400">No jobs available</p>
    );

  return (
    <>
      {/* Inline CSS for custom scrollbar */}
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

      <div className="flex h-[100vh] text-white">
        {/* Left Panel - Job List */}
        <div
          className="w-1/3  border-r border-gray-700 overflow-y-auto custom-scrollbar"
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

      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", mt: 5 }}
        spacing={2}
      >
        <Typography>Page: {page}</Typography>
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff", // Text white
              borderColor: "#0ff", // Neon cyan border
            },
            "& .Mui-selected": {
              color: "#0ff", // Neon selected text
              borderColor: "#0ff",
              backgroundColor: "#111", // Dark background for contrast
              boxShadow: "0 0 8px 2px #0ff", // Neon glow
            },
          }}
          count={10}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}

export default Jobs;
