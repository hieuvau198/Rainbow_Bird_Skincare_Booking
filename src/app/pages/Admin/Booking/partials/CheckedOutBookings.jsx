import React from "react";
import BookingTable from "./BookingTable";

const CheckedOutBookings = ({ data, fetchBookings, handleViewBooking }) => {
  return (
    <BookingTable
      title="Checked Out Bookings"
      data={data}
      fetchBookings={fetchBookings}
      handleViewBooking={handleViewBooking}
    />
  );
};

export default CheckedOutBookings;
