import React, { useEffect, useState } from "react";
import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";
import StatusColor from "../../../../components/StatusColor";
import getTimeSlotById from "../../../../modules/Admin/TimeSlot/getTimeSlotById";

export default function BookingDetail({ booking }) {
  if (!booking) return null;

  const [timeSlot, setTimeSlot] = useState({ startTime: "", endTime: "" });

  useEffect(() => {
    const fetchTimeSlot = async () => {
      try {
        const response = await getTimeSlotById(booking.slotId);
        setTimeSlot({ startTime: response.startTime, endTime: response.endTime });
      } catch (error) {
        console.error("Error fetching time slot:", error);
      }
    };
    fetchTimeSlot();
  }, [booking.slotId]);

  return (
    <div className="p-4 bg-white rounded-md shadow-md min-h-[600px]">
      <Descriptions
        title={<div className="pt-2 text-xl font-semibold">Booking Detail</div>}
        bordered
        column={1}
        layout="horizontal"
      >
        {/* <Descriptions.Item label="Booking ID">{booking.bookingId}</Descriptions.Item> */}
        <Descriptions.Item label="Booking Date">
          {dayjs(booking.bookingDate).format("YYYY-MM-DD")}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={StatusColor(booking.status)}>{booking.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Service Name">{booking.serviceName}</Descriptions.Item>
        <Descriptions.Item label="Therapist Name">{booking.therapistName}</Descriptions.Item>
        <Descriptions.Item label="Duration">{booking.durationMinutes} Mins</Descriptions.Item>
        {/* NOTE: Hiển thị thông tin thời gian của slot */}
        <Descriptions.Item label="Start Time">{timeSlot.startTime || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="End Time">{timeSlot.endTime || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Service Price">
          {booking.servicePrice} {booking.currency}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Status">
          <Tag color={StatusColor(booking.paymentStatus)}>{booking.paymentStatus}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
