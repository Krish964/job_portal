import React from 'react';
import { FaBuilding, FaMoneyBill, FaMapMarkerAlt, FaClock, FaStar, FaDollarSign, FaUsers, FaBalanceScale, FaGraduationCap, FaLaptop, FaHandshake } from 'react-icons/fa';

function JobFullDetail({ job }) {
  return (
    <div className="p-3 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-cyan-400">{job.title}</h2>
          <div className="flex items-center mt-2">
            <FaBuilding className="text-cyan-500 mr-2" />
            <h3 className="text-xl font-semibold text-white">{job.companyName}</h3>
          </div>
        </div>
        <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg">
          <span className="font-semibold">{job.type || "Hybrid"}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          <p className="text-gray-300">
            <span className="font-semibold">Location:</span> {job.locationAddress || "Remote"}
          </p>
        </div>
        <div className="flex items-center">
          <FaClock className="text-gray-400 mr-2" />
          <p className="text-gray-300">
            <span className="font-semibold">Employment Type:</span> {job.employmentType || "Full-time"}
          </p>
        </div>
        <div className="flex items-center">
          <FaDollarSign className="text-gray-400 mr-2" />
          <p className="text-gray-300">
            <span className="font-semibold">Salary:</span>
            {job.salaryRangeMinYearly && job.salaryRangeMaxYearly
              ? `$${job.salaryRangeMinYearly.toLocaleString()} - $${job.salaryRangeMaxYearly.toLocaleString()}`
              : "Salary not disclosed"}
          </p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-2" />
          <p className="text-gray-300">
            <span className="font-semibold">Rating:</span> {job.rating || "4.2"}
          </p>
        </div>
        <div className="flex items-center">
          <FaLaptop className="text-gray-400 mr-2" />
          <p className="text-gray-300">
            <span className="font-semibold">Work Model:</span> {job.workModel || "Remote"}
          </p>
        </div>
        <div className="flex items-center">
          <FaGraduationCap className="text-gray-400 mr-2" />
          <p className="text-gray-300">
            <span className="font-semibold">Seniority:</span> {job.seniority || "Mid-Level"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-white">Job Description</h4>
        <p className="text-gray-300 mt-2">
          {job.descriptionBreakdown?.oneSentenceJobSummary || "No description available."}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-white">Responsibilities</h4>
        <ul className="list-disc list-inside mt-2 text-gray-300">
          {job.skills_suggest?.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          )) || <li>No responsibilities listed.</li>}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-white">Skills Required</h4>
        <ul className="list-disc list-inside mt-2 text-gray-300">
          {job.skillRequirements?.map((skill, index) => (
            <li key={index}>{skill}</li>
          )) || <li>No skills listed.</li>}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-white">Keywords</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.keywords?.map((keyword, index) => (
            <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-white">About the Company</h4>
        <p className="text-gray-300 mt-2">
          {job.companyName} is a leading company in its sector, dedicated to innovation and excellence. Located in {job.locationAddress}, we pride ourselves on fostering a collaborative and dynamic work environment. Our team of {job.teamSize || "50"} professionals is committed to delivering top-notch solutions and driving growth.
        </p>
      </div>
    </div>
  );
}

export default JobFullDetail;
