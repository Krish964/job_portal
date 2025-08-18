import React from "react";
import Secondtimg from "/src/assets/Questions-pana.png";
import { LandingPageNav, Footer } from "./index";

function About() {
  return (
    <>
      <LandingPageNav />

      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-indigo-50 py-12 px-4 md:px-0">
        <div
          className="w-[90vw] max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-16 rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg border border-indigo-300"
          style={{ minHeight: "70vh" }}
        >
          {/* Left: Image */}
          <div className="flex-shrink-0 flex justify-center items-center p-4">
            <img
              className="w-[260px] md:w-[420px] lg:w-[500px] rounded-3xl shadow-md shadow-indigo-400/40"
              src={Secondtimg}
              alt="About Illustration"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8 w-full max-w-2xl px-4 md:px-0">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 bg-clip-text text-transparent font-mono mb-2 drop-shadow-md select-none">
              Connecting Talent with Opportunity
            </h1>
            <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed">
              At{" "}
              <span className="text-indigo-700 font-bold">JobPortal</span>, we believe in bridging the gap
              between talented individuals and great opportunities. Our platform empowers both job seekers
              and employers with a seamless, secure, and supportive environment.
              <br />
              <br />
              Whether you're starting your career or aiming higher, our{" "}
              <span className="text-indigo-500 font-semibold">cutting-edge</span> features,
              personalized recommendations, and dedicated support help you find the right path—faster,
              safer, and smarter.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;
