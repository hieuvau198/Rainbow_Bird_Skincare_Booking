import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedServices from "./partials/RelatedServices";
import BookingModal from "./partials/BookingModal";
import getAllService from "../../../modules/Admin/Service/getAllService";
import getServiceDetail from "../../../modules/Admin/Service/getServiceDetail";
import InfoSerDetail from "./partials/InfoSerDetail";
import ContentSerDetail from "./partials/ContentSerDetail";
import Loading from "../../../components/Loading/Loading";

export default function ServiceDetail() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [showFullInfo, setShowFullInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchServiceDetail = async () => {
      try {
        // Fetch the single service detail using getServiceDetail
        await getServiceDetail(id, setService);

        // Fetch all services for the Related Services section
        const allServices = await getAllService();
        setServices(allServices);
      } catch (err) {
        console.error("Error fetching service data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !service) {
    return <div className="text-center text-red-500 mt-6">Service does not exist or an error occurred!</div>;
  }

  return (
    <div className="px-24 bg-white min-h-screen w-full">
      {/* Nội dung dịch vụ */}
      <ContentSerDetail service={service} setIsModalOpen={setIsModalOpen} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.serviceName}
        serviceId={service.serviceId}
      />

      {/* Thông tin dịch vụ */}
      <InfoSerDetail
        additionalInfo={service.description}
        showFullInfo={showFullInfo}
        setShowFullInfo={setShowFullInfo}
        image={service.serviceImage}
      />

      {/* Dịch vụ liên quan */}
      {services.length > 0 && service && (
        <RelatedServices services={services} selectedService={service} />
      )}
    </div>
  );
}
