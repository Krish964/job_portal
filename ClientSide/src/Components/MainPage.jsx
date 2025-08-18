import React from "react";
import { MainPageNavbar, Jobs, Footer } from "./index";
import { useState } from "react";
import SearchForm from "./searchForm";
import JobsTitle from "./JobsTitle";

function MainPage() {

  const [search , setSearch] = useState("")
  const [location , setLocation] = useState("")
console.log(search , location)
  return (
    <>
      <MainPageNavbar />

      <main className="bg-gray-100 pb-20 min-h-screen">

        <div className="secondNav my-7">
          
          <SearchForm
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
          />
         
        </div>

        {/* Jobs List */}
        <Jobs />
      </main>

      <Footer />
    </>
  );
}

export default MainPage;
