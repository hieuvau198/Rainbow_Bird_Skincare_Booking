import React, { useState, useEffect } from 'react';

const HomeBanner = () => {
  const slides = [
    "https://thehowardcenterforwellness.com/wp-content/uploads/img-home-banner-slide-01.webp",
    "https://thehowardcenterforwellness.com/wp-content/uploads/home-banner-bg-img02.webp",
    "https://thehowardcenterforwellness.com/wp-content/uploads/home-banner-bg-img03.webp",
    "https://thehowardcenterforwellness.com/wp-content/uploads/home-banner-bg-img04.webp"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden h-[574px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            className="w-full h-full object-cover"
            src={slide}
            alt={`Slide ${index + 1}`}
            loading="lazy"
          />
        </div>
      ))}

      {/* Nội dung */}
      <div className="absolute inset-0 z-20 flex items-center text-white bg-black bg-opacity-30">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="text-10xl font-extrabold sm:text-5xl">
              Empowering Minds: <br /> Your Wellness Journey Begins
            </h1>
            <p className="mt-8 text-lg sm:text-base">
              Welcome to Turning Well, your comprehensive hub for mental health and wellness. We believe that mental well-being is the cornerstone of a fulfilling life. Our mission is to provide you with the resources, support, and guidance you need to thrive.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-teal-600 font-medium py-3 px-6 rounded-md mt-6 hover:bg-gray-200 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Dấu chấm điều hướng */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-gray-400 w-2.5"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
