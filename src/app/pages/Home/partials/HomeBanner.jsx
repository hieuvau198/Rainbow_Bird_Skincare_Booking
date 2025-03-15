import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeBanner = () => {
  const slides = [
    "https://www.mayasbeautypalace.com/cdn/shop/articles/ultimate-guide-to-the-best-natural-skincare-products-229620.webp?v=1723660199&width=1920",
    "https://www.voyantbeauty.com/wp-content/uploads/2024/11/Industry-News-Vegan-Cosmetics-Growing-Beauty-Trend-FB-LI-WP-1080x675.png",
    "https://www.voyantbeauty.com/wp-content/uploads/2022/06/Voyant-WP-Beauty-Trends-2023-1080x675.jpg",
    "https://infinitekparis.com/wp-content/uploads/2023/01/mujer-cuidado-facial-bano-woman-skincare-bathroom-infinitek.jpg"
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
            Enhancing Radiance: <br /> Your Skincare Journey Begins
            </h1>
            <p className="mt-8 text-lg sm:text-base">
            Welcome to Prestine Care, your dedicated hub for premium skincare solutions. We believe that healthy, glowing skin is the foundation of confidence and vitality. Our mission is to empower you with expert guidance, advanced treatments, and personalized care to reveal your natural beauty.            </p>
            <Link
              to="./therapists"
              targer="_top"
              className="inline-block bg-white text-teal-600 font-medium py-3 px-6 rounded-md mt-6 hover:bg-gray-200 transition"
            >
              Find a Therapist
            </Link>
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
