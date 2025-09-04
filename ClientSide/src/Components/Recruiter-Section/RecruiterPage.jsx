import React, { useState } from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import RecruiterNavbar from "./RecruiterNavBar";

function RecruiterPage() {
  const navigate = useNavigate();

  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  // Dummy applied users data
  const appliedUsers = [
    { id: 1, name: "Amit Kumar", email: "amit@example.com" },
    { id: 2, name: "Neha Sharma", email: "neha@example.com" },
    { id: 3, name: "Rohit Singh", email: "rohit@example.com" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Job Posted:\n${jobTitle}\n${jobDescription}\n${location}\n${salaryRange}`);
    setJobTitle("");
    setJobDescription("");
    setLocation("");
    setSalaryRange("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
 <RecruiterNavbar/>

      <div className="flex flex-col md:flex-row p-8 gap-12 flex-grow">
        {/* Job Posting Form */}
        <div className="flex-1 bg-gray-100 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold mb-8 border-b border-gray-400 pb-3">
            Post Your Job
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="font-semibold tracking-wide">Job Title</label>
            <input
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
              className="rounded-lg border border-gray-600 bg-white px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <label className="font-semibold tracking-wide">Job Description</label>
            <textarea
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Write job description"
              rows={5}
              className="rounded-lg border border-gray-600 bg-white px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>

            <label className="font-semibold tracking-wide">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Job location"
              className="rounded-lg border border-gray-600 bg-white px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <label className="font-semibold tracking-wide">Salary Range</label>
            <input
              type="text"
              required
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
              placeholder="Eg. 30k - 50k per month"
              className="rounded-lg border border-gray-600 bg-white px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="mt-6 bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-900 transition"
            >
              Post Job
            </button>
          </form>
        </div>

        {/* Applied Users Section */}
        <div className="md:w-1/3 bg-gray-100 rounded-xl shadow-lg p-8 flex flex-col">
          <h2 className="text-2xl font-extrabold mb-6 border-b border-gray-400 pb-2">
            Users Applied
          </h2>
          {appliedUsers.length === 0 ? (
            <p className="text-gray-600 italic">No applicants yet.</p>
          ) : (
            <ul className="divide-y divide-gray-400 overflow-y-auto max-h-72">
              {appliedUsers.map((user) => (
                <li key={user.id} className="py-4">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-gray-700 text-sm">{user.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Explore Jobs Button */}
      <div className="bg-gray-50 border-t border-gray-300 p-8 flex justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold mb-4">Want to Explore Jobs?</h2>
          <button
            onClick={() => navigate("/mainpage")}
            className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 shadow-lg transition"
          >
            View Jobs Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RecruiterPage;
