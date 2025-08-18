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

    const toastId = toast.loading("Creating your account...");

    try {
      const res = await fetch(`http://localhost:8000/api/users/register`, {
        method: "POST",
        body: formData,
      });

      const dataResponse = await res.json();
      console.log("User ID:", dataResponse.user?._id);
      if (res.ok) {
        localStorage.setItem("resume", dataResponse.resume || "");
        localStorage.setItem("username", dataResponse.username || data.username || "");
        localStorage.setItem("userId" , dataResponse.user?._id)

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6">
      <div
        className="w-full max-w-4xl rounded-3xl bg-white shadow-xl p-12 border border-blue-200
          flex flex-col items-center justify-center space-y-6"
      >
        <h1 className="text-6xl font-black mb-3 text-gray-900 tracking-widest text-center select-none">
          Job<span className="text-indigo-700">Portal</span>
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">Sign Up</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
          encType="multipart/form-data"
          noValidate
          autoComplete="off"
        >
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-2" htmlFor="username">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              id="username"
              className="py-3 px-5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-2" htmlFor="email">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              className="py-3 px-5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-2" htmlFor="number">Mobile No.</label>
            <input
              {...register("number", { required: "Mobile number is required" })}
              type="tel"
              id="number"
              className="py-3 px-5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              placeholder="Enter your mobile number"
            />
            {errors.number && (
              <p className="text-red-600 text-sm mt-1">{errors.number.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-medium mb-2" htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 8, message: "Maximum 8 characters" },
              })}
              type="password"
              id="password"
              className="py-3 px-5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="resume" className="text-gray-800 font-medium mb-2">Upload Resume</label>
            <input
              {...register("resume", { required: "Resume file is required" })}
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              className="py-3 px-4 rounded-xl border border-gray-300 text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
            />
            {errors.resume && (
              <p className="text-red-600 text-sm mt-1">{errors.resume.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <input
              type="submit"
              value={isSubmitting ? "Signing up..." : "Sign Up"}
              disabled={isSubmitting}
              className={`w-full max-w-sm cursor-pointer rounded-xl py-4 bg-gradient-to-r from-indigo-600 to-purple-700 font-bold text-white text-xl shadow-md 
                hover:from-indigo-700 hover:to-purple-800 transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            />
          </div>
        </form>

        <p className="mt-6 text-center text-gray-700 font-medium tracking-wide">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
