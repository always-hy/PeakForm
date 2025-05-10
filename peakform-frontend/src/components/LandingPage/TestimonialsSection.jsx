"use client";
import React, { useState, useCallback } from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      content:
        "I really like the system at this management, i love recommending this software to you guys",
      author: "Alfredo Lubin",
      rating: "/stars.svg",
      quote: "/quotes.png",
    },
    {
      content:
        '"We alighn our succeess with the success of our customers which is why our offering transcends our software".',
      author: "Randy Levin",
      rating: "/stars.svg",
      quote: "/quotes.png",
    },
    {
      content:
        "I really like the system at this management, i love recommending this software to you guys",
      author: "Angel Mango",
      rating: "/stars.svg",
      quote: "/quotes.png",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  return (
    <section className="flex flex-col items-center mt-2.5 w-full min-h-[750px]">
      <div className="flex flex-col justify-center max-w-full w-[1067px]">
        <div className="flex overflow-hidden relative gap-1 justify-center items-center self-center px-3 py-2 bg-lime-950 rounded-[32px]">
          <img src="/speech.svg" className="w-4 h-4" alt="Testimonial Icon" />
          <span className="text-sm font-medium text-green-500">
            Testimonials
          </span>
        </div>
        <h2 className="px-4 sm:px-24 mt-4 w-full text-3xl sm:text-5xl font-bold text-center text-zinc-50">
          What are people saying
        </h2>
        <p className="mt-4 text-lg leading-8 text-center text-neutral-400 px-4">
          "Thank you for your trust in Crypt Land! We are grateful for your
          feedback and are committed to providing the best [products/services
          offered]. Read what our clients have to say about their experience
          with us.
        </p>
      </div>

      <div className="relative w-full max-w-[1920px] mt-20 px-4 sm:px-8">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
                style={{ transform: `translateX(${currentSlide * 100}%)` }}
              >
                <TestimonialCard
                  content={testimonial.content}
                  author={testimonial.author}
                  image={testimonial.image}
                  rating={testimonial.rating}
                  quote={testimonial.quote}
                  className="mx-auto max-w-[655px]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3.5 items-center justify-center mt-10">
          <button
            onClick={prevSlide}
            className="transition-opacity hover:opacity-80"
            aria-label="Previous testimonial"
          >
            <img
              src="/leftarrow.svg"
              className="w-[60px] aspect-square"
              alt="Previous"
            />
          </button>
          <button
            onClick={nextSlide}
            className="transition-opacity hover:opacity-80"
            aria-label="Next testimonial"
          >
            <img
              src="rightarrow.svg"
              className="w-[60px] aspect-square"
              alt="Next"
            />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-green-500 w-4" : "bg-neutral-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
