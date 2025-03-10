import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedServices from "./partials/RelatedServices";
import getAllService from "../../../modules/Admin/Service/getAllService";
import getServiceDetail from "../../../modules/Admin/Service/getServiceDetail";
import InfoSerDetail from "./partials/InfoSerDetail";
import ContentSerDetail from "./partials/ContentSerDetail";
import Loading from "../../../components/Loading/Loading";
import BookingModal from "./partials/BookingModal";
import BookingDetails from "./partials/BookingDetail";
import BookingSuccess from "./partials/BookingSuccess";

export default function ServiceDetail() {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [showFullInfo, setShowFullInfo] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingDetailOpen, setIsBookingDetailOpen] = useState(false);
  const [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchServiceDetail = async () => {
      try {
        await getServiceDetail(id, setService);
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
      <ContentSerDetail service={service} setIsModalOpen={setIsBookingModalOpen} />

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceName={service.serviceName}
        serviceId={service.serviceId}
        onContinue={(data) => {
          setBookingData(data);
          setIsBookingModalOpen(false);
          setIsBookingDetailOpen(true);
        }}
      />
      
      )}

      {/* Booking Detail Modal */}
      {isBookingDetailOpen && (
        <BookingDetails
        isOpen={isBookingDetailOpen}
        bookingData={bookingData}
        onClose={() => setIsBookingDetailOpen(false)} // Đóng modal
        onBackToTherapists={() => {
          setIsBookingDetailOpen(false); // Đóng BookingDetail
          setIsBookingModalOpen(true);   // Mở lại BookingModal với therapist list
        }}
        onConfirm={() => {
          setIsBookingDetailOpen(false);
          setIsBookingSuccessOpen(true);
        }}
      />
      
      )}

      {/* Booking Success Modal */}
      {isBookingSuccessOpen && (
        <BookingSuccess
          isOpen={isBookingSuccessOpen}
          onClose={() => setIsBookingSuccessOpen(false)}
          bookingData={bookingData}
        />
      )}


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
