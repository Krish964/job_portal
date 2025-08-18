import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleIcon = () => (
  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21.805 10.023h-9.92v3.68h5.68c-.242 1.237-1.122 3.627-5.681 3.627-3.422 0-6.211-2.852-6.211-6.365s2.79-6.367 6.211-6.367c1.943 0 3.245.832 3.995 1.55l2.722-2.635c-1.652-1.577-3.758-2.555-6.717-2.555-5.626 0-10.191 4.539-10.191 10.1s4.566 10.1 10.191 10.1c5.88 0 9.882-4.117 9.882-9.922 0-.667-.076-1.142-.158-1.708z"
      fill="#4285F4"
    />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const response = await fetch(`http://localhost:8000/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("isAdmin", data.user.isAdmin ? "true" : "false");

      toast.update(toastId, {
        render: "Login Successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 1800,
        theme: "colored",
      });

      setTimeout(() => {
        if (data.user.isAdmin) {
          navigate("/adminPanel");
        } else if (data.user.role === "hr") {
          navigate("/HrPage");
        } else {
          navigate("/mainpage");
        }
      }, 750);
    } catch (err) {
      setError(err.message);
      toast.update(toastId, {
        render: err.message || "Login failed",
        type: "error",
        isLoading: false,
        autoClose: 2200,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.info("Google Sign-In functionality coming soon!", {
      theme: "colored",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6">
      <div
        className="w-full max-w-md lg:max-w-lg xl:max-w-xl
          bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center border border-gray-200"
      >
        {/* Brand Heading */}
        <h1 className="text-5xl font-extrabold mb-2 text-gray-900 tracking-wide select-none">
          Job<span className="text-indigo-600">Portal</span>
        </h1>
        <h2 className="text-xl font-semibold mb-8 text-gray-700 text-center">
          Welcome Back
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-6 w-full text-center p-3 rounded-lg bg-red-100 text-red-700 font-semibold animate-pulse shadow-md">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-6 w-full" onSubmit={handleSubmit} autoComplete="off">
          {/* Email Input */}
          <label className="block w-full">
            <span className="text-gray-800 font-medium mb-2 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              required
              autoFocus
              className="w-full py-3 px-6 rounded-2xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 shadow-sm"
            />
          </label>

          {/* Password Input */}
          <label className="block w-full">
            <span className="text-gray-800 font-medium mb-2 block">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full py-3 px-6 rounded-2xl border border-gray-300 text-gray-900 placeholder-gray-400 outline-none
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 shadow-sm"
            />
          </label>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 font-extrabold 
              hover:from-indigo-700 hover:to-purple-800 transition duration-300 text-white text-lg tracking-wide
              ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8 w-full">
          <div className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500 font-semibold text-sm select-none">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-3 rounded-2xl border border-indigo-600 text-indigo-700 font-semibold text-base
            bg-indigo-100 hover:bg-indigo-200 hover:text-indigo-900 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center w-full">
          <Link
            to="/forgot-password"
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline transition"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-indigo-700 font-medium">
          New here?{" "}
          <Link
            to="/signup"
            className="text-purple-700 hover:text-purple-800 font-bold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
