import React, { useRef, useState, useEffect } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaStar, 
  FaStarHalfAlt,
  // Thêm 4 icon
  FaGift, 
  FaLeaf, 
  FaGlobe, 
  FaTruck 
} from 'react-icons/fa';

export default function HomePopularService() {
  const services = [
    { id: 1, name: 'Basic Skincare Treatments', rating: 4.5, image: 'https://fuchsiaspa.com/wp-content/uploads/Facials_Spa-01.jpg' },
    { id: 2, name: 'Pigmentation Treatments', rating: 4.0, image: 'https://www.quinnplasticsurgery.com/assets/img/blog/shutterstock_352907567-645x423.jpg' },
    { id: 3, name: 'Skin Regeneration Treatments', rating: 4.8, image: 'https://biancobeauty.co.uk/wp-content/uploads/2020/11/woman-having-facial.jpg' },
    { id: 4, name: 'Full-Body Spa Services', rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSrY-MpyEZvj5Zc9a_gf36du3lCHclQ7OSlw&s' },
    { id: 5, name: 'Personalized Skincare Services', rating: 4.6, image: 'https://images.pexels.com/photos/5069422/pexels-photo-5069422.jpeg' },
  ];

  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Mỗi "trang" giả sử chứa 3 sản phẩm: 3 x 400 = 1200px
      const index = Math.round(scrollContainerRef.current.scrollLeft / 1200);
      setActiveIndex(index);
    };
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Thanh trên cùng với 4 icons */}

      {/* Phần HOT SERVICES */}
      <div className="bg-slate-50 py-8 flex flex-col items-center">
        <h2
          className="text-3xl font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600"
        >
          HOT SERVICES
        </h2>

        <div className="relative flex justify-center w-full max-w-7xl px-8">
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-green-50 text-gray p-3 rounded-full shadow-md hover:bg-green-300 transition duration-300 z-10"
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
                className="overflow-hidden flex-none transform transition duration-300 snap-start"
                style={{ width: '390px', height: '550px' }}
              >
                {/* Khối chứa ảnh + nút Buy Now */}
                <div className="relative h-2/3 group">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Nút Buy Now nằm sát đáy hình, chỉ hiện khi hover */}
                  <button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                               bg-white text-gray-800 px-4 py-2 rounded-full shadow
                               opacity-0 group-hover:opacity-100 transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="p-4 text-center relative">
                  <h3 className="text-2xl font-roboto text-gray-800">{service.name}</h3>
                  <div className="flex flex-col items-center mt-2">
                    <div className="flex items-center">
                      {Array(4).fill(null).map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                      <FaStarHalfAlt className="text-yellow-500" />
                      <span className="ml-2 text-sm text-gray-600">1434 reviews</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-gray-400 line-through">$19.95</span>
                      <span className="text-lime-500 font-semibold">$18.85</span>
                    </div>
                  </div>
                </div>        
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-green-50 text-gray p-3 rounded-full shadow-md hover:bg-green-300 transition duration-300 z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Pagination Dots - (Nếu muốn hiển thị lại, bỏ comment) */}
        {/* <div className="flex space-x-2 mt-4">
          {Array.from({ length: Math.ceil(services.length / 3) }).map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full ${
                activeIndex === index ? 'bg-green-700' : 'bg-gray-400'
              } transition duration-300`}
            ></span>
          ))}
        </div> */}
      </div>
    </div>
  );
}
