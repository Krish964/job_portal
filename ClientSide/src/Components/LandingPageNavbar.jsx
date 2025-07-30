import React from "react";
import { NavLink , Link } from 'react-router-dom';

function LandingPageNav() {

  return (
    <div className="flex justify-between mx-7 my-2 p-4 ">
      <span className="text-2xl font-bold text-blue-600 tracking-wide select-none" style={{ letterSpacing: '1.5px' }}>
        Job<span className="text-black">Portal</span>
      </span>

      <ul className="flex gap-4 text-xl justify-center items-center font-medium">
        <li className="duration-100 hover:text-blue-500 cursor-pointer">
          <NavLink to= "/" className={({isActive}) => `${isActive? "text-blue-500" : "text-black"}`}>
            Home
          </NavLink>
        </li>
        <li className="duration-100 hover:text-blue-500 cursor-pointer">  <NavLink to= "/about" className={({ isActive }) => `${isActive ? "text-blue-500" : "text-black"}`}>
          About
        </NavLink></li>

        <li className="duration-100 hover:text-blue-500 cursor-pointer">
          <NavLink to="/contact" className={({ isActive }) => `${isActive ? "text-blue-500" : "text-black"}`}>
            Contact
          </NavLink>
        </li>
        <li className="duration-100 hover:text-blue-500 cursor-pointer">More</li>
      </ul>

      <div className="flex gap-4 text-xl">
        <Link
          to="/login"
          className="border px-4 py-2 rounded-xl  hover:bg-blue-500 hover:text-white cursor-pointer
                duration-150"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="border px-4 py-2 rounded-xl cursor-pointer
               hover:bg-blue-500 hover:text-white duration-150"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default LandingPageNav