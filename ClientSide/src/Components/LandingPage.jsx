import React, { useRef } from "react";
import { LandingPageNav, Footer } from "./index";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import bgImage from '/src/assets/backgroundImage4.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileContract,
  faLaptop,
  faRegistered,
  faShieldAlt,
  faBolt,
  faUsers,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const companies = [
  { id: 1, name: "TechNova", logo: "https://logo.clearbit.com/microsoft.com", info: "Software, Bangalore", openings: 8 },
  { id: 2, name: "CloudAxis", logo: "https://logo.clearbit.com/slack.com", info: "Cloud, Remote", openings: 13 },
  { id: 3, name: "HealthWorks", logo: "https://logo.clearbit.com/philips.com", info: "Healthcare, Hyderabad", openings: 5 },
  { id: 4, name: "GreenInfra", logo: "https://logo.clearbit.com/spotify.com", info: "Infrastructure, Mumbai", openings: 4 },
  { id: 5, name: "ProDerive", logo: "https://logo.clearbit.com/amazon.com", info: "Development, Delhi", openings: 7 },
  { id: 8, name: "Starlyt", logo: "https://logo.clearbit.com/uber.com", info: "Technology, Pune", openings: 6 },
  { id: 3, name: "HealthWorks", logo: "https://logo.clearbit.com/philips.com", info: "Healthcare, Hyderabad", openings: 5 },
  { id: 5, name: "ProDerive", logo: "https://logo.clearbit.com/amazon.com", info: "Development, Delhi", openings: 7 },];

function CompaniesActivelyHiring() {
  const scrollRef = useRef();

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="my-24 max-w-9xl mx-auto px-4 md:px-8">
      <h2 className="text-5xl font-extrabold text-center mb-12 text-cyan-800 tracking-wider select-none">
        Top Companies Actively Hiring
      </h2>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-360)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-cyan-600/90 hover:bg-cyan-700 text-white rounded-full focus:outline-none focus:ring-4 focus:ring-cyan-400 shadow-lg"
          aria-label="Scroll left"
        >
          <FaChevronLeft size={28} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar gap-8 py-6 px-14 scroll-smooth snap-x snap-mandatory"
        >
          {companies.map((co) => (
            <div
              key={co.id}
              className="min-w-[280px] max-w-[280px]  border  rounded-2xl flex flex-col items-center py-10 px-8 snap-center cursor-pointer hover:scale-105 hover:bg-cyan-100 transition-transform duration-300 shadow-lg"
              title={`${co.name} - ${co.openings} Openings`}
            >
              <div className="w-20 h-20 mb-6 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-md">
                <img src={co.logo} alt={co.name} className="object-contain w-16 h-16" />
              </div>
              <h3 className="text-2xl font-extrabold text-cyan-800 mb-2 text-center truncate w-full">{co.name}</h3>
              <p className="text-cyan-600 text-sm mb-4 text-center truncate w-full">{co.info}</p>
              <p className="font-semibold text-cyan-700 text-base">{co.openings} Openings</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(360)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-cyan-600/90 hover:bg-cyan-700 text-white rounded-full focus:outline-none focus:ring-4 focus:ring-cyan-400 shadow-lg"
          aria-label="Scroll right"
        >
          <FaChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <>
      <LandingPageNav />

      {/* HERO SECTION */}
      <section
        className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-24 max-w-4xl mx-auto select-none pointer-events-none">
          {/* Static Heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4 font-[Poppins,sans-serif]"
            style={{
              color: "#064579",
              textShadow: "2px 2px 8px #fff, 0px 4px 16px #91b7ed99, 0 0 32px #fff4",
            }}
          >
            Find Your Dream Job
          </h1>

          {/* Dynamic Typewriter Text */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0b3b60] tracking-wide mb-8 min-h-[60px]"
          >
            <Typewriter
              words={[
                "With Passion & Skills",
                "With Confidence & Growth",
                "With Innovation & Success",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </h2>

          {/* Description Text */}
          <p className="text-lg md:text-xl text-gray-900 max-w-2xl mb-10 font-medium tracking-wide leading-relaxed pointer-events-auto">
            Empower your career journey with personalized opportunities, seamless applications, and instant updates.
          </p>

          <Link
            to="/signup"
            className="inline-block rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 px-14 py-4 text-white font-semibold text-lg hover:scale-105 active:scale-98 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300 pointer-events-auto"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="bg-gradient-to-b from-white to-cyan-50 py-24 px-6 md:px-20 z-20">
        {/* HOW TO GET A JOB */}
        <section className="max-w-7xl mx-auto mb-28">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-800 mb-20 tracking-wide font-[Poppins,sans-serif]">
            How to Get a Job?
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-12 max-w-full mx-auto px-2">
            {[
              {
                icon: faRegistered,
                title: "Register Account",
                desc: "Create your profile to unlock personalized job opportunities tailored just for you.",
                bgColor: "bg-cyan-600",
                iconColor: "text-white",
              },
              {
                icon: faFileContract,
                title: "Apply for Job",
                desc: "Browse listings and submit applications with a click. Track your progress in real-time.",
                bgColor: "bg-purple-600",
                iconColor: "text-white",
              },
              {
                icon: faLaptop,
                title: "Perform the Job",
                desc: "Once hired, showcase your skills and keep growing your career with continuous support.",
                bgColor: "bg-pink-600",
                iconColor: "text-white",
              },
            ].map(({ icon, title, desc, bgColor, iconColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
                className="group cursor-default flex-1 rounded-3xl bg-white shadow-xl p-10 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className={`${bgColor} p-6 rounded-full mb-8 shadow-lg flex items-center justify-center w-20 h-20`}>
                  <FontAwesomeIcon icon={icon} size="3x" className={`${iconColor} drop-shadow-md`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed max-w-xs">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="max-w-7xl mx-auto py-12 px-4 rounded-3xl bg-gradient-to-r from-cyan-100 to-purple-200 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-wide font-[Poppins,sans-serif]">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
            {[
              {
                icon: faShieldAlt,
                title: "Trusted & Secure",
                desc: "Your data privacy is our top priority. Enjoy a safe, verified job search—always.",
                iconColor: "text-cyan-700 bg-cyan-200",
              },
              {
                icon: faBolt,
                title: "Fast Application",
                desc: "Lightning quick job search, one-click apply, instant notifications.",
                iconColor: "text-purple-700 bg-purple-200",
              },
              {
                icon: faUsers,
                title: "Community Support",
                desc: "Join a professional community, get real support at every career step.",
                iconColor: "text-pink-700 bg-pink-200",
              },
              {
                icon: faLightbulb,
                title: "Career Guidance",
                desc: "Get expert tips, career advice & personalized recommendations anytime.",
                iconColor: "text-yellow-600 bg-yellow-200",
              },
            ].map(({ icon, title, desc, iconColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.7, type: "spring" }}
                className="flex flex-col items-center text-center p-6 rounded-3xl bg-white shadow-lg hover:shadow-2xl cursor-default select-none"
              >
                <div className={`p-5 rounded-full mb-6 shadow-md ${iconColor}`}>
                  <FontAwesomeIcon icon={icon} className="text-4xl" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed max-w-xs">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Companies Section just above footer */}
      <CompaniesActivelyHiring />

      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        
        className="max-w-7xl mx-auto my-24 px-6 md:px-12 duration-200 ">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-indigo-50 to-indigo-300 rounded-3xl shadow-lg p-8 gap-6 duration-200 hover:shadow-lg">

          {/* Left Icon/Image */}
          <div className="flex-shrink-0">
            {/* Example icon, you can replace with an <img> or svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-indigo-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.014 0-3 .386-3 3s1.986 3 3 3 3-.386 3-3-1.986-3-3-3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.122 2.122m12.728 0l-2.122-2.122M7.757 7.757L5.636 5.636" />
            </svg>
          </div>

          {/* Center Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xl md:text-xl font-semibold py-5 leading-relaxed">
              Accelerate your job search with premium services. Services to help you get hired, faster: from preparing your CV, getting recruiter attention, finding the right jobs, and more!
            </p>
          </div>

          {/* Right Button */}
          <div>
            <button
              type="button"
              className="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-8 py-3 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400"
            >
              Learn More
            </button>
          </div>

        </div>
      </motion.section>


      <Footer />
    </>
  );
}

export default LandingPage;
