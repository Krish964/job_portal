import React from 'react';
import { FaBuilding, FaMoneyBill, FaMapMarkerAlt, FaClock, FaStar, FaDollarSign, FaUsers, FaGraduationCap, FaLaptop } from 'react-icons/fa';

function JobFullDetail({ job }) {
  // Company image logic
  const companyImage = job.owner?.benifits?.photo;

  return (
    <div className="p-4 bg-white rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
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
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold mt-3 md:mt-0 align-top">
          {job.type || job.employmentType || "Hybrid"}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Location:</span> {job.locationAddress || "Remote"}
          </p>
        </div>
        <div className="flex items-center">
          <FaClock className="text-gray-400 mr-2" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Employment Type:</span> {job.employmentType || job.type || "Full-time"}
          </p>
        </div>
        <div className="flex items-center">
          <FaDollarSign className="text-gray-400 mr-2" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Salary:</span>
            {job.salaryRangeMinYearly && job.salaryRangeMaxYearly
              ? ` $${job.salaryRangeMinYearly.toLocaleString()} - $${job.salaryRangeMaxYearly.toLocaleString()}`
              : " Salary not disclosed"}
          </p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-500 mr-2" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Rating:</span> {job.rating || "4.2"}
          </p>
        </div>
        <div className="flex items-center">
          <FaLaptop className="text-gray-400 mr-2" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Work Model:</span> {job.workModel || "Remote"}
          </p>
        </div>
        <div className="flex items-center">
          <FaGraduationCap className="text-gray-400 mr-2" />
          <p className="text-gray-800">
            <span className="font-semibold text-gray-700">Seniority:</span> {job.seniority || "Mid-Level"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h4>
        <p className="text-gray-700 mt-1">
          {job.descriptionBreakdown?.oneSentenceJobSummary || "No description available."}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Responsibilities</h4>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {job.skills_suggest?.length > 0
            ? job.skills_suggest.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))
            : <li>No responsibilities listed.</li>}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Skills Required</h4>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {job.skillRequirements?.length > 0
            ? job.skillRequirements.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))
            : <li>No skills listed.</li>}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Keywords</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.keywords?.length > 0
            ? job.keywords.map((keyword, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{keyword}</span>
            ))
            : <span className="text-gray-500">No keywords found.</span>}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">About the Company</h4>
        <p className="text-gray-700 mt-1">
          {(job.companyName || job.owner?.companyName) || "This company"} is a leading company in its sector, dedicated to innovation and excellence.
          Located in {job.locationAddress || "multiple locations"}, we pride ourselves on fostering a collaborative and dynamic work environment.
          Our team of {job.teamSize || "50"} professionals is committed to delivering top-notch solutions and driving growth.
        </p>
      </div>
    </div>
  );
}

export default JobFullDetail;
