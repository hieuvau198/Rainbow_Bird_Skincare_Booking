import React, { useState } from "react";
import { Card, Pagination } from "antd";

export default function BookingList({ bookings }) {
  const groupedBookings = bookings.reduce((acc, booking) => {
    if (acc[booking.serviceName]) {
      acc[booking.serviceName].count += 1;
    } else {
      acc[booking.serviceName] = { ...booking, count: 1 };
    }
    return acc;
  }, {});

  const groupedBookingsArray = Object.values(groupedBookings);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const startIndex = (currentPage - 1) * pageSize;
  const currentBookings = groupedBookingsArray.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white p-6 rounded-md shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>
      {currentBookings.map((booking) => (
        <Card key={booking.bookingId} className="mb-4">
          <Card.Meta
            title={booking.serviceName}
            description={`Booked: ${booking.count} service`}
          />
        </Card>
      ))}
      {groupedBookingsArray.length > pageSize && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={groupedBookingsArray.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
