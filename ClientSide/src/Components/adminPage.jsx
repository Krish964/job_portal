import React, { useEffect, useState } from "react";
import { MainPageNavbar, Footer } from "./index";
import JobTableList from "./AdminTable"; // Make sure this path is correct

function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8000/api/users/applyJobs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch applications: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setApplications(data.applications || []); // Always fallback to []
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MainPageNavbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-900 py-12 px-6 md:px-16 text-cyan-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 select-none drop-shadow-lg">
          Admin Dashboard Panel
        </h1>

        {loading && (
          <p className="text-center text-cyan-400 text-lg animate-pulse">Loading applications...</p>
        )}
        {error && (
          <p className="text-center text-red-500 text-lg font-semibold">
            Error loading applications: {error}
          </p>
        )}
        {!loading && !error && applications.length === 0 && (
          <p className="text-center text-cyan-400 text-lg font-medium">No applications found.</p>
        )}
        {!loading && !error && (
          <JobTableList jobs={applications} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default AdminPage;
