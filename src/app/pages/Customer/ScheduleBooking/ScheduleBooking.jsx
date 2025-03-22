import React, { useEffect, useState } from "react";
import DecodeRoleId from "../../../components/DecodeRoleId";
import getBookByCusId from "../../../modules/Booking/getBookByCusId";
import BookingList from "./partials/BookingList";
import BookingDetail from "./partials/BookingDetail";

export default function ScheduleBooking() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const customerId = DecodeRoleId("__CusIden");

  useEffect(() => {
    async function fetchBookings() {
      if (customerId) {
        const data = await getBookByCusId(customerId);
        setBookings(data);
      }
    }
    fetchBookings();
  }, [customerId]);

  const handleViewDetail = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-6 px-24">
      <div className={`${selectedBooking ? "col-span-8" : "col-span-12"} transition-all duration-500 ease-in-out`}>
        <BookingList bookings={bookings} onViewDetail={handleViewDetail} />
      </div>
      <div className="col-span-4">
        {selectedBooking ? (
          <BookingDetail booking={selectedBooking} />
        ) : (
          null
        )}
      </div>
    </div>
  );
}
