import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedServices from "./partials/RelatedServices";
import BookingModal from "./partials/BookingModal";
import mockData from "./mock_serviceDetail.json";
import InfoSerDetail from "./partials/InfoSerDetail";
import ContentSerDetail from "./partials/ContentSerDetail";

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
    return <div className="text-center text-red-500 mt-6">Service does not exist!</div>;
  }

  return (
    <div className="px-24 bg-white min-h-screen w-full">
      {/* Nội dung dịch vụ */}
      <ContentSerDetail service={service} setIsModalOpen={setIsModalOpen}/>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.service_name}
      />

      {/* Thông tin dịch vụ */}
      <InfoSerDetail
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
