import React, { useState, useEffect } from "react";
import { Button, DatePicker, message } from "antd";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import "antd/es/style/reset.css";
import { AiOutlineClose } from "react-icons/ai";
import BookingSuccess from "./BookingSuccess";
import CustomDateCell from "./CustomDateCell";
import getWorkingDay from "../../../../modules/Admin/TimeSlot/getWorkingDay";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";


export default function BookingModal({ isOpen, onClose, serviceName, serviceId, onContinue  }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [showSlots, setShowSlots] = useState(true);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [showTherapists, setShowTherapists] = useState(false);
  const [workingDays, setWorkingDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [therapists, setTherapists] = useState([]); // Lưu therapists
  const navigate = useNavigate();

  const handleViewProfile = (therapist) => {
    navigate(`/therapists/${therapist.therapistId}`, {
      state: {
        bookingData: {
          date: selectedDate?.format("YYYY-MM-DD"),
          timeSlot: selectedTime,
          therapistId: therapist.therapistId,
          therapistName: therapist.therapistName,
          service: serviceName,
          serviceId: serviceId,
          slotId: selectedSlotId,
        },
      },
    });
  };

  useEffect(() => {
    const fetchWorkingDays = async () => {
      try {
        const data = await getWorkingDay();
        setWorkingDays(data);
      } catch (error) {
        console.error("Error fetching working days:", error);
      }
    };
  
    fetchWorkingDays();
  }, []);
  

  useEffect(() => {
    if (!selectedDate) return;

    const selectedDayName = selectedDate.format("dddd");
    const workingDay = workingDays.find((day) => day.dayName === selectedDayName);

    if (workingDay?.isActive) {
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
      setAvailableSlots([]);
    }
  }, [selectedDate, workingDays]);

  const fetchTherapists = async (slotId) => {
    try {
      const response = await axios.get(
        `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/TherapistAvailability/slot/${slotId}`
      );
      setTherapists(response.data);
      setShowTherapists(true);
      setShowSlots(false);
    } catch (error) {
      console.error("Error fetching therapists:", error);
      message.error("Failed to load therapists.");
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedTime(slot.startTime);
    setSelectedSlotId(slot.slotId);
    fetchTherapists(slot.slotId);
  };

  const handleGoBack = () => {
    setShowSlots(true);
    setShowTherapists(true);
    setSelectedSlotId(null);
    setSelectedTime(null);
  };

  const handleContinueBooking = () => {
    if (!selectedDate || !selectedTime || !selectedTherapist) {
      message.error("Please select a date, time slot, and therapist.");
      return;
    }

    onContinue({
      date: selectedDate.format("YYYY-MM-DD"),
      timeSlot: selectedTime,
      therapistName: therapists.find(t => t.therapistId === selectedTherapist)?.therapistName,
      service: serviceName,
      slotId: selectedSlotId,
      serviceId: serviceId,
      therapistId: selectedTherapist
    });
  };

  const resetAndClose = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedSlotId(null);
    setSelectedTherapist(null);
    setTherapists([]);
    setShowTherapists(false);
    setShowSlots(true);
    setIsBookingConfirmed(false);
    onClose();
  };

  if (!isOpen) return null;

  const disabledDate = (current) => current && current.isBefore(dayjs(), "day");

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
            {showSlots  ? (
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
                      <CustomDateCell current={current} selectedDate={selectedDate} />
                    )}
                  />
                </div>

                {selectedDate && availableSlots.length === 0 ? (
                  <p className="text-red-500 font-bold text-center mt-4">
                    No available slots on this day
                  </p>
                ) : (
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Available Time Slots:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots
                        .filter((slot) => {
                          if (selectedDate && selectedDate.isSame(dayjs(), "day")) {
                            const currentHour = dayjs().hour();
                            const currentMinute = dayjs().minute();
                            const slotHour = parseInt(slot.startTime.split(":")[0]);
                            const slotMinute = parseInt(slot.startTime.split(":")[1]);
                            return slotHour > currentHour || (slotHour === currentHour && slotMinute >= currentMinute);
                          }
                          return true;
                        })
                        .map((slot) => (
                          <button
                            key={slot.slotId}
                            className={`p-2 rounded-md text-center ${
                              selectedTime === slot.startTime
                                ? "bg-lime-400 text-white"
                                : "bg-gray-200 hover:bg-lime-300"
                            }`}
                            onClick={() => handleSlotClick(slot)}
                          >
                            {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  className="mb-4 bg-lime-300 text-gray-800 px-4 py-2 rounded-md hover:bg-lime-400"
                  onClick={handleGoBack}
                >
                  ← Back to Slots
                </button>
                <h3 className="text-lg font-bold mb-4">Select a Therapist</h3>
                <div className="grid grid-cols-2 gap-4">
                  {therapists.map((therapist) => (
                    <button
                      key={therapist.therapistId}
                      className={`p-4 border rounded-md ${
                        selectedTherapist === therapist.therapistId
                          ? "border-lime-500 bg-lime-100"
                          : "border-gray-300 hover:border-lime-500"
                      }`}
                      onClick={() => setSelectedTherapist(therapist.therapistId)}
                    >
                      <p className="font-bold">{therapist.therapistName}</p>
                      <p className="text-sm text-gray-600"><StarTwoTone twoToneColor="green" /> {therapist.therapistRating}</p>
                      <Button
                        variant="solid"
                        color="lime"
                        onClick={() => handleViewProfile(therapist)}
                      >
                        Profile
                      </Button>
                    </button>
                  ))}
                </div>

                <button
                  className="mt-4 bg-lime-500 text-white px-4 py-2 rounded-md w-full hover:bg-lime-600"
                  onClick={handleContinueBooking}
                  disabled={!selectedTherapist}
                >
                  Continue Booking
                </button>

              </>
            )}
          </>
        ) : (
          <BookingSuccess serviceName={serviceName} selectedDate={selectedDate?.format("YYYY-MM-DD")} selectedTime={selectedTime} onClose={resetAndClose} />
        )}
      </div>
    </div>
  );
}
