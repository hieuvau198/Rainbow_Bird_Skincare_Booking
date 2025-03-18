import React from "react";
import BookingTable from "./BookingTable";

const InProgressBookings = ({ data, fetchBookings, handleViewBooking }) => {
  return (
    <BookingTable
      title="In Progress Bookings"
      data={data}
      fetchBookings={fetchBookings}
      handleViewBooking={handleViewBooking}
    />
  );
};

export default InProgressBookings;
