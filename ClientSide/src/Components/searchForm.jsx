import React from 'react'

function SearchForm({ search, setSearch, location, setLocation }) {

  const handleKeywordSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleLocationSearch = (e) => {
    e.preventDefault()
    setLocation(e.target.value)
  }

  return (
    <div>
      <form
        className="p-6 flex flex-col md:flex-row gap-5 items-center bg-white"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Keyword */}
        <div className="relative w-full md:w-2/5">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder=" "
            value={search}
            onChange={handleKeywordSearch}
            className="peer w-full rounded-lg   px-4 py-3  placeholder-transparent focus:black outline-none bg-gray-200"
          />
          <label
            htmlFor="keyword"
            className="absolute left-4 top-3  text-sm cursor-text transition-all peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-black peer-focus:text-sm select-none"
          >
            Job title, keyword...
          </label>
        </div>

        {/* Location */}
        <div className="relative w-full md:w-2/5">
          <input
            type="text"
            name="location"
            id="location"
            placeholder=" "
            value={location}
            onChange={handleLocationSearch}
            className="peer w-full rounded-lg  bg-gray-200 px-4 py-3 text-black placeholder-transparent  outline-none"
          />
          <label
            htmlFor="location"
            className="absolute left-4 top-3 text-sm cursor-text transition-all  peer-placeholder-shown:text-base peer-focus:top-[-10px]  peer-focus:text-sm select-none"
          >
            Location
          </label>
        </div>

        <div className="select">
          <select className = 'bg-gray-200 px-6 py-3 rounded-lg text-lg' name="jobs" id="jobs">
            <option className = '' value="Select">Select</option>
            <option className='' value="Ui/Ux Desginer">Ui/Ux Desginer</option>
            <option className='' value="FrontEnd Developer">FrontEnd Developer</option>
            <option className='' value="Backend Developer">Backend Developer</option>
            <option className='' value="Data Analytics">Data Analytics</option>
            <option className='' value="Sales">Sales</option>
            <option className='' value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-black text-white font-bold rounded-lg px-8 py-3 shadow-lg transition-transform active:scale-95"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm
