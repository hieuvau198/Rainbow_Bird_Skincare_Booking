import React, { useState, useEffect } from "react";
import CalendarBooking from "./partials/CalendarBooking";
import BookingList from "./partials/BookingList";

const mockBookings = [
  {
    bookingId: 1,
    serviceName: "Facial Treatment",
    date: "2025-03-01",
    time: "10:00 AM",
    location: "Salon A",
    status: "Scheduled",
  },
  {
    bookingId: 2,
    serviceName: "Skin Rejuvenation",
    date: "2025-02-28",
    time: "12:30 PM",
    location: "Salon B",
    status: "In Progress",
  },
  {
    bookingId: 3,
    serviceName: "Acne Treatment",
    date: "2025-02-19",
    time: "02:00 PM",
    location: "Salon A",
    status: "Completed",
  },
];

export default function ScheduleBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(mockBookings);
  }, []);

  return (
    <div className="p-6 px-24">
      <div className="grid grid-cols-5 gap-4 items-stretch">
        <div className="col-span-3">
          <CalendarBooking bookings={bookings} />
        </div>

        <div className="col-span-2">
          <BookingList bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
