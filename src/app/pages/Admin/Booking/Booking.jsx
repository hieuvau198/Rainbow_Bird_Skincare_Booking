import React, { useState, useEffect, useCallback } from "react";
import { Button, message } from "antd";
import { TfiReload } from "react-icons/tfi";
import UserRole from "../../../../enums/userRole";
import DecodeRole from "../../../components/DecodeRole";
import DecodeRoleId from "../../../components/DecodeRoleId";
import getAllBook from "../../../modules/Booking/getAllBook";
import getBookByTheId from "../../../modules/Booking/getBookByTheId";
import ViewBooking from "./partials/ViewBooking";
import InProgressBookings from "./partials/InProgressBookings";
import ConfirmedBookings from "./partials/ConfirmedBookings";
import CheckedOutBookings from "./partials/CheckedOutBookings";
import CancelledBookings from "./partials/CancelledBookings";
import AwaitConfirmationBookings from "./partials/AwaitConfirmationBookings";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("awaiting");
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const userRole = DecodeRole();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      let data = userRole === UserRole.THERAPIST
        ? await getBookByTheId(DecodeRoleId("__TheIden"))
        : await getAllBook();

      setBookings(data);
    } catch (error) {
      message.error("Failed to fetch bookings");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [userRole]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleViewBooking = (record) => {
    setSelectedBooking(record);
    setShowViewBooking(true);
  };

  const renderTableComponent = () => {
    switch (activeCategory) {
      case "inProgress":
        return <InProgressBookings data={bookings.filter(b => b.status === "In Progress")} fetchBookings={fetchBookings} handleViewBooking={handleViewBooking} />;
      case "confirmed":
        return <ConfirmedBookings data={bookings.filter(b => b.status === "Confirmed")} fetchBookings={fetchBookings} handleViewBooking={handleViewBooking} />;
      case "checkedOut":
        return <CheckedOutBookings data={bookings.filter(b => b.status === "Checked Out")} fetchBookings={fetchBookings} handleViewBooking={handleViewBooking} />;
      case "cancelled":
        return <CancelledBookings data={bookings.filter(b => b.status.includes("Cancelled"))} fetchBookings={fetchBookings} handleViewBooking={handleViewBooking} />;
      case "awaiting":
        return <AwaitConfirmationBookings data={bookings.filter(b => b.status === "Await Confirmation")} fetchBookings={fetchBookings} handleViewBooking={handleViewBooking} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <Button type="primary" onClick={fetchBookings}>
            <TfiReload style={{ marginRight: 8 }} />
            Reload Data
          </Button>
        </div>

        {/* Booking Status Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            type={activeCategory === "awaiting" ? "primary" : "default"}
            onClick={() => setActiveCategory("awaiting")}
          >
            Await Confirmation
          </Button>
          <Button
            type={activeCategory === "inProgress" ? "primary" : "default"}
            onClick={() => setActiveCategory("inProgress")}
          >
            In Progress
          </Button>
          <Button
            type={activeCategory === "confirmed" ? "primary" : "default"}
            onClick={() => setActiveCategory("confirmed")}
          >
            Confirmed
          </Button>
          <Button
            type={activeCategory === "checkedOut" ? "primary" : "default"}
            onClick={() => setActiveCategory("checkedOut")}
          >
            Checked Out
          </Button>
          <Button
            type={activeCategory === "cancelled" ? "primary" : "default"}
            onClick={() => setActiveCategory("cancelled")}
          >
            Cancelled
          </Button>
        </div>

        {/* Render the selected table */}
        {renderTableComponent()}
      </div>

      {showViewBooking && (
        <ViewBooking
          booking={selectedBooking}
          onClose={() => setShowViewBooking(false)}
        />
      )}
    </div>
  );
}
