import React from "react";
import { MainPageNavbar, Jobs, Footer } from "./index";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import backgroundImage from "/src/assets/backgroundImage3.jpg";

function MainPage() {
  return (
    <>
      <MainPageNavbar />

      <main className="bg-gradient-to-br from-black via-gray-900 to-cyan-900 text-cyan-200 pb-20 min-h-screen">
        {/* HERO SECTION */}
        <section
          className="relative flex items-center justify-center min-h-[70vh] w-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50 bg-opacity-80 backdrop-blur-md z-0"></div>

          {/* Centered content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl px-6 py-20">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg select-none mb-6 text-center"
              initial={{ opacity: 0, y: 40,  }}
              animate={{ opacity: 1, y: 0, }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            >
              Let’s Turn Ambitions Into Opportunities
            </motion.h1>

            {/* Typing effect below heading */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-12 select-none text-white">
              Your next role:{" "}
              <span className="text-cyan-300">
                <Typewriter
                  words={["Developer", "Designer", "Remote Expert", "Team Player"]}
                  loop={0} // infinite loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={90}
                  deleteSpeed={40}
                  delaySpeed={1600}
                />
              </span>
            </h2>

            {/* Search Form */}
            <form
              className="bg-black/60 backdrop-blur-xl rounded-xl p-6 shadow-2xl w-full flex flex-col md:flex-row gap-5 items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Keyword */}
              <div className="relative w-full md:w-2/5">
                <input
                  type="text"
                  name="keyword"
                  id="keyword"
                  placeholder=" "
                  className="peer w-full rounded-lg bg-transparent border border-cyan-600 px-4 py-3 text-cyan-100 placeholder-transparent focus:border-cyan-400 outline-none"
                />
                <label
                  htmlFor="keyword"
                  className="absolute left-4 top-3 text-cyan-500 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-cyan-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-cyan-400 peer-focus:text-sm select-none"
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
                  className="peer w-full rounded-lg bg-transparent border border-cyan-600 px-4 py-3 text-cyan-100 placeholder-transparent focus:border-cyan-400 outline-none"
                />
                <label
                  htmlFor="location"
                  className="absolute left-4 top-3 text-cyan-500 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-cyan-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-cyan-400 peer-focus:text-sm select-none"
                >
                  Location
                </label>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-bold rounded-lg px-8 py-3 shadow-lg transition-transform active:scale-95"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Jobs Header */}
        <section className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-cyan-300 mt-20 mb-12 select-none drop-shadow-lg">
            Jobs You Might Be Interested In
          </h2>
        </section>

        {/* Jobs List */}
        <Jobs />
      </main>

      <Footer />
    </>
  );
}

export default MainPage;
