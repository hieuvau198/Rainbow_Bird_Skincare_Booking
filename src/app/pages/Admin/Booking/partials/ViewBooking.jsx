import React, { useState, useEffect } from "react";
import { Modal, Descriptions, Button, Tag, Select, Space, message } from "antd";
import { getStatusColor } from "./BookingStatusSelect";
import getTherapist from "../../../../modules/Admin/Employee/getTherapist";
import changeTherapist from "../../../../modules/Booking/changeTherapist";
import StatusColor from "../../../../components/StatusColor";

export default function ViewBooking({ booking, onClose }) {
  if (!booking) return null;

  const [editingTherapist, setEditingTherapist] = useState(false);
  const [therapistOptions, setTherapistOptions] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const loadTherapists = async () => {
    try {
      const response = await getTherapist();
      if (Array.isArray(response) && response.length > 0) {
        const options = response.filter(
          (therapist) => therapist.therapistId !== booking.therapistId
        );
        setTherapistOptions(options);
      }
    } catch (error) {
      message.error("Failed to fetch therapist list");
      console.error("Error fetching therapist list:", error);
    }
  };

  const handleEditTherapist = () => {
    setEditingTherapist(true);
    loadTherapists();
  };

  const handleSaveTherapist = async () => {
    if (!selectedTherapist) {
      message.info("Please select a therapist");
      return;
    }
    try {
      await changeTherapist(booking.bookingId, selectedTherapist);
      message.success("Therapist updated successfully");
      booking.therapistId = selectedTherapist;
      setEditingTherapist(false);
    } catch (error) {
      message.error("Failed to update therapist");
      console.error("Error updating therapist:", error);
    }
  };

  return (
    <Modal
      title={
        <div className="text-center text-2xl font-bold">Booking Details</div>
      }
      open
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="ID">{booking.bookingId}</Descriptions.Item>
        <Descriptions.Item label="Customer Name">
          {booking.customerName}
        </Descriptions.Item>
        <Descriptions.Item label="Service Id">{booking.serviceId}</Descriptions.Item>
        <Descriptions.Item label="Booking Date">{booking.bookingDate}</Descriptions.Item>
        <Descriptions.Item label="Slot Id">{booking.slotId}</Descriptions.Item>
        <Descriptions.Item label="Therapist Id">
          {editingTherapist ? (
            <Space>
              <Select
                placeholder="Select therapist"
                style={{ width: 200 }}
                onChange={(value) => setSelectedTherapist(value)}
              >
                {therapistOptions.map((therapist) => (
                  <Select.Option key={therapist.therapistId} value={therapist.therapistId}>
                    ID: {therapist.therapistId} - {therapist.user.fullName}
                  </Select.Option>
                ))}
              </Select>
              <Button type="primary" onClick={handleSaveTherapist}>
                Save
              </Button>
              <Button onClick={() => setEditingTherapist(false)}>Cancel</Button>
            </Space>
          ) : (
            <Space>
              <Tag  color="blue">{booking.therapistId || "N/A"}</Tag>
              <Button color="primary" variant="solid" type="link" onClick={handleEditTherapist}>
                Change Therapist
              </Button>
            </Space>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={StatusColor(booking.status)}>{booking.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Customer Phone">
          {booking.customerPhone}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Email">
          {booking.customerEmail}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
