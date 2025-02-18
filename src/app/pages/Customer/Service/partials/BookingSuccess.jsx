import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess({ serviceName, selectedDate, selectedTime }) {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); 
  };

  return (
    <div className="text-center">
      <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-gray-700 mb-2">
        Thank you for booking <span className="font-bold">{serviceName}</span>.
      </p>
      <p className="text-gray-700 mb-4">
        Your appointment is scheduled for <span className="font-bold">{selectedDate}</span> at{" "}
        <span className="font-bold">{selectedTime}</span>.
      </p>
      <button
        className="mt-6 bg-lime-300 text-gray-800 px-6 py-2 rounded-md font-bold hover:bg-lime-400 transition-all"
        onClick={handleBackToHome}
      >
        Back to Home
      </button>
    </div>
  );
}
