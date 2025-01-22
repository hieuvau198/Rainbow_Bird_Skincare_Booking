import React from 'react';

export default function HomePopularService() {
  const services = [
    { id: 1, name: 'Facial Treatment', rating: 4.5, image: 'https://fuchsiaspa.com/wp-content/uploads/Facials_Spa-01.jpg' },
    { id: 2, name: 'Acne Solutions', rating: 4.0, image: 'https://www.quinnplasticsurgery.com/assets/img/blog/shutterstock_352907567-645x423.jpg' },
    { id: 3, name: 'Skin Brightening', rating: 4.8, image: 'https://biancobeauty.co.uk/wp-content/uploads/2020/11/woman-having-facial.jpg' },
    { id: 4, name: 'Anti-Aging Care', rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrY-MpyEZvj5Zc9a_gf36du3lCHclQ7OSlw&s' },
  ];

  return (
    <div className="bg-gray-100 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Popular Skincare Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {services.map((service) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            key={service.id}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600">Rating: {service.rating} ★</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
