import React, { useState, useEffect } from "react";
import CalendarBooking from "./partials/CalendarBooking";
import BookingList from "./partials/BookingList";
import getBookByCusId from "../../../modules/Booking/getBookByCusId";
import DecodeId from "../../../components/DecodeId";

export default function ScheduleBooking() {
  const [bookings, setBookings] = useState([]);
  const customerId = DecodeId(); 

  useEffect(() => {
    async function fetchBookings() {
      if (customerId) {
        const data = await getBookByCusId(customerId);
        setBookings(data);
      }
    }
    fetchBookings();
  }, [customerId]);

  return (
    <div className="p-6 px-24">
      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-9">
          <CalendarBooking bookings={bookings} />
        </div>
        <div className="col-span-3">
          <BookingList bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
