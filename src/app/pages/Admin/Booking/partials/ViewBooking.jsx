import React from "react";
import { Modal, Descriptions, Button } from "antd";

export default function ViewBooking({ booking, onClose }) {
  // Nếu chưa có booking, không render gì (tránh lỗi).
  if (!booking) return null;

  return (
    <Modal
      title="Booking Details"
      open
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="ID">{booking.id}</Descriptions.Item>
        <Descriptions.Item label="Customer Name">
          {booking.customerName}
        </Descriptions.Item>
        <Descriptions.Item label="Service">{booking.service}</Descriptions.Item>
        <Descriptions.Item label="Date">{booking.date}</Descriptions.Item>
        <Descriptions.Item label="Time">{booking.time}</Descriptions.Item>
        <Descriptions.Item label="Status">{booking.status}</Descriptions.Item>
        <Descriptions.Item label="Therapist">{booking.TherapistName}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
