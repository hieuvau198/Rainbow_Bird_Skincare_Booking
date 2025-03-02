import React, { useState, useRef, useEffect } from "react";
import { ClockCircleOutlined, DollarOutlined, StarOutlined, UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import getAllService from "../../../../modules/Admin/Service/getAllService";

export default function ContentSerDetail({ serviceId, setIsModalOpen, removeScrollBar, fullImage }) {
  const [service, setService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % service.extra_images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + service.extra_images.length) % service.extra_images.length);
  };

  useEffect(() => {
    if (thumbnailsRef.current) {
      const selectedThumbnail = thumbnailsRef.current.children[currentImageIndex];
      if (selectedThumbnail) {
        selectedThumbnail.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentImageIndex]);

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-white">
        {/* Hình ảnh dịch vụ */}
        <div className="relative flex flex-row items-center">
            {/* List hình ảnh nhỏ */}
            <div ref={thumbnailsRef} className={`flex flex-col space-y-2 overflow-hidden h-96 ${removeScrollBar ? 'scrollbar-hidden' : ''}`}>
            {service.extra_images.map((img, index) => (
                <div key={index} className={`p-1 rounded-md ${currentImageIndex === index ? 'border-lime-300 border-2' : ''}`}>
                <img
                    src={img}
                    alt={`Extra ${index}`}
                    className="w-16 h-16 object-cover rounded-md cursor-pointer"
                    onClick={() => setCurrentImageIndex(index)}
                />
                </div>
            ))}
            </div>

            {/* Hình ảnh chính với nút chuyển */}
            <div className={`relative ${fullImage ? 'w-full h-[400px]' : ''} overflow-hidden flex items-center justify-center mx-4`}>
            <button onClick={handlePrevImage} className="absolute left-0 bg-white p-2 rounded-full shadow-lg z-10">
                <LeftOutlined />
            </button>
            <img
                src={service.extra_images[currentImageIndex]}
                alt={service.service_name}
                className="w-full h-auto object-cover"
            />
            <button onClick={handleNextImage} className="absolute right-0 bg-white p-2 rounded-full shadow-lg z-10">
                <RightOutlined />
            </button>
            </div>
        </div>

        {/* Chi tiết dịch vụ */}
        <div>
            <h1 className="text-3xl font-bold text-gray-800">{service.service_name}</h1>
            <p className="text-gray-600 text-md mt-2">{service.description}</p>

            <div className="mt-4">
            <p className="text-red-500 font-bold text-2xl">
                <DollarOutlined className="mr-2" /> {service.price}
            </p>
            <p className="text-gray-700 text-md mt-2 flex items-center">
                <ClockCircleOutlined className="mr-2" /> {service.duration_minutes}
            </p>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-md text-gray-700">
            <p className="flex items-center">
                <UserOutlined className="mr-2" /> {service.buyers} Booking
            </p>
            <p className="flex items-center">
                <StarOutlined className="mr-2" /> {service.reviews} Rating
            </p>
            </div>
            <div className="flex-auto">
            <p className="text-green-600 mt-4 font-semibold text-sm">
                🎁 Special Offer : {service.promotion}
            </p>
            </div>
            <button
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-bold"
                onClick={() => setIsModalOpen(true)} 
            >
                Book Now
            </button>
        </div>
        </div>
        <hr className="my-4 border-gray-200" />
    </div>
  );
}
