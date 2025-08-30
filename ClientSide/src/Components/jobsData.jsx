import React, { useState, useEffect } from "react";
import JobCard from "./Cards";
import JobDetail from "./JobFullDetail";
import JobsFilterSidebar from "./Filter";
import SearchForm from "./searchForm";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setError(null);
    setLoading(true);
    fetch(
      `https://api.joinrise.io/api/v1/jobs/public?page=${page}&limit=20&sort=desc&sortedBy=createdAt&jobLoc=`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const jobsData = data.result?.jobs || [];
        setJobs(jobsData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch jobs");
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const closeModal = () => setSelectedJob(null);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!jobs.length)
    return <p className="text-center mt-10 text-gray-400">No jobs available</p>;

  return (
    <>
      {/* Blur entire page content when modal is open */}
      <div className={`${selectedJob ? "filter blur-sm pointer-events-none" : ""}`}>
        <div className="flex h-[calc(100vh-80px)] gap-3 overflow-hidden">
          <JobsFilterSidebar />

          <div className="flex flex-col justify-center flex-1">
            <div className="secondNav my-7 px-4">
              <SearchForm />
            </div>

           

            <div
              
              className="overflow-y-auto custom-scrollbar border-r border-gray-700 px-4"
              style={{ flex: 1 }}
            >

              <div className="buttons flex gap-5">
                <button className='text-xl'>Browse All</button>
                <button className='text-xl'>Saved</button>
                <button className='text-xl'>Hidden</button>
              </div>
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onClick={() => setSelectedJob(job)}
                  isSelected={selectedJob?._id === job._id}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination below */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", mt: 4, mb: 4 }}
          spacing={2}
        >
          <Typography style={{ color: "black", fontSize: "20px" }}>
            Page: {page}
          </Typography>
          <Pagination
            sx={{
              backgroundColor: "#000",
              borderRadius: "8px",
              padding: "13px 19px",
              "& .MuiPaginationItem-root": {
                color: "#fff",
                borderColor: "#555",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#333",
                  color: "#fff",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#222 !important",
                color: "#fff",
                borderColor: "#888",
                boxShadow: "0 0 6px 2px rgba(255,255,255,0.3)",
              },
            }}
            count={10}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>

      {/* Modal with transparent dark background */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }} // slight dark transparent overlay
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-7xl w-full max-h-full overflow-y-auto p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-3xl font-bold"
              onClick={closeModal}
              aria-label="Close Details"
            >
              &times;
            </button>
            <JobDetail job={selectedJob} />
          </div>
        </div>
      )}
    </>
  );
}

export default Jobs;
