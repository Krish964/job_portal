import React from "react";
import Secondtimg from "/src/assets/Questions-pana.png";
import { LandingPageNav, Footer } from "./index";

function About() {
  return (
    <>
      <LandingPageNav />

      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-tr from-black via-gray-900 to-cyan-900 py-8 px-0">
        <div
          className="w-[85vw] h-[70vh] mx-auto flex flex-col md:flex-row justify-around items-center gap-12 rounded-3xl bg-black/80 backdrop-blur-2xl shadow-2xl border border-cyan-700"
          style={{ minHeight: "70vh" }}
        >
          {/* Left: Image */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <img
              className="w-[260px] md:w-[420px] lg:w-[500px] rounded-2xl shadow-lg shadow-cyan-700/40"
              src={Secondtimg}
              alt="About Illustration"
            />
          </div>
          {/* Right: Content */}
          <div className="flex flex-col gap-7 w-full max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent font-mono mb-2 drop-shadow-[0_4px_30px_rgba(0,255,255,0.3)] select-none">
              Connecting Talent with Opportunity
            </h1>
            <p className="text-lg md:text-xl font-medium text-cyan-100 leading-relaxed">
              At <span className="text-cyan-400 font-bold">JobPortal</span>, we believe in bridging the gap between talented individuals and great opportunities. Our platform empowers both job seekers and employers with a seamless, secure, and supportive environment.<br /><br />
              Whether you're starting your career or aiming higher, our <span className="text-cyan-300">cutting-edge</span> features, personalized recommendations, and dedicated support help you find the right path—faster, safer, and smarter.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;
