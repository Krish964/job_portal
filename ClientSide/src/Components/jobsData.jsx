import React from "react";
import { useState, useEffect } from "react";
import JobCard from "./Cards";
function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/job")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch jobs");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>

  );
}


export default Jobs;