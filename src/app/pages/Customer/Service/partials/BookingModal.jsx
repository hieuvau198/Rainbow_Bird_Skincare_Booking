import React, { useState } from "react";
import { DatePicker, TimePicker, message } from "antd";
import "antd/es/style/reset.css";
import { AiOutlineClose } from "react-icons/ai";
import BookingSuccess from "./BookingSuccess";
import CustomDateCell, { disabledDate} from "./CustomDateCell";
import { disabledTime } from "./CustomTimeCell"; 

export default function BookingModal({ isOpen, onClose, serviceName }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      message.error("Please select both date and time.");
      return;
    }
    setIsBookingConfirmed(true);
  };

  const resetAndClose = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setIsBookingConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[600px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isBookingConfirmed ? "Booking Confirmed!" : "Book Your Appointment"}
          </h2>
          <button onClick={resetAndClose}>
            <AiOutlineClose size={24} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {!isBookingConfirmed ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Date:</label>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full"
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                cellRender={(current) => (
                  <CustomDateCell current={current} selectedDate={selectedDate}/>
                )}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Time:</label>
              <TimePicker
                value={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                className="w-full"
                format="HH:mm"
                placeholder="Choose a time"
                disabledTime={() => disabledTime(selectedDate)}
              />
            </div>
            <button
              className="bg-lime-300 text-gray-800 px-4 py-2 rounded-md w-full hover:bg-lime-400"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          </>
        ) : (
          <BookingSuccess
            serviceName={serviceName}
            selectedDate={selectedDate?.format("YYYY-MM-DD")}
            selectedTime={selectedTime?.format("HH:mm")}
            onClose={resetAndClose}
          />
        )}
      </div>
    </div>
  );
}
