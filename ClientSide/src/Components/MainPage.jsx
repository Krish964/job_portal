import React from "react";
import { MainPageNavbar, Jobs, Footer } from "./index";
import MainpageImg from "/src/assets/Company-amico.png";
function MainPage() {

  return (
    <>
      <MainPageNavbar />
      <main>
        <div>
          <div className="Upper flex p-5 my-8 justify-between items-center mx-5">
            <div className="left flex flex-col items-start">
              <h1 className="text-6xl font-bold text-blue-950">
                Find Your next Opportunity
              </h1>
              <form className="w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-4 p-4 bg-white shadow rounded-xl items-center mt-8">
                {/* Keyword input */}
                <div className="flex items-center w-full md:w-2/5 bg-gray-100 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    className="bg-transparent outline-none w-full text-lg"
                    placeholder="Job title, keyword..."
                    name="keyword"
                  />
                </div>

                {/* Location input */}
                <div className="flex items-center w-full md:w-2/5 bg-gray-100 rounded-lg px-3 py-2">
                  <input
                    type="text"
                    className="bg-transparent outline-none w-full text-lg"
                    placeholder="Location"
                    name="location"
                  />
                </div>

                {/* Search button */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg text-white font-bold text-lg transition"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="right flex justify-center">
              <img className="w-[550px]" src={MainpageImg} alt="" />
            </div>
          </div>

          <div className="lower">
            <h1 className="text-5xl font-bold text-blue-950 text-center py-5 my-7">Jobs You Might Be Interested In</h1>
          </div>
        </div>
        <Jobs />
        
        <div className="ViewMore flex items-center justify-center">
          <button className="px-7 py-3 bg-blue-600 text-white text-xl rounded-xl my-4 cursor-pointer duration-200 hover:scale-105 hover:bg-blue-800">
            View More Jobs
          </button>
        </div>
      </main>

      
      <Footer/>
    </>
  );
}

export default MainPage;
