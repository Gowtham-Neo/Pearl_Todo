import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signin from "../../assets/Signin.png";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.length >= 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }
    const csrfToken = localStorage.getItem("csrfToken");
    console.log(csrfToken);
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Sign-in failed");
      }

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Sign-in successful");
      navigate("/TaskDashboard");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-4xl p-6 bg-white border border-gray-300 rounded-lg shadow-md md:flex-row">
        <div className="p-4 md:w-full md:border-r ">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 ">
            Sign In
          </h1>
          <div>
            <form onSubmit={handlesubmit}>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <div className="md:w-full">
          <img
            src={signin}
            alt="signin"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
