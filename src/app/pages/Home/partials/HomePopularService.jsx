import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import getAllService from "../../../modules/Admin/Service/getAllService";
import { LeftOutlined, RightOutlined, DollarOutlined, StarOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Loading from "../../../components/Loading";

export default function HomePopularService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllService();
        const formattedServices = data.map(service => ({
          service_id: service.serviceId || "N/A",
          service_name: service.serviceName || "Unknown Service",
          price: service.price ? `${service.price} ${service.currency || "USD"}` : "Price not available",
          description: service.description || "No description available.",
          buyers: service.bookingNumber || "0",
          reviews: service.reviews || "No reviews",
          image: service.serviceImage || "https://via.placeholder.com/500",
          duration_minutes: service.durationMinutes ? `${service.durationMinutes} minutes` : "Duration not specified"
        }));
        const sortedServices = formattedServices.sort((a, b) => b.buyers - a.buyers);
        setServices(sortedServices.slice(0, 5));
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return <><Loading /></>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-4xl font-bold font-Arial mb-10 text-transparent text-center bg-clip-text bg-gradient-to-r from-lime-500 to-green-600"
        >
          Our Most Popular Services
        </h2>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
          >
            <LeftOutlined />
          </button>

          <div ref={sliderRef} className="flex overflow-hidden space-x-4 p-2">
            {services.map(service => (
              <div
                key={service.service_id}
                className="min-w-[320px] w-[320px] h-[450px] bg-white p-4 rounded-lg shadow-md transition transform hover:scale-105 border border-lime-200 flex flex-col justify-between"
              >
                <Link to={`/services/${service.service_id}`} className="flex flex-col h-full">
                  {/* Ảnh dịch vụ */}
                  <div className="w-full h-[220px] flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.service_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="text-lg font-semibold text-gray-800 h-[48px] overflow-hidden line-clamp-2">
                      {service.service_name}
                    </h3>
                    {/* <p className="text-sm text-gray-600 mt-2 h-[40px] overflow-hidden line-clamp-2">
                      {service.description.slice(0, 60)}...
                    </p> */}
                    {/* Buyers, Reviews, Duration */}
                    <div className="flex justify-between text-gray-600 text-xs mt-2">
                      <p className="flex items-center">
                        <UserOutlined className="mr-1" /> {service.buyers} Booking
                      </p>
                      <p className="flex items-center">
                        <StarOutlined className="mr-1" /> {service.reviews}
                      </p>
                    </div>
                    <p className="text-gray-700 text-xs mt-1 flex items-center">
                      <ClockCircleOutlined className="mr-1" /> {service.duration_minutes}
                    </p>
                    {/* Giá dịch vụ */}
                    <div className="text-lime-500 font-bold flex items-center mt-3">
                     {service.price}
                    </div>
                  </div>

                  {/* Nút xem chi tiết */}
                  {/* <div className="mt-auto">
                    <button target="_top" className="w-full bg-lime-600 text-white py-2 rounded-md text-sm hover:bg-lime-700 transition">
                      View Details
                    </button>
                  </div> */}
                </Link>
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
    </div>
  );
}
