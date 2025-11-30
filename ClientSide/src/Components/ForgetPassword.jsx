import React, { useState } from "react";
import emailImg from "/src/assets/Email.png";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white rounded-2xl flex max-w-5xl w-full overflow-hidden shadow-md border border-gray-200">
        {/* Left: Illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 p-12">
          <img
            src={emailImg}
            alt="Security Illustration"
            className="w-72 h-72 object-contain rounded-lg"
          />
        </div>

        {/* Right: Form */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-black mb-6 select-none">
            Forgot Password?
          </h2>
          <p className="mb-8 text-base text-gray-700 max-w-md">
            Enter your registered email address to receive an OTP.
          </p>

          <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
            <label
              className="text-gray-800 font-semibold text-base"
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
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 text-base transition"
              disabled={isSending}
            />

            <button
              type="submit"
              disabled={isSending}
              className={`mt-5 w-full text-white font-semibold py-3 rounded-lg text-base shadow-sm transition focus:outline-none ${
                isSending
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }`}
            >
              {isSending ? "Sending..." : "Send OTP"}
            </button>
          </form>

          {/* Success and error messages */}
          {message && (
            <p className="mt-4 text-green-600 font-medium select-none">{message}</p>
          )}
          {error && (
            <p className="mt-4 text-red-600 font-medium select-none">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
