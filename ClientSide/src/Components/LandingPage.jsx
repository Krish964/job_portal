import React from "react";
import{ LandingPageNav , Footer} from "./index";
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faFileContract, faLaptop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';
function LandingPage() {
  const imagePath = "/src/assets/Programming-pana.png"
  return (

    <>
      <LandingPageNav />

      <div className="flex flex-col ">
        {/* Left side */}
        <div className=" flex justify-center items-center my-8 p-4">
          <div className="left flex flex-col gap-4">
            <h1 className="text-5xl font-semibold">Find a job with your interest and Abilities !!</h1>
            <p className="w-[60vw] my-4 text-lg font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias soluta id ipsa illo quasi esse ipsam architecto pariatur! Architecto voluptas incidunt sint dicta nesciunt ipsa labore placeat in repudiandae!</p>
            <div>
              <Link to= "/signup" className="border-1 text-xl px-8 py-4 rounded-xl bg-blue-500 text-white cursor-pointer duration-100 hover:scale-105 hover:bg-blue-600">Get Started</Link>
            </div>
          </div>

          {/* Right side */}
          <div className="right">
            <img className="w-[500px]" src={imagePath} alt="" />
          </div>
        </div>

      </div>

      <div className=" flex flex-col gap-5 p-5 my-8">
        <h1 className="text-4xl font-bold font-sans text-center mx-3 my-7">How to get a Job ?</h1>
        <div className="process flex items-center justify-around">
          <div className="register flex flex-col justify-center items-center gap-3">
            <FontAwesomeIcon icon={faRegistered} size="3x" className="text-blue-950" />
            <h1 className="text-3xl font-bold text-blue-700 text-center">Register Account</h1>
            <p className="text-lg font-small  w-[30vw] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam error magni ad nisi molestiae aliquam repudiandae sit impedit blanditiis praesentium.</p>
          </div>
          <div className="apply flex flex-col justify-center items-center gap-3">
            <FontAwesomeIcon icon={faFileContract} size="3x" className="text-blue-950" />
            <h1 className="text-3xl font-bold text-blue-700 text-center">Apply for Job</h1>
            <p className="text-lg font-small  w-[30vw] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ullam culpa dolore aut ipsa, voluptatibus maiores quibusdam quasi ab ipsam.
            </p>
          </div>
          <div className="perform flex flex-col justify-center items-center gap-3">
            <FontAwesomeIcon icon={faLaptop} size="3x" className="text-blue-950" />
            <h1 className="text-3xl font-bold text-blue-700 text-center">Perform the Job</h1>
            <p className="text-lg font-small text-center w-[30vw]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam minus, ipsum maxime iusto facilis facere pariatur blanditiis itaque? Voluptas, non?</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LandingPage