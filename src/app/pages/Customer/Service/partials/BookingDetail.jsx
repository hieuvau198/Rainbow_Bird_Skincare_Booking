import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

export default function BookingDetails({ isOpen, onClose, bookingData, onConfirm, onBackToTherapists }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [servicePrice, setServicePrice] = useState(0);

  useEffect(() => {
    if (!isOpen || !bookingData) return;

    const fetchCustomerDetails = async () => {
      try {
        const userIdx = Cookies.get("__uid");

        if (!userIdx) {
          message.error("User not found. Please log in again.");
          return;
        }

        const customerResponse = await axios.get(
          `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/user/${userIdx}`
        );

        setCustomerName(customerResponse.data.fullName || "");
        setCustomerPhone(customerResponse.data.phone || "");
        setCustomerEmail(customerResponse.data.email || "");
        setCustomerLocation(customerResponse.data.location || "");
      } catch (error) {
        console.error("Error fetching customer details:", error);
        message.error("Failed to fetch customer details. Please enter them manually.");
      }
    };

    const fetchServicePrice = async () => {
      try {
        const response = await axios.get(
          `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Service/${bookingData.serviceId}`
        );

        if (response.status === 200) {
          setServicePrice(response.data.price || 0); // ✅ Set service price
        } else {
          message.error("Failed to fetch service price.");
        }
      } catch (error) {
        console.error("Error fetching service price:", error);
        message.error("An error occurred while fetching the service price.");
      }
    };

    fetchCustomerDetails();
    fetchServicePrice();
  }, [isOpen, bookingData]);

  const handleConfirmBooking = async () => {
    if (!bookingData.date || !bookingData.slotId || !bookingData.therapistId) {
      message.error("Please select a date, time slot, and therapist.");
      return;
    }

    if (!customerName || !customerPhone || !customerEmail || !customerLocation) {
      message.error("Please fill in all customer details.");
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
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        customerLocation: customerLocation,
        therapistId: bookingData.therapistId,
        serviceId: bookingData.serviceId,
        slotId: bookingData.slotId,
        bookingDate: bookingData.date,
        servicePrice: bookingData.servicePrice || 0, // ✅ Default to 0 if undefined
        bookingFee: bookingData.bookingFee || 0, // ✅ Default to 0 if undefined
        paymentAmount: bookingData.paymentAmount || 0, // ✅ Default to 0 if undefined
        paymentStatus: bookingData.paymentStatus || "Pending",
        status: "Pending",
        notes: "No additional notes",
      };

      console.log("Sending booking request:", bookingRequest); // ✅ Debugging

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

        {/* ✅ Editable Customer Details */}
        <div className="mb-4">
          <label className="block font-bold">Full Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your full name"
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Phone:</label>
          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Email:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Enter your email address"
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Location:</label>
          <input
            type="text"
            value={customerLocation}
            onChange={(e) => setCustomerLocation(e.target.value)}
            placeholder="Enter your location"
            className="border p-2 w-full rounded-md"
          />
        </div>

        {/* ✅ Show Fetched Service Price */}
        <p><strong>Service Price:</strong> ${servicePrice}</p>
        <p><strong>Booking Fee:</strong> $0</p>
        <p><strong>Total Payment:</strong> ${servicePrice}</p>
        <p><strong>Payment Status:</strong> Pending</p>

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
