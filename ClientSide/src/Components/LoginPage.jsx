import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleIcon = () => (
  <svg className="w-7 h-7 mr-2" viewBox="0 0 48 48">
    <g>
      <path d="M44.5,20H24v8.5h11.7c-1.1,3-4.2,5.6-8.5,5.6c-5.1,0-9.2-4.2-9.2-9.2s4.2-9.2,9.2-9.2c2.5,0,4.8,0.9,6.6,2.4l6.3-6.3
        C38.2,8.3,31.7,6,24,6C12.9,6,4,14.9,4,26s8.9,20,20,20c11.1,0,20-8.9,20-20C44,23.3,44.3,21.6,44.5,20z"
        fill="#FBBC05"
      ></path>
      <path d="M6.3,14.7l7,5.1C15.1,17.2,19.2,14,24,14c2.5,0,4.8,0.9,6.6,2.4l6.3-6.3C38.2,8.3,31.7,6,24,6
        C15.1,6,7.6,11.7,6.3,14.7z"
        fill="#EA4335"
      ></path>
      <path d="M24,46c6.7,0,12.3-2.2,16.5-5.9l-7.7-6.3c-2.1,1.5-4.7,2.3-7.7,2.3c-4.2,0-7.9-2.7-9.2-6.4l-7.1,5.5
        C9.9,43,16.4,46,24,46z"
        fill="#34A853"
      ></path>
      <path d="M44.5,20H24v8.5h11.7c-0.5,2.2-1.7,4.2-3.5,5.7c0,0,7.7,6.3,7.7,6.3C42.9,38.4,44,32.7,44.5,20z"
        fill="#4285F4"
      ></path>
    </g>
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
        }
        else {
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 z-10">
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center tracking-tight">
            Login
          </h2>
          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 text-gray-800 font-semibold shadow-sm hover:bg-gray-50 transition mb-8 text-lg bg-white"
          >
            <GoogleIcon />
            Sign in with Google
          </button>
          <div className="flex items-center mb-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-base">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          {/* Error */}
          {error && (
            <div className="mb-6 w-full text-center p-3 rounded-lg bg-red-100 text-red-700 font-semibold animate-pulse shadow-md">
              {error}
            </div>
          )}
          {/* Login Form */}
          <form className="space-y-6 w-full" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label className="text-gray-900 font-semibold mb-2 block" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com"
                required
                className="w-full py-3 px-4 rounded-xl border border-gray-400 text-gray-900 text-base placeholder-gray-400 outline-none
                 focus:border-black focus:ring-2 focus:ring-black transition duration-300 shadow-sm"
              />
            </div>

            <div>
              <label className="text-gray-900 font-semibold mb-2 block" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full py-3 px-4 rounded-xl border border-gray-400 text-gray-900 text-base placeholder-gray-400 outline-none
                  focus:border-black focus:ring-2 focus:ring-black transition duration-300 shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-xl bg-black font-bold text-white text-xl shadow-md hover:bg-gray-800 transition
                ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {/* Links */}
          <div className="mt-8 text-center w-full">
            <Link
              to="/forgot-password"
              className="text-gray-800 hover:text-black text-base font-medium hover:underline transition"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-6 text-center text-gray-700 font-medium text-lg">
            New here?{" "}
            <Link
              to="/signup"
              className="text-black font-bold hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Image + Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center  p-12 text-center relative">
        <img
          src="https://wellfound.com/webpack/881d6e4e067748b390ceb61bbc2ac943.png"
          alt="Login Illustration"
          className="max-w-full h-auto mb-8"
        />
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome Back
        </h1>
        <p className="text-xl text-gray-700 max-w-lg font-medium">
          Browse over <span className="font-bold">130K jobs</span> at top companies and fast-growing startups.
        </p>

        <img
          src="https://wellfound.com/webpack/af4b21f54db3e2c60e949acc406bad3d.png"
          alt=""
          className="hidden md:block absolute bottom-0 right-0 max-w-[280px] z-0 pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
