import React, { useState, useEffect } from "react";
import JobCard from "./Cards"; // Ensure this path is correct
import JobDetail from "./JobFullDetail"; // Ensure this path is correct
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import JobsTitle from "./JobsTitle"
import JobsFilterSidebar from "./Filter";
import JobsTitleNav from "./Bookmarks";
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
      <style>{`
  /* Webkit scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(50, 50, 50, 0.7); /* Dark gray/black */
    border-radius: 3px;
    transition: background-color 0.3s;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(80, 80, 80, 0.9);
  }
  /* Firefox scrollbar */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(50, 50, 50, 0.7) transparent;
  }
  .custom-scrollbar:hover {
    scrollbar-color: rgba(80, 80, 80, 0.9) transparent;
  }
`}</style>



      {/* <div className="title flex flex-wrap gap-8 justify-center items-center my-15 bg-white p-8 rounded-xl">
        {
          jobs.slice(0, 8).map((job) => (
            <JobsTitle job={job} key={job._id} />
          ))
        }
      </div> */}



      <JobsTitleNav />

      {/* Jobs Header */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-gray-800 font-mono mt-20 mb-12 select-none drop-shadow-lg">
          Jobs You Might Be Interested In
        </h2>
      </section>

      <div className="flex h-[100vh] gap-3">

        <JobsFilterSidebar />

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
          className="flex-1 p-6 overflow-y-auto bg-white rounded-lg text-white "
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
        <Typography style={{ color: 'black', fontWeight: '', fontSize: '20px' }}>Page: {page}</Typography>
        <Pagination
          sx={{
            backgroundColor: "#000", // black background
            borderRadius: "8px",
            padding: "13px 19px",
            "& .MuiPaginationItem-root": {
              color: "#fff",  // white text
              borderColor: "#555", // subtle border grey
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "#333",  // hover gray bg
                color: "#fff",
              }
            },
            "& .Mui-selected": {
              backgroundColor: "#222 !important", // dark gray bg for selected
              color: "#fff",
              borderColor: "#888",
              boxShadow: "0 0 6px 2px rgba(255,255,255,0.3)",  // white glow effect
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
