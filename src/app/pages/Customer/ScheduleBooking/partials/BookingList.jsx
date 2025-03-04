import React from "react";
import { Card } from "antd";

export default function BookingList({ bookings }) {
  const groupedBookings = bookings.reduce((acc, booking) => {
    if (acc[booking.serviceName]) {
      acc[booking.serviceName].count += 1;
    } else {
      acc[booking.serviceName] = { ...booking, count: 1 };
    }
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 rounded-md shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>
      {Object.values(groupedBookings).map((booking) => (
        <Card key={booking.bookingId} className="mb-4">
          <Card.Meta
            title={booking.serviceName}
            description={`Booked: ${booking.count} service`}
          />
        </Card>
      ))}
    </div>
  );
}
