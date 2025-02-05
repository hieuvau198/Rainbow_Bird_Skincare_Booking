import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function HomePopularService() {
  const services = [
    { id: 1, name: 'Facial Treatment', rating: 4.5, image: 'https://fuchsiaspa.com/wp-content/uploads/Facials_Spa-01.jpg' },
    { id: 2, name: 'Acne Solutions', rating: 4.0, image: 'https://www.quinnplasticsurgery.com/assets/img/blog/shutterstock_352907567-645x423.jpg' },
    { id: 3, name: 'Skin Brightening', rating: 4.8, image: 'https://biancobeauty.co.uk/wp-content/uploads/2020/11/woman-having-facial.jpg' },
    { id: 4, name: 'Anti-Aging Care', rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrY-MpyEZvj5Zc9a_gf36du3lCHclQ7OSlw&s' },
    { id: 5, name: 'Hydration Therapy', rating: 4.6, image: 'https://images.pexels.com/photos/5069422/pexels-photo-5069422.jpeg' },
    { id: 6, name: 'Detox Facial', rating: 4.4, image: 'https://images.pexels.com/photos/3764018/pexels-photo-3764018.jpeg' },
  ];

  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const index = Math.round(scrollContainerRef.current.scrollLeft / 960);
      setActiveIndex(index);
    };
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 py-10 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🔥 HOT SERVICES 🔥</h2>
      <div className="relative flex justify-center w-full max-w-7xl px-8">
        <button
          onClick={scrollLeft}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-green-700 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition duration-300 z-10"
        >
          <FaChevronLeft size={20} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll space-x-6 px-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflow: 'hidden' }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex-none transform transition duration-300 hover:scale-105 hover:shadow-2xl snap-start"
              style={{ width: '320px', height: '320px' }}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-2/3 object-cover rounded-t-2xl"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                <p className="text-sm text-gray-600">Rating: {service.rating} ⭐</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-green-700 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition duration-300 z-10"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${activeIndex === index ? 'bg-green-700' : 'bg-gray-400'} transition duration-300`}
          ></span>
        ))}
      </div>
    </div>
  );
}
