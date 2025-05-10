import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center px-4 sm:px-6 pt-12 sm:pt-24 mt-2.5 w-full bg-stone-950">
      <div className="flex flex-col items-center py-8 sm:py-12 w-full max-w-[1280px]">
        <Logo className="mb-8" />

        <nav className="flex flex-wrap justify-center gap-8 text-base text-zinc-400">
          <a href="/login" className="hover:text-white">
            Login
          </a>
          <a href="/dashboard" className="hover:text-white">
            Dashboard
          </a>
          <a href="/gyms" className="hover:text-white">
            Gyms
          </a>
          <a href="/create-workout" className="hover:text-white">
            Create a Workout
          </a>
        </nav>

        <hr className="mt-12 w-full border-zinc-800" />

        <p className="mt-12 text-sm tracking-wide leading-none text-center text-neutral-50">
          @ PeakForm 2025, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
