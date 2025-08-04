import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or expired password reset link.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://jobportal-production-327b.up.railway.app/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.error || "Reset failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-cyan-900 flex items-center justify-center px-6">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10 border border-cyan-700">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-6 text-center tracking-tight select-none">
          Reset Your Password
        </h2>
        <p className="text-cyan-300 text-center mb-8">
          Enter a strong new password and confirm it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-cyan-300 font-semibold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl px-4 py-3 bg-gray-800 text-white placeholder-cyan-400 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-cyan-300 font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl px-4 py-3 bg-gray-800 text-white placeholder-cyan-400 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-red-500 font-semibold text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-400 font-semibold text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-lg font-bold rounded-xl py-3 shadow-lg transition-transform active:scale-95`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
