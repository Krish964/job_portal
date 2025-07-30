import React, { useState } from "react";
import emailImg from "/src/assets/Email.png"
function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    // OTP logic yahan aayega
    alert(`OTP sent to ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-3xl  flex max-w-5xl w-full overflow-hidden">
        {/* Left: Illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-b from-blue-500 to-indigo-500 p-12">
          <img
            src={emailImg}
            alt="Security Illustration"
            className="w-96 h-96 object-contain"
          />
        </div>

        {/* Right: Form */}
        <div className="flex-1 p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
            Forgot Password?
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Enter your registered email address to receive an OTP.
          </p>
          <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
            <label className="text-gray-700 font-semibold text-lg" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-blue-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              placeholder="Enter your email"
            />

            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl text-xl shadow-lg transition"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
