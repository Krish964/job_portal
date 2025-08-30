import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Otp from "./Otp";

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false)


  const onSubmit = async (data) => {

    if (!isEmailVerified) {
      console.log("Email not verified - showing toast");
      toast.error("Please verify your email before registering.");
      return; // stop submission
    }

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("password", data.password);
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }

    const toastId = toast.loading("Creating your account...");
  
    try {
    const res = await fetch(`http://localhost:8000/api/users/register`, {
        method: "POST",
        body: formData,
      });

      const dataResponse = await res.json();
      console.log("Signup response from backend:", dataResponse);  // Ye add karo
      if (res.ok) {
        localStorage.setItem("resume", dataResponse.resume || "");
        localStorage.setItem("username", dataResponse.username || data.username || "");
        localStorage.setItem("userId", dataResponse.user?._id);

        toast.update(toastId, {
          render: "Signup successful! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/mainpage");
        }, 1200);
      } else {
        toast.update(toastId, {
          render: dataResponse.message || "Signup failed!",
          type: "error",
          isLoading: false,
          autoClose: 2500,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 2600,
        theme: "colored",
      });
    }
  };

  // Open OTP modal and send OTP email
  const handleVerifyEmail = async () => {
    const currentEmail = watch("email");
    if (!currentEmail) {
      alert("Please enter your email first");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/users/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentEmail }),
      });

      if (res.ok) {
        alert("OTP sent to your email");
        setEmailForOtp(currentEmail);
        setOtpModalOpen(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      alert("Error sending OTP");
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (code) => {
    try {
      const res = await fetch("http://localhost:8000/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForOtp, otpCode: code }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Email verified successfully!");
        setOtpModalOpen(false);
        setIsEmailVerified(true);
      } else {
        toast.error(data.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Left Side with Image + Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center gap-7 p-12 text-center">
        <img
          src="https://wellfound.com/webpack/881d6e4e067748b390ceb61bbc2ac943.png"
          alt="Signup Illustration"
          className="max-w-[95%] h-auto mb-8"
        />
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          Find the job made for you.
        </h1>
        <p className="text-xl text-gray-700 max-w-lg font-medium">
          Browse over <span className="font-bold">130K jobs</span> at top companies
          and fast-growing startups.
        </p>

        {/* Absolutely Positioned Decorative Image in Bottom Left (hidden on mobile) */}
        <img
          src="https://wellfound.com/webpack/9b5896045caa26ad3af1fc3d0470408e.png"
          alt=""
          className="hidden md:block absolute bottom-0 left-0 max-w-[280px] z-0 pointer-events-none select-none"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center tracking-tight">
            Sign Up
          </h2>

          {/* Google Signup Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-4 bg-white text-gray-800 font-semibold shadow-sm hover:bg-gray-50 transition mb-8 text-lg"
          >
            <svg className="w-7 h-7" viewBox="0 0 48 48">
              <g>
                <path
                  d="M44.5,20H24v8.5h11.7c-1.1,3-4.2,5.6-8.5,5.6c-5.1,0-9.2-4.2-9.2-9.2s4.2-9.2,9.2-9.2c2.5,0,4.8,0.9,6.6,2.4l6.3-6.3
                C38.2,8.3,31.7,6,24,6C12.9,6,4,14.9,4,26s8.9,20,20,20c11.1,0,20-8.9,20-20C44,23.3,44.3,21.6,44.5,20z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M6.3,14.7l7,5.1C15.1,17.2,19.2,14,24,14c2.5,0,4.8,0.9,6.6,2.4l6.3-6.3C38.2,8.3,31.7,6,24,6
                  C15.1,6,7.6,11.7,6.3,14.7z"
                  fill="#EA4335"
                ></path>
                <path
                  d="M24,46c6.7,0,12.3-2.2,16.5-5.9l-7.7-6.3c-2.1,1.5-4.7,2.3-7.7,2.3c-4.2,0-7.9-2.7-9.2-6.4l-7.1,5.5
                C9.9,43,16.4,46,24,46z"
                  fill="#34A853"
                ></path>
                <path
                  d="M44.5,20H24v8.5h11.7c-0.5,2.2-1.7,4.2-3.5,5.7c0,0,7.7,6.3,7.7,6.3C42.9,38.4,44,32.7,44.5,20z"
                  fill="#4285F4"
                ></path>
              </g>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-base">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Main Signup Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
            encType="multipart/form-data"
            noValidate
            autoComplete="off"
          >
            {/* Username */}
            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                id="username"
                className="py-4 px-6 rounded-xl border border-gray-300 text-gray-900 text-lg focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-600 text-base mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  className="py-4 px-6 pr-20 rounded-xl border border-gray-300 text-gray-900 text-lg focus:ring-2 focus:ring-black outline-none w-full"
                  placeholder="Enter your email"
                  disabled={isEmailVerified}  // optional: disable input after verification
                />
                <button
                  type="button"
                  className={`absolute right-5 top-1/2 -translate-y-1/2 font-bold text-base bg-transparent border-none p-0 m-0 cursor-pointer ${isEmailVerified ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:underline"
                    } focus:outline-none`}
                  style={{ boxShadow: "none" }}
                  onClick={handleVerifyEmail}
                  disabled={isEmailVerified}
                >
                  {isEmailVerified ? "Verified" : "Verify"}
                </button>
              </div>
              {errors.email && <p className="text-red-600 text-base mt-1">{errors.email.message}</p>}
            </div>


            {/* Mobile Number */}
            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold mb-2" htmlFor="number">
                Mobile No.
              </label>
              <input
                {...register("number", { required: "Mobile number is required" })}
                type="tel"
                id="number"
                className="py-4 px-6 rounded-xl border border-gray-300 text-gray-900 text-lg focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter your mobile number"
              />
              {errors.number && (
                <p className="text-red-600 text-base mt-1">{errors.number.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-gray-900 font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 8, message: "Maximum 8 characters" },
                })}
                type="password"
                id="password"
                className="py-4 px-6 rounded-xl border border-gray-300 text-gray-900 text-lg focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-600 text-base mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Resume Upload */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="resume" className="text-gray-900 font-semibold mb-2">
                Upload Resume
              </label>
              <input
                {...register("resume", { required: "Resume file is required" })}
                type="file"
                name = "resume"
                id="resume"
                accept=".pdf,.doc,.docx"
                className="py-4 px-6 rounded-xl border border-gray-300 text-gray-700 text-lg cursor-pointer focus:ring-2 focus:ring-black outline-none"
              />
              {errors.resume && (
                <p className="text-red-600 text-base mt-1">{errors.resume.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <input
                type="submit"
                value={isSubmitting ? "Signing up..." : "Sign Up"}
                disabled={isSubmitting}
                className={`w-full max-w-sm cursor-pointer rounded-xl py-5 mt-2 bg-black font-bold text-white text-xl shadow-md 
                  hover:bg-gray-800 transition ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
              />
            </div>
          </form>

          {/* Login Instead */}
          <p className="mt-8 text-center text-gray-700 font-medium tracking-wide text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <Otp
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={handleOtpVerify}
      />
    </div>
  );
}
