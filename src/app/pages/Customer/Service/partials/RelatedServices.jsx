import React, { useRef } from "react";
import { LeftOutlined, RightOutlined, DollarOutlined } from "@ant-design/icons";

export default function RelatedServices({ services, service }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-2 mb-10 p-6 bg-white">
      <h2 className="text-4xl flex justify-center font-bold mb-4">Suggestions specifically for you</h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <LeftOutlined />
        </button>
        <div
          ref={sliderRef}
          className="flex overflow-hidden p-2 flex-nowrap items-stretch"
        >
          {services
            .filter((s) => s.service_id !== service.service_id)
            .map((related) => (
              <div key={related.service_id} className="min-w-[320px] bg-white p-4 border-0 flex flex-col justify-between h-full">
                <img
                  src={related.image}
                  alt={related.service_name}
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {related.service_name}
                  </h3>
                  <p className="text-red-500 font-bold text-sm flex items-center gap-1 mt-2">
                    <DollarOutlined /> {related.price}
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    ⭐ {related.rating} ({related.reviews} Rating)
                  </div>
                </div>
                <button className="mt-4 w-full bg-lime-300 text-gray-600 p-2 rounded-md text-xs hover:bg-lime-400 transition">
                  View Details
                </button>
              </div>
            ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
