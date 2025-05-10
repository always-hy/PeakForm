import Button from "./Button";

const CTASection = () => {
  return (
    <section className="w-full bg-black py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Upgrade your fitness experience today!
          </h2>
          <Button variant="green" className="text-lg px-12 py-5 font-semibold">
            Register
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
