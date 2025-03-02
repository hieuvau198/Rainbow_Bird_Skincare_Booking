import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedServices from "./partials/RelatedServices";
import BookingModal from "./partials/BookingModal";
import mockData from "./mock_serviceDetail.json";
import getAllService from "../../../modules/Admin/Service/getAllService";
import InfoSerDetail from "./partials/InfoSerDetail";
import ContentSerDetail from "./partials/ContentSerDetail";

export default function ServiceDetail() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [showFullInfo, setShowFullInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const apiServiceDetails = await getAllService();
        console.log("Fetched services:", apiServiceDetails);

        setServices(apiServiceDetails);

        // Find the service with the matching ID
        const selectedService = apiServiceDetails.find((s) => String(s.serviceId) === String(id));

        console.log("Selected service:", selectedService);
        setService(selectedService || null);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServiceDetail();
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
        serviceName={service.serviceName}
      />

      {/* Thông tin dịch vụ */}
      <InfoSerDetail
        additionalInfo={service.description}
        showFullInfo={showFullInfo}
        setShowFullInfo={setShowFullInfo}
        image={service.serviceImage}
      />

      {/* Dịch vụ liên quan */}
      <RelatedServices services={services} service={service} />
    </div>
  );
}
