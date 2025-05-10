const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.svg"
        className="object-contain w-[18px] aspect-square"
        alt="PeakForm Logo"
      />
      <span className="text-xl font-semibold text-zinc-50">PeakForm</span>
    </div>
  );
};

export default Logo;
