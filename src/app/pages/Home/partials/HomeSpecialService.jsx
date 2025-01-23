import React from 'react';

export default function HomeSpecialService() {
  return (
    <div className="bg-gray-100 py-16 flex flex-wrap">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative pl-4">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/2-natural-skincare-brands-670eadb4e4fcf.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*"
          alt="Skincare Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center px-4">
            Our Exquisite Collection of Must-Have Essentials
          </h2>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Special Skincare Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Facial Treatment */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://hoamoctamanspa.vn/wp-content/uploads/2023/11/6-review-top-5-dia-chi-spa-cham-soc-da-tai-Ha-Noi.jpg"
              alt="Facial Treatment"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">Facial Treatment</h3>
          </div>

          {/* Anti-aging Care */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://medicviet.vn/uploads/images/dich-vu-massage-2.jpg"
              alt="Anti-aging Care"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">Anti-aging Care</h3>
          </div>

          {/* Acne Treatment */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnjoUXVZo3q7EaieFSEjwm5F0PN_tP8TB_mw&s"
              alt="Acne Treatment"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">Acne Treatment</h3>
          </div>

          {/* Brightening Serum */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://www.vinmec.com/static/uploads/20210612_022232_200493_tiem_filler_va_boto_max_1800x1800_jpg_c72d179600.jpg"
              alt="Brightening Serum"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">Brightening Serum</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
