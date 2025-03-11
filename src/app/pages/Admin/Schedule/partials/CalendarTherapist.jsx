import { Calendar, Tag } from 'antd';
import React from 'react';
import StatusColor from '../../../../components/StatusColor';

export default function CalendarTherapist({ bookings }) {
  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const dateStr = current.format('YYYY-MM-DD');
      const dayBookings = bookings.filter(
        (booking) =>
          booking.bookingDate === dateStr &&
          booking.status === "In Progress"
      );
      return (
        <div className="relative">
          {info.originNode}
          {dayBookings.length > 0 && (
            <ul className="mt-1 space-y-1">
              {dayBookings.map((item) => (
                <li key={item.bookingId}>
                  <Tag color={StatusColor(item.status)}>Service ID: {item.serviceId}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    return info.originNode;
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md h-full">
      <Calendar cellRender={cellRender} fullscreen />
    </div>
  );
}
