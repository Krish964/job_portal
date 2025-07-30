import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginpageImg from "/src/assets/LoginpageImg.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to the main page
      navigate("/mainpage");
    } catch (err) {
      setError(err.message);
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex flex-col">
        <span
          className="text-5xl font-bold text-blue-600 tracking-wide select-none text-center my-3"
          style={{ letterSpacing: "1.5px" }}
        >
          Job<span className="text-black">Portal</span>
        </span>
        <div className="flex justify-around items-center h-[70vh] w-[80vw] shadow-2xl rounded-2xl">
          <div className="left">
            <img className="w-[600px]" src={LoginpageImg} alt="Login" />
          </div>
          <div className="right flex flex-col gap-5 p-6">
            <h1 className="text-6xl font-bold font-mono text-blue-900">
              Login
            </h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="email flex flex-col gap-2">
                <label
                  className="text-2xl text-blue-900 font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border-2 border-blue-800 px-7 py-5 w-[25vw] rounded-xl"
                  type="text"
                  name="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password flex flex-col gap-2">
                <label
                  className="text-2xl text-blue-900 font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border-2 border-blue-800 px-7 py-5 w-[25vw] rounded-xl"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <input
                className="border-2 px-7 py-5 w-[25vw] rounded-xl bg-blue-600 text-white text-2xl font-semibold cursor-pointer font-sans"
                type="submit"
                value="Login"
              />
            </form>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline mt-3 text-center text-xl"
            >
              Forgot Password?
            </Link>
            <p className="text-xl text-center font-medium">
              New to the account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline mt-3 text-center text-xl"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
