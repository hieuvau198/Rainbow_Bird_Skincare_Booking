import React from "react";
import BookingTable from "./BookingTable";

const AwaitConfirmationBookings = ({ data, fetchBookings, handleViewBooking }) => {
  return (
    <BookingTable
      title="Awaiting Confirmation Bookings"
      data={data}
      fetchBookings={fetchBookings}
      handleViewBooking={handleViewBooking}
    />
  );
};

export default AwaitConfirmationBookings;
