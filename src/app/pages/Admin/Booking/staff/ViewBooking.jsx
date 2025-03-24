import { Button, Descriptions, Modal, Select, Space, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import StatusColor from "../../../../components/StatusColor";
import getTherapistById from "../../../../modules/Admin/Employee/getTherapistById";
import getTheBySlotId from "../../../../modules/Admin/TimeSlot/getTheBySlotId";
import getTimeSlotById from "../../../../modules/Admin/TimeSlot/getTimeSlotById";
import changeTherapist from "../../../../modules/Booking/changeTherapist";
import { editBookingStatus } from "../../../../modules/Booking/editBookingStatus";
import { getBookingStatus } from "../../../../modules/Booking/getBookingStatus";
import FormatDate from "../../../../components/FormatDate";
import VndFormat from "../../../../components/VndFormat/VndFormat";
import PaymentModal from "./PaymentModal";
import UserRole from "../../../../../enums/userRole";
import DecodeRole from "../../../../components/DecodeRole";

export default function ViewBooking({ booking, onClose, onStatusUpdated }) {
  if (!booking) return null;

  const [editingTherapist, setEditingTherapist] = useState(false);
  const [therapistOptions, setTherapistOptions] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [therapistName, setTherapistName] = useState(booking.therapistName || "N/A");
  const [timeSlot, setTimeSlot] = useState({ startTime: "", endTime: "" });
  const [error, setError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  
  // State cho chỉnh sửa trạng thái
  const [editingStatus, setEditingStatus] = useState(false);
  const [availableStatusOptions, setAvailableStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(booking.status);
  const [loadingStatus, setLoadingStatus] = useState(false);

  // Tải luôn danh sách next status khi modal mở
  useEffect(() => {
    async function fetchAvailableStatuses() {
      setLoadingStatus(true);
      try {
        const response = await getBookingStatus(booking.bookingId);
        if (
          response.success &&
          response.data &&
          Array.isArray(response.data.nextStatuses)
        ) {
          setAvailableStatusOptions(response.data.nextStatuses);
        } else {
          setAvailableStatusOptions([]);
        }
      } catch (error) {
        console.error("Error fetching statuses", error);
        setAvailableStatusOptions([]);
      } finally {
        setLoadingStatus(false);
      }
    }
    fetchAvailableStatuses();
  }, [booking.bookingId]);

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

  const fetchTherapistName = async (therapistId) => {
    try {
      const response = await getTherapistById(therapistId);
      setTherapistName(response.user.fullName);
    } catch (error) {
      console.error("Error fetching therapist name:", error);
    }
  };

  useEffect(() => {
    fetchTherapistName(booking.therapistId);
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

  // Chỉ cho phép thay đổi therapist khi status là "Await Confirmation"
  const handleEditTherapist = () => {
    if (booking.status !== "Await Confirmation") {
      message.info("Therapist can only be changed when status is 'Await Confirmation'");
      return;
    }
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
      await fetchTherapistName(selectedTherapist); // Fetch new therapist name after successful update
      setEditingTherapist(false);
      setError(data.message);
      message.success(data.message);
      if (onStatusUpdated) {
        onStatusUpdated(); // Update parent component if needed
      }
    } catch (e) {
      message.error(e.message);
      console.log("error: ", e);
    }
  };

  const handleSaveStatus = async () => {
    if (!selectedStatus || selectedStatus === booking.status) {
      message.info("Please select a different status");
      return;
    }

    if (
      (selectedStatus === "Cancelled by Customer" ||
        selectedStatus === "Cancelled by Therapist") &&
      !cancelReason.trim()
    ) {
      message.warning("Please enter a reason for cancellation");
      return;
    }

    try {
      const data = await editBookingStatus(booking.bookingId, selectedStatus);
      booking.status = selectedStatus;
      setEditingStatus(false);
      message.success(data.message);
      if (onStatusUpdated) {
        onStatusUpdated();
      }
    } catch (e) {
      message.error(e.message);
      console.log("error: ", e);
    }
  };

  const handleCheckOut = () => {
    message.success("Check Out successfully");
    if (onStatusUpdated) {
      onStatusUpdated();
    }
    onClose();
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Modal
      title={<div className="text-center text-2xl font-bold">Booking Details</div>}
      open
      onCancel={onClose}
      width={700}
      footer={[
        booking.status === "Checked Out" && (
          <Button key="checkout" type="primary" onClick={handleCheckOut}>
            Check Out
          </Button>
        ),
        booking.paymentStatus === "Pending" ? (
          <Button
            key="pay"
            type="primary"
            className="bg-green-500"
            onClick={() => setShowPaymentModal(true)}
          >
            Proceed to Payment
          </Button>
        ) : (
          <Button key="close" onClick={onClose}>
            Close
          </Button>
        )
      ]}
    >
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="ID">{booking.bookingId}</Descriptions.Item>
        <Descriptions.Item label="Customer Name">{booking.customerName}</Descriptions.Item>
        <Descriptions.Item label="Service Name">{booking.serviceName}</Descriptions.Item>
        <Descriptions.Item label="Booking Date"><FormatDate date={booking.bookingDate} /></Descriptions.Item>
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
              <Tag color="blue">{therapistName || "N/A"}</Tag>
              {booking.status === "Await Confirmation" && 
              DecodeRole() !== UserRole.ADMIN && (
                <Button color="primary" variant="solid" type="link" onClick={handleEditTherapist}>
                  Change Therapist
                </Button>
              )}
            </Space>
          )}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Status">
          {editingStatus ? (
            <Space>
              <Select
                placeholder="Select status"
                style={{ width: 200 }}
                onChange={(value) => setSelectedStatus(value)}
                value={selectedStatus}
                loading={loadingStatus}
              >
                {availableStatusOptions.map((status) => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
              <Button type="primary" onClick={handleSaveStatus}>
                Save
              </Button>
              <Button onClick={() => setEditingStatus(false)}>Cancel</Button>
            </Space>
          ) : (
            <Space>
              <Tag color={StatusColor(booking.status)}>{booking.status}</Tag>
              {availableStatusOptions &&
                availableStatusOptions.length > 0 &&
                booking.therapistId !== 0 && 
                DecodeRole() !== UserRole.ADMIN && (
                  <Button color="primary" variant="solid" type="link" onClick={() => setEditingStatus(true)}>
                    Edit Status
                  </Button>
                )}
            </Space>
          )}
        </Descriptions.Item> */}
        <Descriptions.Item label="Status">
          {editingStatus ? (
            <Space direction="vertical" className="w-full">
              <Select
                placeholder="Select status"
                style={{ width: 200 }}
                onChange={(value) => setSelectedStatus(value)}
                value={selectedStatus}
                loading={loadingStatus}
              >
                {availableStatusOptions.map((status) => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>

              {/* ✅ Nếu chọn 2 trạng thái cần lý do thì hiển thị input */}
              {(selectedStatus === "Cancelled By Customer" ||
                selectedStatus === "Cancelled By Therapist") && (
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded p-2 mt-2"
                  placeholder="Enter reason for cancellation..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              )}

              <div className="flex gap-2 mt-2">
                <Button type="primary" onClick={handleSaveStatus}>
                  Save
                </Button>
                <Button onClick={() => setEditingStatus(false)}>Cancel</Button>
              </div>
            </Space>
          ) : (
            <Space>
              <Tag color={StatusColor(booking.status)}>{booking.status}</Tag>
              {availableStatusOptions &&
                availableStatusOptions.length > 0 &&
                booking.therapistId !== 0 &&
                DecodeRole() !== UserRole.ADMIN && (
                  <Button
                    color="primary"
                    variant="solid"
                    type="link"
                    onClick={() => setEditingStatus(true)}
                  >
                    Edit Status
                  </Button>
                )}
            </Space>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Phone">{booking.customerPhone}</Descriptions.Item>
        <Descriptions.Item label="Customer Email">{booking.customerEmail}</Descriptions.Item>
        <Descriptions.Item label="Service Price">
          <VndFormat amount={booking.servicePrice} />
        </Descriptions.Item>
        <Descriptions.Item label="Payment Status">
          <Tag color={StatusColor(booking.paymentStatus)}>{booking.paymentStatus}</Tag>
        </Descriptions.Item>
      </Descriptions>

      {showPaymentModal && (
        <PaymentModal
          visible={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          bookingId={booking.bookingId}
          amount={booking.servicePrice}
          currency={booking.currency}
        />
      )}
    </Modal>
  );
}
