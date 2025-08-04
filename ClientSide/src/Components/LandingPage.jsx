import React from "react";
import { LandingPageNav, Footer } from "./index";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faLaptop, faRegistered, faShieldAlt, faBolt, faUsers, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react"
const backgroundImageUrl = "/src/assets/backgroundImage2.jpg"; // Use public path to avoid import errors

function LandingPage() {
  return (
    <>
      <LandingPageNav />

      {/* HERO SECTION */}
      <section
        className="relative min-h-[78vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay with smooth gradient and blur */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        ></div>

        {/* CENTERED Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent mb-8 drop-shadow-[0_4px_30px_rgba(0,255,255,0.40)] select-none">
            Find a job with your interest and Abilities!!
          </h1>
          <p className="text-lg md:text-xl font-light text-cyan-200 mb-14 max-w-xl drop-shadow-md leading-relaxed">
            Unlock your potential and discover opportunities that match your skills and ambitions.
          </p>
          <Link
            to="/signup"
            className="inline-block text-lg md:text-xl px-12 py-4 rounded-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-purple-600
           hover:from-cyan-400 hover:to-purple-500 shadow-lg text-white transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-400 tracking-wider"
          >
            Get Started
          </Link>
        </div>
      </section>

      <main className="relative bg-gradient-to-br from-black to-cyan-900 text-cyan-200">
        {/* HOW TO GET A JOB (full width + big gap below)*/}
        <section className="max-w-7xl mx-auto py-24 px-4 md:px-20 min-h-[45vh]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-24 select-none tracking-wide">
            How to get a Job?
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-16 text-center max-w-full mx-auto px-2">
            {[
              {
                icon: faRegistered,
                title: "Register Account",
                desc: "Create your profile to unlock personalized job opportunities tailored just for you.",
              },
              {
                icon: faFileContract,
                title: "Apply for Job",
                desc: "Browse listings and submit applications with a click. Track your progress in real-time.",
              },
              {
                icon: faLaptop,
                title: "Perform the Job",
                desc: "Once hired, showcase your skills and keep growing your career with continuous support.",
              },
            ].map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 96 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.18, duration: 3, type: "spring" }}
                className="group cursor-default w-full md:w-1/3 bg-black/70 backdrop-blur-lg rounded-2xl p-12 flex flex-col items-center shadow-lg shadow-cyan-800/60 hover:shadow-cyan-400 transition-shadow duration-300"
              >
                <FontAwesomeIcon
                  icon={icon}
                  size="5x"
                  className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-3xl font-extrabold text-cyan-300 mb-6">{title}</h3>
                <p className="text-cyan-200 font-light leading-relaxed max-w-[90%]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BIG GAP */}
        <div className="w-full h-16 md:h-24" />

        {/* WHY CHOOSE US SECTION (now 4 features, brighter, modern) */}
        <section className="max-w-10xl mx-auto py-24 px-4 md:px-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wide select-none">
            Why Choose Us?
          </h2>
          <div className="relative flex flex-col md:flex-row flex-wrap items-center justify-center gap-y-16 md:gap-y-0 md:gap-x-10">

            {/* Timeline/connector vertical line on desktop */}
            <div className="hidden md:block absolute left-1/2 top-16 bottom-16 w-1 h-20 bg-gradient-to-b from-cyan-500/40 via-transparent to-teal-300/40 rounded-full pointer-events-none" style={{ transform: 'translateX(-50%)' }}></div>

            {/* FEATURE 1 */}
            <div className="relative flex-1 flex flex-col items-center text-center px-6 min-w-[220px]">
              <span className="flex items-center justify-center mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-black/80 border-4 border-cyan-400 shadow-2xl animate-pulse">
                <FontAwesomeIcon icon={faShieldAlt} className="text-white text-4xl drop-shadow-[0_0_16px_#67e8f9]" />
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-cyan-200 mb-3 tracking-wide">Trusted &amp; Secure</h3>
              <p className="text-cyan-300 font-light leading-relaxed max-w-xs mx-auto">
                Your data privacy is our top priority. Enjoy a safe, verified job search—always.
              </p>
            </div>

            {/* FEATURE 2 */}
            <div className="relative flex-1 flex flex-col items-center text-center px-6 min-w-[220px]">
              <span className="flex items-center justify-center mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-black/80 border-4 border-purple-400 shadow-2xl animate-pulse">
                <FontAwesomeIcon icon={faBolt} className="text-white text-4xl drop-shadow-[0_0_16px_#c084fc]" />
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-200 mb-3 tracking-wide">Fast Application</h3>
              <p className="text-purple-200 font-light leading-relaxed max-w-xs mx-auto">
                Lightning quick job search, one-click apply, instant notifications.
              </p>
            </div>

            {/* FEATURE 3 */}
            <div className="relative flex-1 flex flex-col items-center text-center px-6 min-w-[220px]">
              <span className="flex items-center justify-center mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-black/80 border-4 border-teal-300 shadow-2xl animate-pulse">
                <FontAwesomeIcon icon={faUsers} className="text-white text-4xl drop-shadow-[0_0_16px_#5eead4]" />
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-teal-200 mb-3 tracking-wide">Community Support</h3>
              <p className="text-teal-200 font-light leading-relaxed max-w-xs mx-auto">
                Join a professional community, get real support at every career step.
              </p>
            </div>

            {/* FEATURE 4 (NEW) */}
            <div className="relative flex-1 flex flex-col items-center text-center px-6 min-w-[220px]">
              <span className="flex items-center justify-center mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-black/80 border-4 border-yellow-300 shadow-2xl animate-pulse">
                <FontAwesomeIcon icon={faLightbulb} className="text-white text-4xl drop-shadow-[0_0_16px_#fde68a]" />
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-100 mb-3 tracking-wide">Career Guidance</h3>
              <p className="text-yellow-100 font-light leading-relaxed max-w-xs mx-auto">
                Get expert tips, career advice & personalized recommendations anytime.
              </p>
            </div>
          </div>
        </section>



      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
