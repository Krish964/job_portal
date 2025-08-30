import React, { useState } from 'react';
import { FaBuilding, FaMoneyBill, FaMapMarkerAlt, FaClock, FaStar, FaDollarSign, FaGraduationCap, FaLaptop } from 'react-icons/fa';
import { toast } from 'react-toastify';

function JobFullDetail({ job }) {
  const companyImage = job.owner?.benifits?.photo;

  const username = localStorage.getItem("username");
  const resumeUrl = localStorage.getItem("resume");
  const email = localStorage.getItem("email");
  const payload = { ...job, username, resumeUrl, email };

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function sendRequest() {
    if (applied || loading) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/users/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      await res.json();
      setApplied(true);
      toast.success("Your application has been submitted! 🎉", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } catch (err) {
      toast.error("Error occurred: " + err.message, {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

  function toggleSave() {
    setSaved(!saved);
    toast.info(saved ? "Removed from saved jobs" : "Job saved", {
      position: "top-right",
      autoClose: 1500,
      theme: "light",
    });
  }

  return (
    <div className="p-6 bg-white rounded-xl max-w-4xl w-full mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h2>
          <div className="flex items-center mt-2 gap-2">
            <FaBuilding className="text-gray-500" />
            <h3 className="text-xl font-semibold text-gray-800">{job.companyName || job.owner?.companyName}</h3>
          </div>
        </div>
        {companyImage && (
          <img
            src={companyImage}
            alt="Company Logo"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 shadow"
            style={{ background: "#fafafa" }}
          />
        )}
        <div className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-semibold mt-4 md:mt-0 self-start">
          {job.type || job.employmentType || "Hybrid"}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-400 mr-3" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Location:</span> {job.locationAddress || "Remote"}
          </p>
        </div>
        <div className="flex items-center">
          <FaClock className="text-gray-400 mr-3" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Employment Type:</span> {job.employmentType || job.type || "Full-time"}
          </p>
        </div>
        <div className="flex items-center">
          <FaDollarSign className="text-gray-400 mr-3" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Salary:</span>{" "}
            {job.salaryRangeMinYearly && job.salaryRangeMaxYearly
              ? ` $${job.salaryRangeMinYearly.toLocaleString()} - $${job.salaryRangeMaxYearly.toLocaleString()}`
              : " Salary not disclosed"}
          </p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-500 mr-3" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Rating:</span> {job.rating || "4.2"}
          </p>
        </div>
        <div className="flex items-center">
          <FaLaptop className="text-gray-400 mr-3" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Work Model:</span> {job.workModel || "Remote"}
          </p>
        </div>
        <div className="flex items-center">
          <FaGraduationCap className="text-gray-400 mr-3" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Seniority:</span> {job.seniority || "Mid-Level"}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <h4 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h4>
        <p className="text-gray-700 whitespace-pre-wrap">{job.descriptionBreakdown?.oneSentenceJobSummary || "No description available."}</p>
      </div>

      <div className="mt-7">
        <h4 className="text-xl font-semibold text-gray-900 mb-3">Responsibilities</h4>
        <ul className="list-disc list-inside text-gray-700">
          {job.skills_suggest?.length > 0
            ? job.skills_suggest.map((res, idx) => <li key={idx}>{res}</li>)
            : <li>No responsibilities listed.</li>}
        </ul>
      </div>

      <div className="mt-7">
        <h4 className="text-xl font-semibold text-gray-900 mb-3">Skills Required</h4>
        <ul className="list-disc list-inside text-gray-700">
          {job.skillRequirements?.length > 0
            ? job.skillRequirements.map((skill, idx) => <li key={idx}>{skill}</li>)
            : <li>No skills listed.</li>}
        </ul>
      </div>

      <div className="mt-7">
        <h4 className="text-xl font-semibold text-gray-900 mb-3">Keywords</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.keywords?.length > 0
            ? job.keywords.map((keyword, idx) => (
              <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                {keyword}
              </span>
            ))
            : <span className="text-gray-500">No keywords found.</span>}
        </div>
      </div>

      <div className="mt-7">
        <h4 className="text-xl font-semibold text-gray-900 mb-3">About the Company</h4>
        <p className="text-gray-700 whitespace-pre-wrap">
          {(job.companyName || job.owner?.companyName) || "This company"} is a leading company in its sector, dedicated to innovation and excellence.
          Located in {job.locationAddress || "multiple locations"}, we pride ourselves on fostering a collaborative and dynamic work environment.
          Our team of {job.teamSize || "50"} professionals is committed to delivering top-notch solutions and driving growth.
        </p>
      </div>

      {/* Apply and Save buttons */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={sendRequest}
          disabled={applied || loading}
          className={`flex-1 px-6 py-3 rounded-xl font-bold text-white transition ${applied
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-800 hover:bg-green-700"
            }`}
        >
          {applied ? "Applied" : loading ? "Applying..." : "Apply"}
        </button>
        <button
          onClick={toggleSave}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition ${saved ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
        >
          {saved ? "Remove" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default JobFullDetail;
