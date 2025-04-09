"use client";
import React, { useState, useRef, useEffect } from "react";

function FeaturedPhotos({ gymPhotos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);

  const photos = [
    {
      id: 1,
      src: `${gymPhotos[1]}`,
      alt: "Gym Photo 1",
    },
    {
      id: 2,
      src: `${gymPhotos[2]}`,
      alt: "Gym Photo 2",
    },
    {
      id: 3,
      src: `${gymPhotos[3]}`,
      alt: "Gym Photo 3",
    },
    {
      id: 4,
      src: `${gymPhotos[4]}`,
      alt: "Gym Photo 4",
    },
    {
      id: 5,
      src: `${gymPhotos[5]}`,
      alt: "Gym Photo 5",
    },
  ];

  const totalPhotos = photos.length;
  const visiblePhotos = 3; // Number of photos visible at once on desktop

  // Handle window resize to adjust visible photos
  useEffect(() => {
    const handleResize = () => {
      // This could be expanded to change visiblePhotos based on screen size
      // For now, we'll keep it simple
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPhotos - visiblePhotos ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition time
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPhotos - visiblePhotos : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition time
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Calculate transform value for slider
  const getSliderTransform = () => {
    // Each photo has width + gap (280px + 24px)
    const slideWidth = 304; // 280px width + 24px gap
    return `translateX(-${currentIndex * slideWidth}px)`;
  };

  return (
    <section className="flex flex-col px-32 py-24 w-full bg-stone-950 max-md:px-5 max-md:max-w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl leading-none text-white max-md:text-4xl">
          Featured Photos
        </h2>
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="flex justify-center items-center w-12 h-12 text-white bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
            aria-label="Previous photos"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="flex justify-center items-center w-12 h-12 text-white bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
            aria-label="Next photos"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden max-w-full">
        <div
          ref={sliderRef}
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: getSliderTransform() }}
        >
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              className="object-contain shrink-0 rounded-2xl aspect-[1.17] min-w-60 w-[280px]"
            />
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPhotos - visiblePhotos + 1 }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? "bg-green-500" : "bg-neutral-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        )}
      </div>
    </section>
  );
}

export default FeaturedPhotos;
