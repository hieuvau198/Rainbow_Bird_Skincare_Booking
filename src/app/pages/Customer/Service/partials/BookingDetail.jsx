import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

export default function BookingDetails({ isOpen, onClose, bookingData, onConfirm, onBackToTherapists }) {
  const [customerName, setCustomerName] = React.useState("Customer Unknown"); 
  const [userId, setUserId] = React.useState("Unknown");

  useEffect(() => {
    if (!isOpen || !bookingData) return;

    const fetchCustomerName = async () => {
      try {
        const userIdx = Cookies.get("__uiden");

        if (!userIdx) {
          message.error("User not found. Please log in again.");
          return;
        }

        // Fetch customer details
        const customerUserResponse = await axios.get(
          `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/user/${userIdx}`
        );

        setCustomerName(customerUserResponse.data.fullName || "Unknown");
        setUserId(userIdx);
      } catch (error) {
        console.error("Error fetching customer name:", error);
        setCustomerName("Unknown");
      }
    };

    fetchCustomerName();
  }, [isOpen, bookingData]);

  const handleConfirmBooking = async () => {
    if (!bookingData.date || !bookingData.slotId || !bookingData.therapistId) {
      message.error("Please select a date, time slot, and therapist.");
      return;
    }

    try {
      const userId = Cookies.get("__uid");

      if (!userId) {
        message.error("User not found. Please log in again.");
        return;
      }

      const customerResponse = await axios.get(
        `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Customer/user/${userId}`
      );

      if (!customerResponse.data || !customerResponse.data.customerId) {
        message.error("Customer ID not found. Please contact support.");
        return;
      }

      const customerId = customerResponse.data.customerId;

      const bookingRequest = {
        customerId: customerId,
        therapistId: bookingData.therapistId,
        serviceId: bookingData.serviceId,
        slotId: bookingData.slotId,
        bookingDate: bookingData.date,
        status: "Pending",
        notes: "No additional notes",
      };

      const response = await axios.post(
        "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/booking",
        bookingRequest,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        message.success("Booking confirmed successfully!");
        onConfirm();
      } else {
        message.error("Failed to confirm booking. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      message.error("An error occurred while confirming the booking.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[600px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            ✖
          </button>
        </div>
        
        <p><strong>Date:</strong> {String(bookingData.date)}</p>
        <p><strong>Time Slot:</strong> {String(bookingData.timeSlot)}</p>
        <p><strong>Therapist:</strong> {String(bookingData.therapist)}</p>
        <p><strong>Service:</strong> {String(bookingData.service)}</p>

        {/* Thêm các thông tin chi tiết */}
        <p><strong>Customer Name:</strong> {String(userId)}</p>
        <p><strong>Phone:</strong> {String(bookingData.customerPhone)}</p>
        <p><strong>Email:</strong> {String(bookingData.customerEmail)}</p>
        <p><strong>Location:</strong> {String(bookingData.location)}</p>
        <p><strong>Service Price:</strong> ${String(bookingData.servicePrice)}</p>
        <p><strong>Booking Fee:</strong> ${String(bookingData.bookingFee)}</p>
        <p><strong>Total Payment:</strong> ${String(bookingData.paymentAmount)}</p>
        <p><strong>Payment Status:</strong> {String(bookingData.paymentStatus)}</p>

        <div className="mt-4 flex justify-between">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all"
            onClick={onBackToTherapists}
          >
            ← Back to Therapist
          </button>

          <button
            className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600 transition-all"
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
