import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("password", data.password);
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }

    // Show loading toast
    const toastId = toast.loading("Creating your account...");

    try {
      const res = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      localStorage.setItem("resume" , text.resume)
      if (res.ok) {
        toast.update(toastId, {
          render: "Signup successful! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/mainpage");
        }, 1200);
      } else {
        toast.update(toastId, {
          render: text || "Signup failed!",
          type: "error",
          isLoading: false,
          autoClose: 2500,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 2600,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-700 px-6">
      <div
        className="w-full max-w-4xl
          h-auto
          rounded-2xl shadow-2xl bg-black/85 bg-clip-padding
          backdrop-filter backdrop-blur-xl p-12 border border-cyan-700/40
          flex flex-col items-center justify-center space-y-4"
      >
        <h1 className="text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 tracking-widest text-center select-none">
          Job<span className="text-white bg-none">Portal</span>
        </h1>
        <h2 className="text-3xl font-semibold mb-8 text-cyan-300 text-center">Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          encType="multipart/form-data"
          noValidate
        >
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-cyan-300 font-medium mb-2">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              autoComplete="username"
              className="py-3 px-5 rounded-xl bg-black/80 border border-cyan-700 text-cyan-100 placeholder-cyan-500 outline-none focus:ring-2 focus:ring-cyan-400 transition"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-cyan-300 font-medium mb-2">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              autoComplete="email"
              className="py-3 px-5 rounded-xl bg-black/80 border border-cyan-700 text-cyan-100 placeholder-cyan-500 outline-none focus:ring-2 focus:ring-cyan-400 transition"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          {/* Mobile Number */}
          <div className="flex flex-col">
            <label className="text-cyan-300 font-medium mb-2">Mobile No.</label>
            <input
              {...register("number", { required: "Mobile number is required" })}
              type="tel"
              autoComplete="tel"
              className="py-3 px-5 rounded-xl bg-black/80 border border-cyan-700 text-cyan-100 placeholder-cyan-500 outline-none focus:ring-2 focus:ring-cyan-400 transition"
              placeholder="Enter your mobile number"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <label className="text-cyan-300 font-medium mb-2">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 8, message: "Maximum 8 characters" },
              })}
              type="password"
              autoComplete="new-password"
              className="py-3 px-5 rounded-xl bg-black/80 border border-cyan-700 text-cyan-100 placeholder-cyan-500 outline-none focus:ring-2 focus:ring-cyan-400 transition"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          {/* Resume Upload */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="resume" className="text-cyan-300 font-medium mb-2">
              Upload Resume
            </label>
            <input
              {...register("resume", { required: "Resume file is required" })}
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              className="py-3 px-4 rounded-xl bg-black/80 border border-cyan-700 text-cyan-100 placeholder-cyan-500 cursor-pointer focus:ring-2 focus:ring-cyan-400 transition"
            />
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <input
              type="submit"
              value={isSubmitting ? "Signing up..." : "Sign Up"}
              disabled={isSubmitting}
              className={`w-full max-w-sm cursor-pointer rounded-xl py-4 bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-white text-xl shadow-lg hover:from-cyan-400 hover:to-purple-500 transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
            />
          </div>
        </form>
        <p className="mt-6 text-center text-cyan-300 font-medium tracking-wide">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-200 hover:text-cyan-100 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
