import React, { useState } from "react";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
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

    // Simulate successful password reset
    setSuccess("Password reset successful!");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-cyan-900 flex items-center justify-center px-4">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10">
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center tracking-tight">
          Reset Your Password
        </h2>
        <p className="text-indigo-300 text-center mb-8">
          Enter a strong new password and confirm it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-indigo-200 font-semibold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-xl px-4 py-3 bg-gray-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-indigo-200 font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-xl px-4 py-3 bg-gray-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
              autoComplete="new-password"
              minLength={8}
              required
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
            className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-600 hover:from-purple-700 hover:via-indigo-800 hover:to-cyan-700 text-white text-lg font-bold rounded-xl py-3 shadow-lg transition-transform active:scale-95"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
