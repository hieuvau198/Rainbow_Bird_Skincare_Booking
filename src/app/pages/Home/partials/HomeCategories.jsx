import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllService from "../../../modules/Admin/Service/getAllService";
import { FaGift, FaLeaf, FaGlobe } from "react-icons/fa";

export default function SkincareCategories() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllService();
        setServices(data.slice(0, 12));
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    

    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading skincare services...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Main Content */}
      <div className="p-4 max-w-7xl mx-auto flex-grow">
        <h1 className="text-center text-3xl font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          ELEVATE YOUR BEAUTY RITUAL
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.serviceId || index}`}
              key={service.serviceId || index}
              className="animate-fadeIn block"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Only render category if it exists */}
              {service.category && (
                <h2 className="text-xl font-roboto font-bold mb-4 text-gray-800 text-center">
                  {service.category}
                </h2>
              )}
              <div className="space-y-6">
                <div className="transition-transform duration-300 hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <img
                      src={service.serviceImage || "https://via.placeholder.com/150"}
                      alt={service.serviceName || "Unknown Service"}
                      className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        {service.serviceName || "Unknown Service"}
                      </h3>
                      <p className="text-gray-500">
                        {service.price ? `${service.price} ${service.currency || "USD"}` : "$0.00"}
                      </p>
                    </div>
                  </div>
                  <hr className="my-8 border-gray-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Top bar with icons */}
      <div className="w-full bg-[rgb(191,238,174)] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <FaGift className="text-4xl text-green-600 mb-2" />
            <p className="text-lg font-semibold text-green-700">Gifts For You</p>
          </div>
          <div className="flex flex-col items-center">
            <FaLeaf className="text-4xl text-green-600 mb-2" />
            <p className="text-lg font-semibold text-green-700">100% Organic</p>
          </div>
          <div className="flex flex-col items-center">
            <FaGlobe className="text-4xl text-green-600 mb-2" />
            <p className="text-lg font-semibold text-green-700">Online Acquisition</p>
          </div>
        </div>
      </div>
    </div>
  );
}
