import { List, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

export default function TodayBooking({ bookings }) {
  const today = dayjs().format('YYYY-MM-DD');
  // Lọc booking theo bookingDate và chỉ lấy những booking có status là "In Progress"
  const todayBookings = bookings.filter(
    booking =>
      dayjs(booking.bookingDate).format('YYYY-MM-DD') === today &&
      booking.status === "In Progress"
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Today's Bookings</h2>
      {todayBookings.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={todayBookings}
          renderItem={booking => (
            <List.Item>
              <List.Item.Meta
                title={`Booking ID: ${booking.bookingId}`}
                description={`Service ID: ${booking.serviceId} | Slot ID: ${booking.slotId} | Status: ${booking.status}`}
              />
            </List.Item>
          )}
        />
      ) : (
        <Typography.Text>No bookings for today.</Typography.Text>
      )}
    </div>
  );
}
