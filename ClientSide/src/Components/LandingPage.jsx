import React, { useRef } from "react";
import { LandingPageNav, Footer } from "./index";
import { Link } from "react-router-dom";
import SearchForm from "./searchForm";

import { BarChart } from '@mui/x-charts/BarChart';

 function JobPortalProgressChart() {
  return (
    <BarChart
      xAxis={[
        {
          data,
          scaleType: 'band',
          tickSize: 8,
          height: 48, // increased for clarity
          groups: [
            { getValue: getMonth },
            { getValue: getQuarter },
            { getValue: getYear },
          ],
          valueFormatter,
        },
      ]}
      {...chartConfig}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        '& .MuiBarChart-legend': { fontWeight: 600, fontSize: 14 },
        '& .MuiBarChart-root': { fontWeight: 400 },
      }}
    />
  );
}

const getMonth = (date) => date.toLocaleDateString('en-US', { month: 'short' });
const getQuarter = (date) => `Q${Math.floor(date.getMonth() / 3) + 1}`;

const getYear = (date) => date.toLocaleDateString('en-US', { year: 'numeric' });

const valueFormatter = (v) =>
  v.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

// Sample monthly dates for x-axis
const data = [
  new Date(2024, 0, 1),
  new Date(2024, 1, 1),
  new Date(2024, 2, 1),
  new Date(2024, 3, 1),
  new Date(2024, 4, 1),
  new Date(2024, 5, 1),
  new Date(2024, 6, 1),
  new Date(2024, 7, 1),
  new Date(2024, 8, 1),
  new Date(2024, 9, 1),
  new Date(2024, 10, 1),
  new Date(2024, 11, 1),
];

// Example data arrays representing Job Applications and Jobs Filled
const jobApplications = [
  5000, 6200, 5800, 6900, 7200, 8100, 8300, 7700, 7900, 8500, 9100, 9400,
];

const jobsFilled = [
  2800, 3400, 3200, 3700, 4000, 4200, 4500, 4300, 4400, 4600, 4800, 5100,
];

// Calculate percentage filled (jobsFilled / jobApplications * 100)
const getPercents = (filled, applications) =>
  applications.map((app, idx) => (app ? ((filled[idx] / app) * 100) : 0));

const chartConfig = {
  height: 300,
  margin: { left: 40, right: 40 },
  series: [
    {
      data: jobApplications,
      label: 'Job Applications',
      valueFormatter: (value) => `${value ?? 0}`,
      color: '#6366F1', // Indigo
    },
    {
      data: jobsFilled,
      label: 'Jobs Filled',
      valueFormatter: (value) => `${value ?? 0}`,
      color: '#EF4444', // Red
    },
  ],
  yAxis: [
    {
      label: 'Number of Jobs',
      min: 0,
      tickCount: 6,
    },
  ],
};

// Indigo color
const indigo = '#6366f1';

// Steps list
const steps = [
  'Register Account',
  'Apply for the Job',
  'Perform the Job',
];


// Which step is active? (Change as needed)
const activeStep = 1;



const features = [
  {
    img: "https://resources.workindia.in/employer/assets/illustrations/landing/simple-hiring.svg",
    title: "Simple Hiring",
    description: "Receive calls from qualified candidates in under an hour of posting a job",
  },
  {
    img: "https://resources.workindia.in/employer/assets/illustrations/landing/intelligent-recommendations.svg",
    title: "Intelligent Recommendations",
    description: "Only the best candidates are recommended by our ML as per your requirement",
  },
  {
    img: "https://resources.workindia.in/employer/assets/illustrations/landing/priority-support.svg",
    title: "Priority Customer Support",
    description: "Prioritized customer support for the paid plan users",
  },
];

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <img src={icon} alt="" className="w-10 h-10 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}



function LandingPage() {

  
  return (
    <>
      <LandingPageNav />

      {/* HERO SECTION */}

      <div className="relative w-full h-[800px] overflow-hidden rounded-xl">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          src="./src/assets/video2.mp4"
          type="video/mp4"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-24 max-w-4xl mx-auto text-white select-none">
          <h1 className="text-7xl font-extrabold leading-tight mb-4 font-[Poppins,sans-serif]">
            Search , Apply & Get Your <span>Dream Job</span>
          </h1>
          <p className="text-xl max-w-6xl mb-10 font-medium tracking-wide leading-relaxed">
            Empower your career journey with personalized opportunities, seamless applications, and instant updates.
          </p>

          {/* Custom Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Add search logic here
            }}
            className="w-full max-w-3xl flex items-center gap-4"
            role="search"
          >
            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              className="flex-grow px-6 py-4 rounded-xl bg-white placeholder-gray-500 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-black rounded-xl font-semibold hover:bg-gray-800 transition-colors text-white whitespace-nowrap"
              aria-label="Search"
            >
              Search
            </button>
          </form>


        </div>
      </div>

     
      

      {/* MAIN CONTENT */}
      <main className=" py-24 px-6 md:px-20 z-20">

        <div className="flex flex-col md:flex-row rounded-xl overflow-hidden" style={{ marginTop: 0 }}>
          {/* Left Child Div - Got Talent */}
          <div className="flex-1 bg-white px-10 py-16 flex flex-col justify-between" style={{ minHeight: '600px' }}>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Got talent?</h2>
              <div className="flex flex-col gap-6">
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e6df60830cc7c2b88b_stairs-up.svg"
                  title="Why job seekers love us"
                  description="Connect directly with founders at top startups - no third party recruiters allowed."
                />
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e63b04b79dd28c1ca3_books.svg"
                  title="Everything you need to know, all upfront."
                  description="View salary, stock options, and more before applying."
                />
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e670c0dd6f22eee061_tap.svg"
                  title="Say goodbye to cover letters"
                  description="Your profile is all you need. One click to apply and you're done."
                />
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e7342fe2d5b929e48c_stars.svg"
                  title="Unique jobs at startups and tech companies"
                  description="You can’t find anywhere else."
                />
              </div>
            </div>
            <button className="mt-10 w-full md:w-auto bg-black text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-800 transition">
              Find your Next Job
            </button>
          </div>

          {/* Right Child Div - Need Talent */}
          <div className="flex-1 bg-orange-100 px-10 py-16 flex flex-col justify-between" style={{ minHeight: '600px' }}>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-6">Need talent?</h2>
              <div className="flex flex-col gap-6">
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e6df60830cc7c2b88b_stairs-up.svg"
                  title="Why recruiters love us"
                  description="Tap into a community of 10M+ engaged, startup-ready candidates."
                />
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e63b04b79dd28c1ca3_books.svg"
                  title="Everything you need to kickstart your recruiting"
                  description="Set up job posts, company branding, and HR tools within 10 minutes, all for free."
                />
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e670c0dd6f22eee061_tap.svg"
                  title="Free applicant tracking system"
                  description="Or free integration with any ATS you may already use."
                />
                <FeatureItem
                  icon="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646574e7342fe2d5b929e48c_stars.svg"
                  title="AI-Recruiter powered heavy-lifting"
                  description="Our AI scans 500M+ candidates, filters, and schedules your favorites fast."
                />
              </div>
            </div>
            <button className="mt-10 w-full md:w-auto bg-black text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-800 transition">
              Find your next Hire
            </button>
          </div>
        </div>



        {/* HOW TO GET A JOB */}
        <div className = 'my-40 '>
          <div className='flex gap-20'>
            <div className="image w-2xl">
              <img src="./src/assets/landingPageImg1.jpg" alt="" />
            </div>

         

            <div className="text flex flex-col gap-10">
              <h1 className='text-5xl font-bold'>Showcase your skills across borders</h1>
            <div className="flex flex-col gap-7">

              <div className = 'flex items-center gap-6'>
                <img className = 'w-[80px] bg-pink-100 rounded-full p-5' src="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646d756228c11bc7c68dc0cb_checklist.svg" alt="" />
                <div className="subText">
                  <h2 className = 'text-xl font-semibold'>Engineering assessments</h2>
                  <p>Take engineering assessments to showcase your skills beyond the resume</p>
                </div>
              </div>
              <div className='flex items-center gap-6'>
                <img className='w-[80px] bg-pink-100 rounded-full p-5' src="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/647d2101754581b4b3ab7565_video.svg" alt="" />
                <div className="subText">
                  <h2 className='text-xl font-semibold'>Video assessments</h2>
                  <p>Take a video assessment to personalize your profile</p>
                </div>
              </div>
            </div>
            </div>
        
          </div>
       </div>
     
        <div className="mt-60 mb-30">
          <div className="flex gap-30 items-center">
            {/* Text Content on Left */}
            <div className="text flex flex-col gap-7 max-w-xl order-1">
              <h1 className="text-5xl font-bold">Easy Signup, Quick Start</h1>
              <p className="text-lg text-gray-700">
                Create your account effortlessly to get access to thousands of jobs
                across top companies and startups. Fast, simple, and secure signup process.
              </p>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-5">
                  <img
                    className="w-[60px] rounded-full p-3 bg-blue-100"
                    src="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/646d756228c11bc7c68dc0cb_checklist.svg"
                    alt="Easy Steps Icon"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">Simple Registration</h2>
                    <p>Fill a quick form and verify your email to get started instantly.</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <img
                    className="w-[60px] rounded-full p-3 bg-blue-100"
                    src="https://wellfound.com/landing-page-assets/64626a4a74818ca87606a29e/647d2101754581b4b3ab7565_video.svg"
                    alt="Secure Signup Icon"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">Secure & Verified</h2>
                    <p>Your profile stays safe with verified emails and secure data handling.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signup Image on Right */}
            <div className="image w-2xl order-2">
              <img
                src="./src/assets/LandingPageImg2.jpg"
                alt="Easy Signup Illustration"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

       

      
        {/* Job posting chart */}

        <section className  = 'flex flex-col gap-6 mt-10'>
          <h1 className = 'text-5xl font-bold text-center'>Our Statistics</h1>
          <JobPortalProgressChart />
        </section>
       
       
      </main>

      {/* What makes workindia better */}

      
      <section className='bg-blue-950 text-white  p-7 mb-10'>
        <h1 className='text-4xl pt-10 font-mono'><span className='underline decoration-amber-400'>What</span> Makes Job Portal Better?</h1>
        
        <div className  ='flex flex-col justify-center items-center gap-8'>

        <ul className="flex gap-8 list-none p-8">
          {features.map((feature, idx) => (
            <li
            key={idx}
            className="flex-1 rounded-lg p-6 shadow text-center"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="object-contain mx-auto mb-4"
                />
              <h3 className="text-3xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-50 text-base">{feature.description}</p>
            </li>
          ))}
        </ul>

        <button className = ' rounded-xl border-2 border-gray-50 px-[4rem] py-[1rem] mb-5 text-gray-50 items-center text-xl cursor-pointer duration-200 hover:scale-110'>
          <Link>
            Post Your Job
          </Link>
        </button>
        </div>
        
      </section>


      <section className="mt-20 text-center px-6">
        <h2 className="text-6xl font-bold mb-12">
          Where startups and jobseekers meet
        </h2>
        <div className="flex justify-center gap-8 max-w-lg mx-auto">
          <button className="bg-white text-black text-xl font-semibold py-4 px-20 rounded-lg border-2 border-gray-700 hover:bg-gray-100 transition">
            Find Job
          </button>
          <button className="bg-black text-white text-xl font-semibold py-4 px-10 rounded-lg hover:bg-gray-900 transition">
            Find Your Hire
          </button>
        </div>
      </section>


      <div className="my-40 flex flex-col md:flex-row items-center gap-12 h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
        {/* Left side: Video */}
        <div className="w-full md:w-1/2 h-full relative rounded-xl overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover rounded-xl"
            src="./src/assets/video1.mp4" // Apni video ki url yahan lagao
            type="video/mp4"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Right side: Text content with icons */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-left px-6 md:px-12 text-gray-900 space-y-6">
          <h2 className="text-4xl font-bold mb-6">24/7 Customer Support</h2>
          <p className="text-lg mb-8 max-w-lg">
            Our dedicated support team is here to help you anytime, anywhere.
            Get your queries answered quickly and efficiently.
          </p>

          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex items-center gap-4">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/phone.png"
                alt="Phone Icon"
                className="w-10 h-10 text-pink-600"
              />
              <div>
                <h3 className="text-xl font-semibold">Call Us Anytime</h3>
                <p className="text-gray-600">Reach our team 24/7 at <a href="tel:+1234567890" className="text-pink-600 underline">+1 234 567 890</a></p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/chat.png"
                alt="Chat Icon"
                className="w-10 h-10 text-pink-600"
              />
              <div>
                <h3 className="text-xl font-semibold">Live Chat</h3>
                <p className="text-gray-600">Get instant support via our chat portal anytime.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/email-open.png"
                alt="Email Icon"
                className="w-10 h-10 text-pink-600"
              />
              <div>
                <h3 className="text-xl font-semibold">Email Support</h3>
                <p className="text-gray-600">Send us your query at <a href="mailto:support@yourcompany.com" className="text-pink-600 underline">support@yourcompany.com</a></p>
              </div>
            </div>
          </div>

          <button className="px-8 py-3 bg-black text-white rounded-2xl font-semibold hover:bg-pink-700 transition w-max mt-8">
            Contact Support
          </button>
        </div>
      </div>


      <Footer />
    </>
  );
}

export default LandingPage;
