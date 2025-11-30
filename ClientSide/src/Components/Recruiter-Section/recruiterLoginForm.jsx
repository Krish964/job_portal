import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RecruiterLoginForm() {
  const { register, handleSubmit, watch } = useForm();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const currentEmail = watch("email");

  // Send OTP handler
  const handleSendOtp = async () => {
    if (!currentEmail) {
      toast.error("Please enter your email before sending OTP");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/users/RecruiterotpHandler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentEmail }),
      });

      if (response.ok) {
        toast.success("OTP sent to your email");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    }
  };

  // Verify OTP handler - on form submit
  const handleRecruiterLogin = async (formData) => {
    const { email } = formData;
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/users/verifyRecruiterOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode: otp }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully!");
        setTimeout(() => {
          navigate("/recruiter");
        }, 750);
      } else {
        toast.error(data.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong during verification.");
    }
  };

  return (
    <div>
      {/* LinkedIn Sign-in Button */}
      <button
        onClick={() => alert("LinkedIn Sign-In functionality coming soon!")}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 text-gray-800 font-semibold shadow-sm hover:bg-gray-50 transition mb-8 text-lg bg-white"
      >
        {/* LinkedIn Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 mr-2 text-blue-700"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.5 17V10.5H6V17H8.5M7.25 9.25A1.25 1.25 0 1 0 7.25 6.75A1.25 1.25 0 0 0 7.25 9.25M18 17V13.5C18 11.57 16.66 10 14.46 10C13.41 10 12.67 10.53 12.26 11.07V10.5H9.87V17H12.26V13.89C12.26 13.22 12.45 12.65 13.16 12.65C13.9 12.65 14.04 13.27 14.04 13.98V17H18Z" />
        </svg>
        Sign in with LinkedIn
      </button>

      {/* OR divider */}
      <div className="flex items-center mb-8">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-gray-500 text-base">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* OTP Login Form */}
      <form onSubmit={handleSubmit(handleRecruiterLogin)} className="space-y-6 w-full">
        <div className="relative">
          <label className="font-semibold mb-2 block">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="your@gmail.com"
            className="w-full py-3 px-4 pr-32 rounded-xl border border-gray-400 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-black focus:ring-2 focus:ring-black transition duration-300 shadow-sm"
          />
          <button
            type="button"
            onClick={handleSendOtp}
            className="absolute top-10 right-3 py-1 px-4 rounded-lg text-green-600 font-semibold text-base transition"
          >
            Send OTP
          </button>
        </div>

        <div>
          <label className="font-semibold mb-2 block">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="w-full py-3 px-4 rounded-xl border border-gray-400 text-gray-900 text-base placeholder-gray-400 outline-none focus:border-black focus:ring-2 focus:ring-black transition duration-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-5 rounded-xl bg-black text-white font-bold text-xl shadow-md hover:bg-gray-800 transition"
        >
          Login as Recruiter
        </button>
      </form>
    </div>
  );
}
