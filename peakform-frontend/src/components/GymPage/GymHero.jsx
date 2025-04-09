import React from "react";

/**
 * Feature tag component for gym amenities
 */
function AmenityTag({ children }) {
  return (
    <span className="overflow-hidden self-stretch px-3.5 py-2.5 my-auto rounded-3xl border border-white border-solid bg-black bg-opacity-0">
      {children}
    </span>
  );
}

/**
 * Info item component for gym details
 */
function InfoItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 min-w-60">
      <img
        src={icon}
        alt={`${title} Icon`}
        className="w-6 h-6 object-contain rounded-md mt-1" // use fixed height & top margin for visual alignment
      />
      <div>
        <h3 className="font-bold text-white uppercase">{title}</h3>
        <p className="mt-1 text-gray-500">{description}</p>
      </div>
    </div>
  );
}

/**
 * GymHero component - Hero section with gym details and information
 */
function GymHero() {
  // Gym amenities
  const amenities = [
    { id: 1, name: "Sauna" },
    { id: 2, name: "Restaurant" },
    { id: 3, name: "SPA" },
    { id: 4, name: "Pilates" },
  ];

  // Social media icons
  const socialIcons = [
    {
      id: 1,
      src: "/save.png",
      alt: "Social Media",
    },
    {
      id: 2,
      src: "/like.png",
      alt: "Social Media",
    },
    {
      id: 3,
      src: "/share.png",
      alt: "Social Media",
    },
  ];

  // Gym info items
  const infoItems = [
    {
      id: 1,
      icon: "/location.png",
      title: "Date and time",
      description: "Saturday, February 20",
    },
    {
      id: 2,
      icon: "/opening_hours.png",
      title: "OPENING HOURS",
      description: "6am - 10pm",
    },
    {
      id: 3,
      icon: "/location.png",
      title: "LOCATION",
      description: "Central Park, New York, NY, United States",
    },
  ];

  return (
    <section className="w-full min-h-[889px] max-md:max-w-full">
      {/* Hero Image */}
      <img
        src="/image 1.png"
        alt="Equinox Gym"
        className="object-contain w-full aspect-[3.6] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-full"
      />

      {/* Gym Details Section */}
      <div className="flex flex-col justify-center px-32 py-24 w-full bg-black max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
          {/* Left Column - Gym Description */}
          <div className="flex flex-col text-white min-w-60 w-[523px] max-md:max-w-full">
            {/* Amenity Tags */}
            <div className="flex gap-1 items-center self-start text-base leading-loose whitespace-nowrap bg-black bg-opacity-0 max-md:max-w-full">
              {amenities.map((amenity) => (
                <AmenityTag key={amenity.id}>{amenity.name}</AmenityTag>
              ))}
            </div>

            {/* Gym Name */}
            <h2 className="mt-2.5 text-6xl leading-none max-md:max-w-full max-md:text-4xl">
              EQUINOX
            </h2>

            {/* Gym Description */}
            <p className="mt-2.5 text-lg leading-7 max-md:max-w-full">
              Equinox is expensive because they have a lot of amenities (steam
              rooms, saunas, plenty of equipment and class options) plus a ton
              of staff constantly cleaning, stocking towels, refilling supplies,
              etc at multiple convenient locations.
            </p>
          </div>

          {/* Right Column - Gym Info */}
          <div className="min-w-60 w-[550px] max-md:max-w-full">
            {/* Logo and Social Media */}
            <div className="flex flex-wrap gap-4 items-center max-w-full w-[550px]">
              <img
                src="/stars.png"
                alt="Equinox Logo"
                className="object-contain shrink-0 self-stretch my-auto aspect-[5] w-[120px]"
              />
              {socialIcons.map((icon) => (
                <img
                  key={icon.id}
                  src={icon.src}
                  alt={icon.alt}
                  className="object-contain shrink-0 self-stretch my-auto w-11 rounded-3xl aspect-square"
                />
              ))}
            </div>

            {/* Gym Information Items */}
            <div className="flex flex-wrap gap-9 items-start mt-14 w-full text-base leading-loose max-md:mt-10 max-md:max-w-full">
              {infoItems.map((item) => (
                <InfoItem
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GymHero;
