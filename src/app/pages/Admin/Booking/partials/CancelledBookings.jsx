import React from "react";
import BookingTable from "./BookingTable";

const CancelledBookings = ({ data, fetchBookings, handleViewBooking }) => {
  return (
    <BookingTable
      title="Cancelled Bookings"
      data={data}
      fetchBookings={fetchBookings}
      handleViewBooking={handleViewBooking}
    />
  );
};

export default CancelledBookings;
