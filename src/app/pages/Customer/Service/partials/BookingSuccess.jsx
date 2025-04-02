import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess({ isOpen, onClose, bookingData }) {
  const navigate = useNavigate();
  
  if (!isOpen || !bookingData) return null;
  
  const handlePayNow = () => {
    navigate(`/payment?paymentId=${bookingData.bookingId}&amount=${bookingData.servicePrice}&currency=${bookingData.currency}`);
    onClose();
  };

  
  const handleGoHome = () => {
    navigate("/");
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[600px] overflow-y-auto text-center">
        <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
        <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-gray-700 mb-2">
          Thank you for booking <span className="font-bold">{bookingData?.service}</span>.
        </p>
        <p className="text-gray-700 mb-4">
          Your appointment is scheduled for <span className="font-bold">{bookingData?.date}</span> at{" "}
          <span className="font-bold">{bookingData?.timeSlot}</span>.
        </p>
        
        <button
          className="mt-6 bg-lime-300 text-gray-800 px-6 py-2 rounded-md font-bold hover:bg-lime-400 transition-all"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}