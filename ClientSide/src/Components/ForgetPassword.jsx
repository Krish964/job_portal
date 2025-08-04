import React, { useState } from "react";
import emailImg from "/src/assets/Email.png";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // success/failure message
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false); // to track button state

  const handleSendOtp = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSending(true);

    fetch("https://jobportal-production-327b.up.railway.app/api/users/forgetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage(`Mail has been sent to ${email}`);
        } else {
          setError(data.error || "Something went wrong");
        }
        setIsSending(false);
      })
      .catch((err) => {
        setError("Failed to send request. Please try again.");
        setIsSending(false);
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-cyan-900 px-4">
      <div className="bg-black/80 backdrop-blur-lg rounded-3xl flex max-w-5xl w-full overflow-hidden shadow-2xl border border-cyan-700">
        {/* Left: Illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-b from-cyan-700 to-indigo-900 p-12">
          <img
            src={emailImg}
            alt="Security Illustration"
            className="w-80 h-80 object-contain drop-shadow-lg"
          />
        </div>

        {/* Right: Form */}
        <div className="flex-1 p-14 flex flex-col justify-center">
          <h2 className="text-5xl font-extrabold text-cyan-400 mb-6 select-none">
            Forgot Password?
          </h2>
          <p className="text-cyan-300 mb-10 text-lg">
            Enter your registered email address to receive an OTP.
          </p>

          <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
            <label
              className="text-cyan-300 font-semibold text-lg"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-xl border border-cyan-600 bg-black/70 px-6 py-4 text-cyan-200 placeholder-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg transition"
              disabled={isSending}
            />

            <button
              type="submit"
              disabled={isSending}
              className={`mt-6 w-full text-white font-bold py-4 rounded-2xl text-xl shadow-lg transition-transform transform focus:outline-none focus:ring-4 focus:ring-cyan-400 ${isSending
                  ? "bg-cyan-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-600 to-purple-700 hover:from-purple-700 hover:to-cyan-600 hover:scale-105"
                }`}
            >
              {isSending ? "Sending..." : "Send OTP"}
            </button>
          </form>

          {/* Success and error message display */}
          {message && (
            <p className="mt-4 text-green-400 font-semibold">{message}</p>
          )}
          {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
