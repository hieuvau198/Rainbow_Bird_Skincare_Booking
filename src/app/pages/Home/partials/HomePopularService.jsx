import React, { useRef } from 'react';

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

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">HOT SERVICES🔥</h2>
      <div className="relative flex justify-center w-full max-w-7xl">
        {/* Button Scroll Left */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-800 text-white p-2 rounded-full shadow-lg hover:bg-green-700 z-10"
        >
          &larr;
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll space-x-4 px-4"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          {services.map((service) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex-none"
              key={service.id}
              style={{ width: '300px', height: '300px' }}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-2/3 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center text-gray-800 mb-1">{service.name}</h3>
                <p className="text-sm text-center text-gray-600">Rating: {service.rating} ⭐</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button Scroll Right */}
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-800 text-white p-2 rounded-full shadow-lg hover:bg-green-700 z-10"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
