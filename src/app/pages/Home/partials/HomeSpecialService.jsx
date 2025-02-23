import React from 'react';

export default function HomeSpecialService() {
  return (
    <div className="relative min-h-screen">
      {/* Background image mờ */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/top-view-spa-element-collection_23-2148200204.jpg')",
        }}
      ></div>

      {/* Nội dung chính */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-8 flex flex-wrap items-center">
        {/* Left Side */}
        <div className="md:w-1/2 translate-x-12 flex items-center justify-center relative overflow-hidden rounded-lg shadow-lg mb-6 md:mb-0">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/2-natural-skincare-brands-670eadb4e4fcf.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*"
            alt="Skincare Collection"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Exquisite Collection of Must-Have Essentials
            </h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 md:p-12 translate-x-6">
          <h2 className="text-4xl font-roboto text-gray-800 mb-10 text-center pb-4">
            {/* Bạn có thể thêm tiêu đề phụ tại đây */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover mb-4 transition-transform duration-300 hover:scale-110"
                />
                <h3 className="text-2xl font-semibold text-gray-800 text-center">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    title: "Facial Treatment",
    image:
      "https://hoamoctamanspa.vn/wp-content/uploads/2023/11/6-review-top-5-dia-chi-spa-cham-soc-da-tai-Ha-Noi.jpg",
  },
  {
    title: "Anti-aging Care",
    image: "https://medicviet.vn/uploads/images/dich-vu-massage-2.jpg",
  },
  {
    title: "Acne Treatment",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnjoUXVZo3q7EaieFSEjwm5F0PN_tP8TB_mw&s",
  },
  {
    title: "Brightening Serum",
    image:
      "https://www.vinmec.com/static/uploads/20210612_022232_200493_tiem_filler_va_boto_max_1800x1800_jpg_c72d179600.jpg",
  },
];
