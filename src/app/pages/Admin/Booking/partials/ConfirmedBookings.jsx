import React from "react";
import BookingTable from "./BookingTable";

const ConfirmedBookings = ({ data, fetchBookings, handleViewBooking }) => {
  return (
    <BookingTable
      title="Confirmed Bookings"
      data={data}
      fetchBookings={fetchBookings}
      handleViewBooking={handleViewBooking}
    />
  );
};

export default ConfirmedBookings;
