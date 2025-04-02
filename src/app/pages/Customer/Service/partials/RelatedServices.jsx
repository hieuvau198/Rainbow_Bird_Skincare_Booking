import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { LeftOutlined, RightOutlined, DollarOutlined } from "@ant-design/icons";

export default function RelatedServices({ services, selectedService }) {
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

  // Ensure `services` and `selectedService` exist
  if (!services || !selectedService) return null;

  // Filter out the currently viewed service
  const relatedServices = services.filter((s) => s.serviceId !== selectedService.serviceId);

  if (relatedServices.length === 0) {
    return null; // Hide the component if there are no related services
  }

  return (
    <div>
      <hr className="my-4 border-lime-200" />
      <div className="mt-2 p-6 bg-white">
        <h2 className="text-4xl flex justify-center font-bold mb-4">Suggestions specifically for you</h2>
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
          >
            <LeftOutlined />
          </button>
          <div ref={sliderRef} className="flex overflow-hidden divide-x divide-lime-300 p-2 flex-nowrap items-stretch">
            {relatedServices.map((related) => (
              <Link key={related.serviceId} to={`/services/${related.serviceId}`} target="_top" className="min-w-[320px]">
                <div className="bg-white p-4 border-0 flex flex-col justify-between h-full">
                  <img
                    src={related.serviceImage || "https://via.placeholder.com/500"}
                    alt={related.serviceName}
                    className="w-full h-64 object-cover rounded-md mb-3"
                  />
                  <div className="flex-grow">
                    <h3 className="text-sm font-semibold line-clamp-2">{related.serviceName}</h3>
                    <p className="text-green-800 font-bold text-sm flex items-center gap-1 mt-2">
                      <DollarOutlined /> {related.price ? `${related.price} ${related.currency || "USD"}` : "Price not available"}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      ⭐ {related.reviews || "No reviews"}
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-lime-300 text-gray-600 p-2 rounded-md text-xs hover:bg-lime-400 transitionx">
                    View Details
                  </button>
                </div>
              </Link>
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
    </div>
  );
}
