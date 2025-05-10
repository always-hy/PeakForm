import PricingCard from "./PricingCard";
const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Basic",
      price: "499",
      description:
        "Get a professional website designed according to your needs.",
      features: [
        "Get a fully designed Website.",
        "Webflow Development",
        "Limited Support",
      ],
      buttonText: "Get started",
      buttonVariant: "primary",
    },
    {
      title: "Pro",
      price: "499",
      description:
        "Get a professional website designed according to your needs.",
      features: [
        "Get a fully designed Website.",
        "Webflow Development",
        "Limited Support",
        "Standard integrations",
        "Email support",
        "Email support",
      ],
      buttonText: "Get started",
      buttonVariant: "light",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "999",
      description:
        "Get a professional website designed according to your needs.",
      features: [
        "Get a fully designed Website.",
        "Webflow Development",
        "Limited Support",
        "Standard integrations",
        "Email support",
        "Email support",
        "Email support",
        "Email support",
      ],
      buttonText: "Contact Us",
      buttonVariant: "green",
    },
  ];

  return (
    <section className="mt-2.5 w-full min-h-[1298px]">
      <div className="flex overflow-hidden gap-2.5 justify-center items-center py-16 sm:py-32 px-4 sm:px-24 w-full bg-zinc-900">
        <div className="flex flex-col self-stretch my-auto min-w-60 w-[1261px]">
          <div className="flex flex-col justify-center self-center max-w-full w-[1067px]">
            <div className="flex overflow-hidden relative gap-1 justify-center items-center self-center px-3 py-2 bg-lime-950 rounded-[32px]">
              <span className="text-sm font-medium text-green-500">
                Pricing
              </span>
            </div>
            <h2 className="px-24 mt-4 w-full text-5xl font-bold text-center text-zinc-50 max-md:px-5 max-md:text-4xl">
              Find the right plan
            </h2>
            <p className="mt-4 text-lg leading-8 text-center text-neutral-400">
              "Invest in your company's future with our comprehensive financial
              solution. Contact us for pricing details and see how we can help
              you streamline your finances and reach your business goals.
            </p>
          </div>

          <div className="flex gap-6 items-stretch">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
