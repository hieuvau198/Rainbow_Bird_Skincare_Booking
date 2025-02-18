import React, { useState, useEffect } from "react";
import { Calendar, Tag } from "antd";
import dayjs from "dayjs";

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
    // Giả lập gọi API và gán mock data cho state bookings
    setBookings(mockBookings);
  }, []);

  // Sử dụng cellRender thay cho dateCellRender
  const cellRender = (current, info) => {
    // Chỉ customize hiển thị cho ô ngày (type === "date")
    if (info.type === "date") {
      const calendarDate = dayjs(current).format("YYYY-MM-DD");
      const dayBookings = bookings.filter((booking) => {
        const bookingDate = dayjs(booking.date).format("YYYY-MM-DD");
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
                    item.status === "Scheduled"
                      ? "blue"
                      : item.status === "In Progress"
                      ? "orange"
                      : item.status === "Completed"
                      ? "green"
                      : "default"
                  }
                >
                  {item.serviceName} ({item.time})
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
    <div className="p-6 px-20">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Booking Schedule</h2>
        <Calendar cellRender={cellRender} />
      </div>
    </div>
  );
}
