"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [message, setMessage] = useState("");

  // Define the callback function and attach it to the window object
  useEffect(() => {
    window.handleRecaptcha = (token) => {
      setRecaptchaToken(token);
    };

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.handleRecaptcha; // Clean up the global function
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        ...formData,
        recaptchaResponse: recaptchaToken,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || "Registration failed.");
    }
  };

  return (
    <section className="flex relative justify-center items-center p-5 h-screen bg-black overflow-hidden">
      {/* Green radial glow that overlays everything */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(5,163,29,0.15)_0%,rgba(5,163,29,0)_100%)] blur-[120px] pointer-events-none z-10" />

      {/* Register Form */}
      <article className="flex relative flex-col gap-10 items-center px-20 py-10 rounded-3xl border-green-500 border-opacity-30 border-solid backdrop-blur-[12px] bg-zinc-900 bg-opacity-40 border-[2px] w-[410px] max-md:px-10 max-md:py-8 max-md:max-w-[410px] max-md:w-[90%] max-sm:gap-5 max-sm:p-5 overflow-hidden z-9">
        <h1 className="text-2xl font-semibold text-white">PEAKFORM</h1>
        <div className="flex flex-col gap-6 w-[250px] max-sm:w-full">
          <h2 className="text-2xl font-semibold text-white">Register</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="px-3 py-2 text-white bg-transparent border rounded-md border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-2 text-white bg-transparent border rounded-md border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-3 py-2 text-white bg-transparent border rounded-md border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div
              className="g-recaptcha"
              data-sitekey="6LfyBfwqAAAAANLziwcCpULcsp-DvI3xGZQZD8Ci"
              data-callback="handleRecaptcha"
            ></div>
            <button
              type="submit"
              className="w-full h-10 text-base font-semibold text-white bg-green-500 rounded-lg cursor-pointer border-[none] disabled:opacity-50"
            >
              Register
            </button>
          </form>

          <p className="text-xs font-semibold text-center text-white">
            Have an account?{" "}
            <button
              onClick={() => (window.location.href = "http://localhost:3000/")}
              className="font-bold text-white cursor-pointer"
            >
              Login
            </button>
          </p>
          {message && (
            <p className="text-sm font-semibold text-center text-green-400">
              {message}
            </p>
          )}
        </div>
      </article>
    </section>
  );
};

export default RegistrationForm;
