"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import SocialLoginButton from "./SocialLoginButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }).toString(),
        credentials: "include", // Include cookies for session management
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Redirect or update app state (e.g., to dashboard)
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex relative justify-center items-center p-5 h-screen bg-black overflow-hidden">
      {/* Green radial glow that overlays everything */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(5,163,29,0.15)_0%,rgba(5,163,29,0)_100%)] blur-[120px] pointer-events-none z-10" />

      {/* Login Form */}
      <article className="flex relative flex-col gap-10 items-center px-20 py-10 rounded-3xl border-green-500 border-opacity-30 border-solid backdrop-blur-[12px] bg-zinc-900 bg-opacity-40 border-[2px] w-[410px] max-md:px-10 max-md:py-8 max-md:max-w-[410px] max-md:w-[90%] max-sm:gap-5 max-sm:p-5 overflow-hidden z-9">
        <h1 className="text-2xl font-semibold text-white">PEAKFORM</h1>
        <div className="flex flex-col gap-6 w-[250px] max-sm:w-full">
          <h2 className="text-2xl font-semibold text-white">Login</h2>

          {/* Form with onSubmit handler */}
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              placeholder="username@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-2">
              <PasswordInput
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-white cursor-pointer text-left"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full h-10 text-base font-semibold text-white bg-green-500 rounded-lg cursor-pointer border-[none] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-sm font-semibold text-center text-red-500">
              {error}
            </p>
          )}

          <p className="text-sm font-semibold text-center text-white">
            or continue with
          </p>

          <div className="flex gap-4 w-full max-sm:flex-col">
            <SocialLoginButton provider="google" />
            <SocialLoginButton provider="github" />
            <SocialLoginButton provider="facebook" />
          </div>

          <p className="text-xs font-semibold text-center text-white">
            Don't have an account yet?{" "}
            <button
              onClick={() =>
                (window.location.href = "http://localhost:3000/register")
              }
              className="font-bold text-white cursor-pointer"
            >
              Register for free
            </button>
          </p>
        </div>
      </article>
    </section>
  );
}

export default LoginForm;
