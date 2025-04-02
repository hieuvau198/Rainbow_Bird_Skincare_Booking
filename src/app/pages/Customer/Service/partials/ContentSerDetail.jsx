import {
  ClockCircleOutlined,
  DollarOutlined,
  StarOutlined,
  UserOutlined
} from "@ant-design/icons";
import Cookies from "js-cookie";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ContentSerDetail({ service, setIsModalOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookNow = () => {
    const token = Cookies.get("__atok");
    if (token) {
      setIsModalOpen(true);
    } else {
      navigate("/login", { state: { from: location } });
      console.log("loca", location);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-white">
        {/* Service Image */}
        <div className="relative flex justify-center items-center">
          <img
            src={service.serviceImage || "https://via.placeholder.com/500"}
            alt={service.serviceName || "Service Image"}
            className="w-full h-96 object-cover rounded-lg shadow-lg border-lime-200 border"
          />
        </div>

        {/* Service Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {service.serviceName || "Unknown Service"}
          </h1>
          {/* <p className="text-gray-600 text-md mt-2">{service.description || "No description available."}</p> */}

          <div className="mt-4">
            <p className="text-green-800 font-bold text-2xl">
            {service.price
          ? `${new Intl.NumberFormat("vi-VN", { style: "currency", currency: service.currency || "VND" }).format(service.price)}`
          : "Price not available"}
            </p>
            <p className="text-gray-700 text-md mt-2 flex items-center">
              <ClockCircleOutlined className="mr-2" /> {service.durationMinutes ? `${service.durationMinutes} minutes` : "Duration not specified"}
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-md text-gray-700">
            <p className="flex items-center">
              <UserOutlined className="mr-2" /> {service.bookingNumber || "0"} Booking
            </p>
            <p className="flex items-center">
              <StarOutlined className="mr-2" /> {service.rating.toFixed(1) || "No reviews"}
            </p>
          </div>

          <button 
            className="bg-lime-500 text-white px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-lime-700 transition"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
      <hr className="my-4 border-lime-200" />
    </div>
  );
}
