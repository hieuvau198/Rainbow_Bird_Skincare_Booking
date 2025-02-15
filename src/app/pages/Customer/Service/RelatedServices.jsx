import React, { useRef } from "react";
import { LeftOutlined, RightOutlined, DollarOutlined } from "@ant-design/icons";

export default function RelatedServices({ services, service }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -1200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 1200, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-2 mb-10 shadow-lg p-6 rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Gợi ý dành riêng cho bạn</h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <LeftOutlined />
        </button>
        <div
          ref={sliderRef}
          className="flex overflow-hidden divide-x divide-gray-300 p-2 flex-nowrap"
        >
          {services
            .filter((s) => s.service_id !== service.service_id)
            .map((related) => (
              <div key={related.service_id} className="min-w-[240px] bg-white p-4 border-0 flex flex-col h-full">
                <img
                  src={related.image}
                  alt={related.service_name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-sm font-semibold line-clamp-2">
                  {related.service_name}
                </h3>
                <p className="text-red-500 font-bold text-sm flex items-center gap-1">
                  <DollarOutlined /> {related.salePrice}
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  ⭐ {related.rating} ({related.reviews} đánh giá)
                </div>
                <button className="mt-6 w-full bg-blue-500 text-white p-2 rounded-md text-xs hover:bg-blue-600 transition">
                  Xem chi tiết
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
