import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function BookingModal({ isOpen, onClose, serviceName }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null; // Do not render the modal if it is not open.

  const handleConfirmBooking = () => {
    // Navigate to BookingSuccess page with booking details
    navigate("/booking-success", {
        state: {
          serviceName,
          selectedDate: selectedDate.toLocaleDateString(),
          selectedTime,
        },
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Book Your Appointment</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={24} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border rounded-md w-full p-2"
            placeholderText="Choose a date"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Time:</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="border rounded-md w-full p-2"
          >
            <option value="">Choose a time</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
          </select>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
          onClick={handleConfirmBooking}
          disabled={!selectedDate || !selectedTime}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
