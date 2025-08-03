import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleIcon = () => (
  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
    <path
      d="M21.805 10.023h-9.92v3.68h5.68c-.242 1.237-1.122 3.627-5.681 3.627-3.422 0-6.211-2.852-6.211-6.365s2.79-6.367 6.211-6.367c1.943 0 3.245.832 3.995 1.55l2.722-2.635c-1.652-1.577-3.758-2.555-6.717-2.555-5.626 0-10.191 4.539-10.191 10.1s4.566 10.1 10.191 10.1c5.88 0 9.882-4.117 9.882-9.922 0-.667-.076-1.142-.158-1.708z"
      fill="#fff"
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
      const response = await fetch("http://localhost:8000/api/users/login", {
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
      localStorage.setItem("isAdmin", data.user.isAdmin ? "true" : "false"); // save admin flag

      toast.update(toastId, {
        render: "Login Successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 1800,
        theme: "dark",
      });

      setTimeout(() => {
        if (data.user.isAdmin) {
          navigate("/adminPanel");   // Admin page redirect
        } else {
          navigate("/mainpage"); // Normal user redirect
        }
      }, 750);
    } catch (err) {
      setError(err.message);
      toast.update(toastId, {
        render: err.message || "Login failed",
        type: "error",
        isLoading: false,
        autoClose: 2200,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  

  const handleGoogleSignIn = () => {
    toast.info("Google Sign-In functionality coming soon!", {
      theme: "dark",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-700">
      <div
        className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg
        h-[550px] md:h-[600px] lg:h-[700px]
        rounded-2xl shadow-2xl bg-black/85 bg-clip-padding
        backdrop-filter backdrop-blur-xl p-8 md:p-10 border border-cyan-700/40
        flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 tracking-wider text-center select-none">
          Job<span className="text-white">Portal</span>
        </h1>
        <h2 className="text-lg font-semibold mb-6 text-cyan-300 text-center">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 w-full text-center p-2 rounded bg-red-700/80 text-red-100 font-bold animate-pulse">
            {error}
          </div>
        )}

        <form className="space-y-4 w-full" onSubmit={handleSubmit} autoComplete="off">
          <label className="w-full block">
            <span className="text-cyan-300 font-medium mb-1 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoFocus
              className="w-full py-3 px-5 rounded-xl bg-black/80 border border-cyan-700 text-cyan-100 placeholder-cyan-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition"
            />
          </label>

          <label className="w-full block">
            <span className="text-cyan-300 font-medium mb-1 block">Password</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full py-3 px-5 rounded-xl bg-black/80 border border-cyan-700 text-cyan-100 placeholder-cyan-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 transition"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold shadow-lg hover:from-cyan-400 hover:to-purple-500 hover:shadow-xl transition text-white text-lg tracking-wide ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5 w-full">
          <div className="flex-grow border-t border-cyan-800" />
          <span className="px-2 text-cyan-400 font-semibold text-sm">or</span>
          <div className="flex-grow border-t border-cyan-800" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-3 rounded-xl border border-cyan-600 text-cyan-300 font-bold text-base bg-gradient-to-r from-black/60 via-cyan-900/60 to-black/60 hover:bg-black/80 hover:text-white shadow-md hover:shadow-cyan-900 transition hover:scale-105"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <div className="mt-4 text-center w-full">
          <Link
            to="/forgot-password"
            className="text-cyan-300/80 hover:text-cyan-200 text-sm font-medium hover:underline transition"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-6 text-center text-cyan-300 font-medium">
          New here?{" "}
          <Link
            to="/signup"
            className="text-cyan-200 hover:text-cyan-100 font-bold hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
