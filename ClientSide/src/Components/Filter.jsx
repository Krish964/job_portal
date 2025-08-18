import React, { useState } from "react";

const jobTypes = ["Full-time", "Part-time", "Internship", "Hybrid"];
const locations = ["Remote", "Mumbai", "Delhi", "Bangalore", "Chennai"];
const experienceLevels = ["Fresher", "Junior", "Mid", "Senior"];
const sortOptions = ["Relevance", "Latest", "Salary (High to Low)", "Salary (Low to High)"];

function JobsFilterSidebar({ onApplyFilters, onClearFilters }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [experience, setExperience] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [salaryRange, setSalaryRange] = useState([0, 200000]);

  // Checkbox logic
  const handleCheckbox = (value, collection, setter) => {
    if (collection.includes(value)) {
      setter(collection.filter(item => item !== value));
    } else {
      setter([...collection, value]);
    }
  };

  // Salary slider logic
  const handleSalarySlider = (e) => {
    const [min, max] = e.target.value.split(",").map(Number);
    setSalaryRange([min, max]);
  };

  // Handle radio for experience
  const handleExperience = (val) => setExperience(val);

  const handleApply = () => {
    onApplyFilters?.({
      type: selectedTypes,
      location: selectedLocations,
      experience,
      salaryMin: salaryRange[0],
      salaryMax: salaryRange[1],
      sortBy
    });
  };

  const handleClear = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setExperience("");
    setSortBy(sortOptions);
    setSalaryRange([0, 200000]);
    onClearFilters?.();
  };

  return (
    <aside className="bg-white text-gray-900 rounded-2xl shadow border border-gray-200 p-7 w-80 min-h-[500px] mt-4 flex flex-col gap-7">
      <h2 className="text-2xl font-bold mb-2 tracking-tight">Filters</h2>

      {/* Job Type */}
      <section>
        <h3 className="font-semibold text-gray-800 mb-3">Job Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {jobTypes.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded">
              <input
                type="checkbox"
                className="accent-black w-5 h-5"
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckbox(type, selectedTypes, setSelectedTypes)}
              />
              <span className="font-medium">{type}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Salary Range Slider */}
      <section>
        <h3 className="font-semibold text-gray-800 mb-3">Salary Range &nbsp;
          <span className="inline-block rounded bg-gray-100 text-xs px-2 py-1 font-normal text-gray-500">
            ₹{salaryRange[0].toLocaleString()} - ₹{salaryRange[1].toLocaleString()}
          </span>
        </h3>
        <input
          type="range"
          min="0"
          max="200000"
          step="5000"
          value={salaryRange}
          onChange={(e) => setSalaryRange([Number(e.target.value), Math.max(salaryRange[1], Number(e.target.value))])}
          className="w-full accent-black mb-1"
        />
        <input
          type="range"
          min="0"
          max="200000"
          step="5000"
          value={salaryRange[1]}
          onChange={(e) => setSalaryRange([Math.min(salaryRange, Number(e.target.value)), Number(e.target.value)])}
          className="w-full accent-black"
        />
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span>2,00,000+</span>
        </div>
      </section>

      {/* Location */}
      <section>
        <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
        <div className="grid grid-cols-2 gap-2">
          {locations.map(loc => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded">
              <input
                type="checkbox"
                className="accent-black w-5 h-5"
                checked={selectedLocations.includes(loc)}
                onChange={() => handleCheckbox(loc, selectedLocations, setSelectedLocations)}
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <h3 className="font-semibold text-gray-800 mb-2">Experience</h3>
        <div className="flex flex-wrap gap-3 pl-1 pt-1">
          {experienceLevels.map(level => (
            <label key={level} className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-gray-100 rounded">
              <input
                type="radio"
                name="experience"
                className="accent-black w-4 h-4"
                checked={experience === level}
                onChange={() => handleExperience(level)}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Sort By */}
      <section>
        <h3 className="font-semibold text-gray-800 mb-2">Sort By</h3>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full border border-gray-300 rounded py-2 px-2 bg-gray-50 text-gray-800 font-medium focus:outline-black"
        >
          {sortOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </section>

      {/* Buttons */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleApply}
          className="flex-1 py-2 rounded-lg border border-black bg-black text-white font-semibold transition hover:bg-gray-900"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 py-2 rounded-lg border border-gray-400 text-gray-700 font-semibold transition hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
    </aside>
  );
}

export default JobsFilterSidebar;
