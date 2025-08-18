import React, { useEffect, useState } from "react";
import { MainPageNavbar, Footer } from "./index";
import HRTable from "./HRTable"; // Isko neeche banaenge

function HRPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8000/api/users/HrPage", {
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
        setApplications(data.applications || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  const handleSucceed = (app) => {
    const userId = localStorage.getItem("userId")
    console.log(userId)
   alert(`Succeed clicked for User: ${app.username}, Job: ${app.title}`);
    fetch("http://localhost:8000/api/users/notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        username: app.username,
        companyName: app.companyName
      }),
      
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to send notification');
      return res.json();
    })
  };

  return (
    <>
      <MainPageNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-teal-800 py-12 px-6 md:px-16 text-teal-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 select-none drop-shadow-teal">
          HR Dashboard Panel
        </h1>

        {loading && (
          <p className="text-center text-teal-400 text-lg animate-pulse">Loading applications...</p>
        )}
        {error && (
          <p className="text-center text-red-500 text-lg font-semibold">Error loading applications: {error}</p>
        )}
        {!loading && !error && applications.length === 0 && (
          <p className="text-center text-teal-400 text-lg font-medium">No applications found.</p>
        )}
        {!loading && !error && (
          <HRTable jobs={applications} onSucceed={handleSucceed} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default HRPage;
