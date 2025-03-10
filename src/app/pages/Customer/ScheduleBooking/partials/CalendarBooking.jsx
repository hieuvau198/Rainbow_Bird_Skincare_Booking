import React from "react";
import { Calendar, Tag } from "antd";
import dayjs from "dayjs";

export default function CalendarBooking({ bookings }) {
  const cellRender = (current, info) => {
    if (info.type === "date") {
      const calendarDate = dayjs(current).format("YYYY-MM-DD");
      const dayBookings = bookings.filter((booking) => {
        const bookingDate = dayjs(booking.bookingDate).format("YYYY-MM-DD");
        return bookingDate === calendarDate;
      });
      return (
        <div>
          {info.originNode}
          <ul className="p-0 m-0">
            {dayBookings.map((item) => (
              <li key={item.bookingId} className="mb-1">
                <Tag
                  color={
                    item.status === "AwaitingConfirmation"
                      ? "purple"
                      : item.status === "Scheduled"
                      ? "blue"
                      : item.status === "In Progress"
                      ? "orange"
                      : item.status === "Completed"
                      ? "green"
                      : "default"
                  }
                >
                  {item.status} (Slot {item.slotId})
                </Tag>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return info.originNode;
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4">Your Booking Schedule</h2>
      <Calendar cellRender={cellRender} />
    </div>
  );
}
