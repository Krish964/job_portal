import React, { useState } from "react";

export default function Otp({ isOpen, onClose, onVerify }) {
  // State for each OTP digit
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Handle change for each input
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) { // only digits allowed
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // only last digit
      setOtp(newOtp);

      // Auto focus next input if digit entered
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle Verify button click
  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      alert("Please enter all 4 digits");
      return;
    }
    onVerify(otpCode);
  };

  // Close modal if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-xl"
          aria-label="Close OTP modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
