import Button from "./Button";

const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "primary",
  isPopular = false,
}) => {
  return (
    <div className="flex-1 shrink basis-0 min-w-60 relative">
      <div className="relative px-10 pt-20 pb-10 w-full h-[788px] rounded-3xl bg-neutral-900 max-md:px-5 flex flex-col">
        <div className="flex flex-col w-full h-full">
          {/* Title and description */}
          <div className="overflow-hidden text-center">
            <h3
              className={`text-3xl leading-tight whitespace-nowrap ${
                isPopular ? "text-green-500" : "text-zinc-50"
              }`}
            >
              {title}
            </h3>
            <p className="mt-6 text-base leading-6 text-neutral-400">
              {description}
            </p>
          </div>

          {/* Price */}
          <div className="flex flex-col justify-center items-center py-9 mt-12 max-w-full font-medium text-center whitespace-nowrap min-h-[102px] w-[272px] self-center">
            <div className="flex items-center">
              <span className="text-4xl leading-none text-white">${price}</span>
              <span className="pt-4 text-base leading-none text-neutral-200">
                /month
              </span>
            </div>
          </div>

          <hr className="mt-12 w-full bg-neutral-800" />

          {/* Feature list */}
          <ul className="flex flex-col items-start mt-12 w-full mb-16">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex gap-2 items-center mt-2 first:mt-0"
              >
                <img
                  src="/check.svg"
                  className="w-4 aspect-square"
                  alt="Check"
                />
                <span className="text-base leading-tight text-zinc-50">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Button at bottom */}
          <div className="mt-auto">
            <Button variant={buttonVariant} className="w-full">
              {buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Popular badge */}
      {isPopular && (
        <div className="absolute right-6 top-[25px] z-10 flex gap-1 items-center px-3 py-2 text-sm font-medium text-green-500 bg-zinc-800 rounded-[32px] border border-green-500">
          <img src="/popular.svg" className="w-4" alt="Popular" />
          <span>Popular</span>
        </div>
      )}
    </div>
  );
};

export default PricingCard;
