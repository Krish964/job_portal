import React from "react";
import ContactpageImg from "/src/assets/ContactPage.png";
import { LandingPageNav, Footer } from "./index";

function Contact() {
  return (
    <>
      <LandingPageNav />

      <main className="min-h-[90vh] bg-gradient-to-bl from-black via-gray-900 to-cyan-900 flex items-center justify-center px-6 md:px-20 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl shadow-2xl rounded-2xl bg-black/80 backdrop-blur-lg border border-cyan-700 overflow-hidden">
          {/* Left: Contact Form */}
          <div className="left w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 font-mono select-none">
              Contact Us
            </h2>
            <p className="mb-8 text-base md:text-lg text-cyan-300 max-w-md">
              Have any questions, feedback, or partnership requests? Fill out the form and our team will get back to you soon!
            </p>

            <form className="flex flex-col gap-6" action="" method="post">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold text-cyan-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-lg border-2 border-cyan-700 bg-black/90 text-cyan-200 px-4 py-3 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg font-semibold text-cyan-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border-2 border-cyan-700 bg-black/90 text-cyan-200 px-4 py-3 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-lg font-semibold text-cyan-400">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  className="w-full rounded-lg border-2 border-cyan-700 bg-black/90 text-cyan-200 px-4 py-3 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-lg font-semibold text-cyan-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="w-full rounded-lg border-2 border-cyan-700 bg-black/90 text-cyan-200 px-4 py-3 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-lg font-semibold text-cyan-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Type your message..."
                  required
                  className="w-full rounded-lg border-2 border-cyan-700 bg-black/90 text-cyan-200 px-4 py-3 placeholder-cyan-600 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-6 w-max bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-xl font-bold px-10 py-3 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Contact Image */}
          <div className="right w-full md:w-1/2 bg-black/70 flex justify-center items-center rounded-r-2xl overflow-hidden p-8">
            <img
              src={ContactpageImg}
              alt="Contact Illustration"
              className="w-full md:w-[85%] h-auto object-contain rounded-lg drop-shadow-lg"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
