import React from "react";
import firstimg from "/src/assets/AboutUs.png.png"
import Secondtimg from "/src/assets/Questions-pana.png"
import { LandingPageNav, Footer } from "./index";

function About() {
  return (
    <>
      <LandingPageNav/>
    <div className="flex justify-center items-center h-[70vh] w-[90vw]">
    <div className="flex justify-around items-center gap-5">
      <div className="left flex">
         
          <img className="w-[600px] " src={Secondtimg} alt="" />
      </div>
      <div className=" flex flex-col gap-7 bg-white w-[50vw]">
        <h1 className="text-6xl font-bold text-blue-950 font-mono">Connecting Talent with Opportunity</h1>
        <p className="text-xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, expedita. Cupiditate reiciendis omnis et repudiandae illo obcaecati culpa eveniet amet fugit doloremque! Eaque reiciendis deleniti aliquam aperiam sunt, modi sapiente provident similique nesciunt quas autem. Beatae molestias eligendi eius fugit! Consectetur fuga quaerat, voluptatem beatae perspiciatis debitis unde. Nulla, eligendi!</p>
      </div>
      </div>
      </div>

      <Footer/>
    </>
  )
}

export default About