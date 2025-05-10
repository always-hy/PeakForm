const DashboardPreview = () => {
  return (
    <section className="flex flex-wrap gap-5 justify-center items-start px-7 pt-10 pb-40 mt-2.5 w-full bg-black max-md:px-5 max-md:pb-24">
      <img
        src="/dashboard.svg"
        alt="Dashboard Preview"
        className="object-contain aspect-[1.87] min-w-60 w-[1295px]"
      />
    </section>
  );
};

export default DashboardPreview;
