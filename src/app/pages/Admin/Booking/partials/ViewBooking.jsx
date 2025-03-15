import { Button, Descriptions, Modal, Select, Space, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import StatusColor from "../../../../components/StatusColor";
import getTherapistById from "../../../../modules/Admin/Employee/getTherapistById";
import getTheBySlotId from "../../../../modules/Admin/TimeSlot/getTheBySlotId";
import getTimeSlotById from "../../../../modules/Admin/TimeSlot/getTimeSlotById";
import changeTherapist from "../../../../modules/Booking/changeTherapist";

export default function ViewBooking({ booking, onClose }) {
  if (!booking) return null;

  const [editingTherapist, setEditingTherapist] = useState(false);
  const [therapistOptions, setTherapistOptions] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [theName, setTherapistName] = useState(null);
  const [timeSlot, setTimeSlot] = useState({ startTime: "", endTime: "" });
  const [error, setError] = useState("");

  const loadTherapists = async () => {
    try {
      const response = await getTheBySlotId(booking.slotId);
      if (Array.isArray(response) && response.length > 0) {
        const options = response.filter(
          (therapist) => therapist.therapistId !== booking.therapistId
        );
        setTherapistOptions(options);
      }
    } catch (error) {
      console.error("Error fetching therapist list:", error);
    }
  };

  useEffect(() => {
    const fetchTherapistName = async () => {
      try {
        const response = await getTherapistById(booking.therapistId);
        setTherapistName(response.user.username);
      } catch (error) {
        console.error("Error fetching therapist name:", error);
      }
    };
    fetchTherapistName();
  }, [booking.therapistId]);

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
      const data = await changeTherapist(booking.bookingId, selectedTherapist);
      booking.therapistId = selectedTherapist;
      setEditingTherapist(false);
      setError(data.message);
      message.success(data.message);
    } catch (e) {
      message.error(e.message);
      console.log("error: ", e);
    }
  };

  return (
    <Modal
      title={<div className="text-center text-2xl font-bold">Booking Details</div>}
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
        <Descriptions.Item label="Customer Name">{booking.customerName}</Descriptions.Item>
        <Descriptions.Item label="Service Name">{booking.serviceName}</Descriptions.Item>
        <Descriptions.Item label="Booking Date">{booking.bookingDate}</Descriptions.Item>
        <Descriptions.Item label="Start Time">{timeSlot.startTime || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="End Time">{timeSlot.endTime || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Therapist">
          {editingTherapist ? (
            <Space>
              <Select
                placeholder="Select therapist"
                style={{ width: 200 }}
                onChange={(value) => setSelectedTherapist(value)}
              >
                {therapistOptions.map((therapist) => (
                  <Select.Option key={therapist.therapistId} value={therapist.therapistId}>
                    ID: {therapist.therapistId} - {therapist.therapistName}
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
              <Tag color="blue">{theName || "N/A"}</Tag>
              <Button color="primary" variant="solid" type="link" onClick={handleEditTherapist}>
                Change Therapist
              </Button>
            </Space>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={StatusColor(booking.status)}>{booking.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Customer Phone">{booking.customerPhone}</Descriptions.Item>
        <Descriptions.Item label="Customer Email">{booking.customerEmail}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
