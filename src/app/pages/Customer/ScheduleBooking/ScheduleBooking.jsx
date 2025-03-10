import React, { useEffect, useState } from "react";
import DecodeRoleId from "../../../components/DecodeRoleId";
import getBookByCusId from "../../../modules/Booking/getBookByCusId";
import BookingList from "./partials/BookingList";
import CalendarBooking from "./partials/CalendarBooking";

export default function ScheduleBooking() {
  const [bookings, setBookings] = useState([]);
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

  return (
    <div className="p-6 px-24">
      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-9">
          <CalendarBooking bookings={bookings} />
        </div>
        <div className="col-span-3">
          <div className="sticky top-2 min-h-60">
            <BookingList bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
