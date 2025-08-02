import React, { useEffect, useState } from "react";
import { MainPageNavbar, Footer } from "./index";

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
        // Access the correct property from the backend response
        setApplications(data.applications || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setError(error.message);
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
          <p className="text-center text-cyan-400 text-lg animate-pulse">
            Loading applications...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 text-lg font-semibold">
            Error loading applications: {error}
          </p>
        )}

        {!loading && !error && applications.length === 0 && (
          <p className="text-center text-cyan-400 text-lg font-medium">
            No applications found.
          </p>
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-black/70 rounded-2xl border border-cyan-700 shadow-lg p-6 hover:shadow-cyan-500 transition-shadow duration-300 flex flex-col justify-between"
              >
                {/* User Info */}
                <div className="mb-5">
                  <h2 className="text-xl font-semibold text-cyan-300 truncate">
                    {app.username || "Unknown User"}
                  </h2>
                  <p className="text-sm text-cyan-400 truncate">
                    {app.email || "No email provided"}
                  </p>
                </div>

                {/* Job Details */}
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Job Title: </span>
                    <span className="text-cyan-200">
                      {app.title || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Company: </span>
                    <span className="text-cyan-200">{app.company || "N/A"}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Resume: </span>
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 underline hover:text-cyan-200 truncate block max-w-full"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Status: </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${app.status === "pending"
                          ? "bg-yellow-300 text-yellow-800"
                          : app.status === "accepted"
                            ? "bg-green-300 text-green-800"
                            : "bg-red-300 text-red-800"
                        }`}
                    >
                      {app.status || "N/A"}
                    </span>
                  </div>
                  <div className="text-sm text-cyan-400 mt-2 font-mono">
                    Applied on:{" "}
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "N/A"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AdminPage;
