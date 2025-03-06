import React from 'react';
import { List, Typography } from 'antd';
import dayjs from 'dayjs';

export default function TodayBooking({ bookings }) {
  const today = dayjs().format('YYYY-MM-DD');
  const todayBookings = bookings.filter(
    booking => dayjs(booking.date).format('YYYY-MM-DD') === today
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
                title={booking.serviceName}
                description={`Time: ${booking.time} | Location: ${booking.location} | Status: ${booking.status}`}
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
