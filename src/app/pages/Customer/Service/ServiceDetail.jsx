import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClockCircleOutlined, DollarOutlined, StarOutlined, UserOutlined,} from "@ant-design/icons";
import RelatedServices from "./partials/RelatedServices";
import BookingModal from "./partials/BookingModal";
import mockData from "./mock_serviceDetail.json";
import InfoService from "./partials/InfoService";

export default function ServiceDetail() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [showFullInfo, setShowFullInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setServices(mockData);
    const selectedService = mockData.find((s) => s.service_id === id);
    setService(selectedService || null);
  }, [id]);

  if (!service) {
    return (
      <div className="text-center text-red-500 mt-6">Dịch vụ không tồn tại!</div>
    );
  }

  return (
    <div className="px-24 bg-gray-100 min-h-screen mt-2 w-full">
      {/* Nội dung dịch vụ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border shadow-lg p-6 rounded-lg bg-white">
        {/* Hình ảnh dịch vụ */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-96 h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src={service.image}
              alt={service.service_name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-bold"
            onClick={() => setIsModalOpen(true)} 
          >
            Book Now
          </button>
        </div>

        {/* Chi tiết dịch vụ */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{service.service_name}</h1>
          <p className="text-gray-600 text-md mt-2">{service.description}</p>

          <div className="mt-4">
            <p className="text-gray-500 line-through text-lg">
              <DollarOutlined className="mr-2" /> {service.price}
            </p>
            <p className="text-red-500 font-bold text-2xl">
              <DollarOutlined className="mr-2" /> {service.salePrice}
            </p>
            <p className="text-gray-700 text-md mt-2 flex items-center">
              <ClockCircleOutlined className="mr-2" /> {service.duration_minutes}
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-md text-gray-700">
            <p className="flex items-center">
              <UserOutlined className="mr-2" /> {service.buyers} người mua
            </p>
            <p className="flex items-center">
              <StarOutlined className="mr-2" /> {service.reviews} đánh giá
            </p>
          </div>
          <div className="flex-auto">
            <p className="text-green-600 mt-4 font-semibold text-sm">
              🎁 Ưu đãi đặc biệt: {service.promotion}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.service_name}
      />

      {/* Thông tin dịch vụ */}
      <InfoService
        additionalInfo={service.additional_info}
        showFullInfo={showFullInfo}
        setShowFullInfo={setShowFullInfo}
        image={service.image_1}
      />

      {/* Dịch vụ liên quan */}
      <RelatedServices services={services} service={service} />
    </div>
  );
}
