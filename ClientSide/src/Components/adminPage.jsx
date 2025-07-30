import React, { useEffect, useState } from "react";
import { MainPageNavbar, Footer } from "./index";

function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/applyJobs")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data.detail || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MainPageNavbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-12">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Admin Dashboard Panel
        </h1>

        {loading ? (
          <p className="text-center text-gray-700">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-blue-800">
                    {app.user?.username || "Unknown User"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {app.user?.email || "No email provided"}
                  </p>
                </div>

                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Job Title:</span>{" "}
                  {app.job?.jobTitle || "N/A"}
                </div>

                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Company:</span>{" "}
                  {app.job?.company || "N/A"}
                </div>

                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Resume:</span>{" "}
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Download
                  </a>
                </div>

                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${app.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : app.status === "accepted"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  Applied on:{" "}
                  {new Date(app.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
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
