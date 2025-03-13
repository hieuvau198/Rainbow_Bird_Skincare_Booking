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
    <div className="grid grid-cols-7 gap-4 p-6 px-24">
      <div className={`${selectedBooking ? "col-span-5" : "col-span-7"} transition-all duration-500 ease-in-out`}>
        <BookingList bookings={bookings} onViewDetail={handleViewDetail} />
      </div>
      <div className="col-span-2">
        {selectedBooking ? (
          <BookingDetail booking={selectedBooking} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
