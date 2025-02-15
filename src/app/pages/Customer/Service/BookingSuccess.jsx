import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve booking details from the state passed via navigation
  const { serviceName, selectedDate, selectedTime } = location.state || {};

  if (!serviceName || !selectedDate || !selectedTime) {
    return (
      <div className="text-center text-red-500 mt-10">
        Missing booking details. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
        <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-gray-700 mb-2">
          Thank you for booking <span className="font-bold">{serviceName}</span>.
        </p>
        <p className="text-gray-700 mb-4">
          Your appointment is scheduled for{" "}
          <span className="font-bold">{selectedDate}</span> at{" "}
          <span className="font-bold">{selectedTime}</span>.
        </p>
        <button
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-600 transition-all"
          onClick={() => navigate("/")} // Redirect to home or service list page
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
