import { Button, Modal, Select, Space, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import UserRole from "../../../../../enums/userRole";
import DecodeRole from "../../../../components/DecodeRole";
import { editBookingStatus } from "../../../../modules/Booking/editBookingStatus";
import { getBookingStatus } from "../../../../modules/Booking/getBookingStatus";
import StatusColor from "../../../../components/StatusColor";


const BookingStatusSelect = ({ bookingId, currentStatus, onStatusUpdated }) => {
  const [statusOptions, setStatusOptions] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isUpdated, setIsUpdated] = useState(false);

  const userRole = DecodeRole();

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await getBookingStatus(bookingId);
        if (
          response.success &&
          response.data &&
          Array.isArray(response.data.nextStatuses) &&
          response.data.nextStatuses.length > 0
        ) {
          setStatusOptions(response.data.nextStatuses);
          setSelectedStatus(currentStatus);
        } else {
          setStatusOptions([]);
        }
      } catch (error) {
        console.error("Error fetching statuses", error);
        setStatusOptions([]);
      } finally {
        setLoadingStatus(false);
      }
    }
    fetchStatuses();
  }, [bookingId, currentStatus]);

  const handleSelectChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setIsUpdated(false);
  };

  const handleUpdateClick = async () => {
    if (selectedStatus === currentStatus) {
      message.info("No changes to update");
      return;
    }
    const requireConfirmationStatuses = [
      "Cancelled By Customer",
      "Cancelled By Staff",
      "No Show",
      "Incomplete",
    ];

    const updateAction = async () => {
      try {
        await editBookingStatus(bookingId, selectedStatus);
        message.success("Booking status updated");
        setIsUpdated(true);
        if (onStatusUpdated) {
          onStatusUpdated(bookingId, selectedStatus);
        }

      } catch (error) {
        message.error("Failed to update status");
      }
    };

    if (requireConfirmationStatuses.includes(selectedStatus)) {
      Modal.confirm({
        title: "Confirm Status Change",
        content: (
          <span>
            Are you sure you want to change the status to{" "}
            <strong>{selectedStatus}</strong>?
          </span>
        ),
        width: 550,
        okText: "Confirm",
        cancelText: "Cancel",
        okButtonProps: { danger: true },
        onOk: updateAction,
      });
    } else {
      await updateAction();
    }
  };

  if (loadingStatus) return null;

  // Nếu không có statusOptions, chỉ hiển thị Tag
  if (statusOptions.length === 0) {
    return <Tag color={StatusColor(selectedStatus)}>{selectedStatus}</Tag>;
  }

  // Nếu status hiện tại là "In Progress" nhưng user không phải Therapist, chỉ hiển thị Tag
  if (currentStatus === "In Progress" && userRole !== UserRole.THERAPIST) {
    return <Tag color={StatusColor(selectedStatus)}>{selectedStatus}</Tag>;
  }

  // Nếu user là Therapist nhưng status hiện tại KHÔNG phải "In Progress", chỉ hiển thị Tag
  if (userRole === UserRole.THERAPIST && currentStatus !== "In Progress") {
    return <Tag color={StatusColor(selectedStatus)}>{selectedStatus}</Tag>;
  }

  return (
    <Space>
      <Select
        value={selectedStatus}
        onChange={handleSelectChange}
        style={{ width: 180 }}
        optionLabelProp="label"
      >
        {statusOptions.map((status) => {
          const color = StatusColor(status);
          return (
            <Select.Option
              key={status}
              value={status}
              label={<Tag color={color}>{status}</Tag>}
            >
              <Tag color={color}>{status}</Tag>
            </Select.Option>
          );
        })}
      </Select>
      <Button type="primary" onClick={handleUpdateClick}>
        Change
      </Button>
    </Space>
  );
};

export default BookingStatusSelect;
