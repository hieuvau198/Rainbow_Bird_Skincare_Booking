import React, { useState, useEffect } from "react";
import { DatePicker, message } from "antd";
import "antd/es/style/reset.css";
import { AiOutlineClose } from "react-icons/ai";
import BookingSuccess from "./BookingSuccess";
import CustomDateCell from "./CustomDateCell";
import axios from "axios"; // Import axios để gọi API
import dayjs from "dayjs";

export default function BookingModal({ isOpen, onClose, serviceName }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [workingDays, setWorkingDays] = useState([]); // Danh sách ngày làm việc từ API
  const [availableSlots, setAvailableSlots] = useState([]);

  // Lấy danh sách ngày làm việc từ API
  useEffect(() => {
    const fetchWorkingDays = async () => {
      try {
        const response = await axios.get(
          "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/WorkingDay"
        );
        setWorkingDays(response.data); // Lưu danh sách ngày làm việc
      } catch (error) {
        console.error("Error fetching working days:", error);
      }
    };

    fetchWorkingDays();
  }, []);

  // Khi chọn ngày, lấy danh sách slot từ API
  useEffect(() => {
    if (!selectedDate) return;

    const selectedDayName = selectedDate.format("dddd"); // Lấy tên ngày (Monday, Tuesday,...)
    const workingDay = workingDays.find(day => day.dayName === selectedDayName);

    if (workingDay?.isActive) {
      // Gọi API để lấy time slot theo workingDayId
      const fetchTimeSlots = async () => {
        try {
          const response = await axios.get(
            `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/TimeSlot/workingDay/${workingDay.workingDayId}`
          );
          setAvailableSlots(response.data);
        } catch (error) {
          console.error("Error fetching time slots:", error);
        }
      };

      fetchTimeSlots();
    } else {
      setAvailableSlots([]); // Không có lịch làm việc cho ngày này
    }
  }, [selectedDate, workingDays]);

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
                disabledDate={(current) => {
                  const dayName = current.format("dddd");
                  return !workingDays.some(day => day.dayName === dayName && day.isActive);
                }}
                cellRender={(current) => (
                  <CustomDateCell current={current} selectedDate={selectedDate} />
                )}
              />
            </div>

            {selectedDate && availableSlots.length === 0 ? (
              <p className="text-red-500 font-bold text-center mt-4">No available slots on this day</p>
            ) : (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Available Time Slots:</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.slotId}
                      className={`p-2 rounded-md text-center ${
                        selectedTime === slot.startTime
                          ? "bg-lime-400 text-white"
                          : "bg-gray-200 hover:bg-lime-300"
                      }`}
                      onClick={() => setSelectedTime(slot.startTime)}
                    >
                      {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
            selectedTime={selectedTime}
            onClose={resetAndClose}
          />
        )}
      </div>
    </div>
  );
}
