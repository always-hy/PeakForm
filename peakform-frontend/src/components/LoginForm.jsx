"use client";
import React from "react";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import SocialLoginButton from "./SocialLoginButton";

function LoginForm() {
  return (
    <section className="flex relative justify-center items-center p-5 h-screen bg-black overflow-hidden">
      {/* Green radial glow that overlays everything */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(5,163,29,0.15)_0%,rgba(5,163,29,0)_100%)] blur-[120px] pointer-events-none z-10" />

      {/* Login Form */}
      <article className="flex relative flex-col gap-10 items-center px-20 py-10 rounded-3xl border-green-500 border-opacity-30 border-solid backdrop-blur-[12px] bg-zinc-900 bg-opacity-40 border-[2px] w-[410px] max-md:px-10 max-md:py-8 max-md:max-w-[410px] max-md:w-[90%] max-sm:gap-5 max-sm:p-5 overflow-hidden z-9">
        <h1 className="text-2xl font-semibold text-white">PEAKFORM</h1>
        <div className="flex flex-col gap-6 w-[250px] max-sm:w-full">
          <h2 className="text-2xl font-semibold text-white">Login</h2>

          <InputField
            label="Email"
            type="email"
            placeholder="username@gmail.com"
          />

          <div className="flex flex-col gap-2">
            <PasswordInput label="Password" placeholder="Password" />
            <button className="mt-4 text-sm font-semibold text-white cursor-pointer text-left">
              Forgot Password?
            </button>
          </div>

          <button className="w-full h-10 text-base font-semibold text-white bg-green-500 rounded-lg cursor-pointer border-[none]">
            Sign in
          </button>

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
            <button className="font-bold text-white cursor-pointer">
              Register for free
            </button>
          </p>
        </div>
      </article>
    </section>
  );
}

export default LoginForm;
