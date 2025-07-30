import React from "react";
import ContactpageImg from "/src/assets/ContactPage.png";
import { LandingPageNav, Footer } from "./index";

function Contact() {
  return (
    <>
      <LandingPageNav/>
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-bl from-white to-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-center w-[95vw] md:w-[80vw] shadow-2xl rounded-2xl bg-white overflow-hidden my-4">
        {/* Left: Contact Form */}
        <div className="left w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-mono">
            Contact Us
          </h2>
          <p className="mb-6 text-base md:text-lg text-gray-500">
            Have any questions, feedback, or partnership requests? Fill out the form and our team will get back to you soon!
          </p>
          <form className="flex flex-col gap-4" action="" method="post">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-800" htmlFor="name">
                Name
              </label>
              <input
                className="border-2 border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-800" htmlFor="email">
                Email
              </label>
              <input
                className="border-2 border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-800" htmlFor="phone">
                Phone
              </label>
              <input
                className="border-2 border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition"
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-800" htmlFor="subject">
                Subject
              </label>
              <input
                className="border-2 border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition"
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-blue-800" htmlFor="message">
                Message
              </label>
              <textarea
                className="border-2 border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
                name="message"
                id="message"
                rows={4}
                placeholder="Type your message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg shadow hover:bg-blue-700 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
        {/* Right: Contact Image */}
        <div className="right w-full md:w-1/2 flex justify-center items-center bg-blue-50 rounded-xl">
          <img
            className="w-full md:w-[85%] h-auto object-contain p-6"
            src={ContactpageImg}
            alt="Contact Illustration"
          />
        </div>
      </div>
      </div>

      <Footer/>
    </>
  );
}

export default Contact;
