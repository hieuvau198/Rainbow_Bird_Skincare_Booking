import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import getAllService from "../../../modules/Admin/Service/getAllService";
import Loading from '../../../components/Loading';

export default function HomeSpecialService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllService();
        const formattedServices = data.map(service => ({
          service_id: service.serviceId || "N/A",
          service_name: service.serviceName || "Unknown Service",
          image: service.serviceImage || "https://via.placeholder.com/500"
        }));
        setServices(formattedServices.slice(5, 9)); // Hiển thị 4 dịch vụ tiếp theo
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <><Loading /></>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

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
              <Link to={`/services/${service.service_id}`} key={service.service_id} className="block">
                <div
                  className="p-6 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className="w-full h-48 object-cover mb-4 transition-transform duration-300 hover:scale-110 rounded-lg"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800 text-center">
                    {service.service_name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
