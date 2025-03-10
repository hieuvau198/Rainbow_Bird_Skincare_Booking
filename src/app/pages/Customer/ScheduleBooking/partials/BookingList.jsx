import React, { useState } from "react";
import { Card, Pagination } from "antd";

export default function BookingList({ bookings }) {
  // Group bookings by serviceName and count them
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
  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const currentBookings = groupedBookingsArray.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white p-6 rounded-md shadow-md flex flex-col min-h-[600px]">
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>
      <div className="flex-1">
        {currentBookings.map((booking) => (
          <Card
            key={booking.bookingId || booking.serviceName}
            bordered
            style={{ borderLeft: '4px solid #65a30d', marginBottom: '16px' }}
          >
            <Card.Meta
              title={booking.serviceName}
              description={`Booked: ${booking.count} service`}
            />
          </Card>
        ))}
      </div>
      <div className="mt-auto flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={groupedBookingsArray.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
