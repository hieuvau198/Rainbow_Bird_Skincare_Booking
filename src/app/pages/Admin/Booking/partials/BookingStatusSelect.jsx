import React, { useState, useEffect } from "react";
import { Space, Select, Button, Modal, Tag, message } from "antd";
import { getBookingStatus } from "../../../../modules/Booking/getBookingStatus";
import { editBookingStatus } from "../../../../modules/Booking/editBookingStatus";
import DecodeRole from "../../../../components/DecodeRole";
import UserRole from "../../../../../enums/userRole";

const getStatusColor = (status) => {
    switch (status) {
        case "Await Confirmation":
            return "warning";
        case "Confirmed":
            return "green";
        case "Cancelled By Customer":
        case "Cancelled By Staff":
            return "volcano";
        case "Checked In":
            return "blue";
        case "No Show":
            return "red";
        case "In Progress":
            return "orange";
        case "Completed":
            return "green";
        case "Checked Out":
            return "cyan";
        default:
            return "default";
    }
};

const BookingStatusSelect = ({ bookingId, currentStatus, onStatusUpdated }) => {
    const [statusOptions, setStatusOptions] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    // Lấy role của người dùng
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
        if (requireConfirmationStatuses.includes(selectedStatus)) {
            Modal.confirm({
                title: "Confirm Status Change",
                content: (
                    <span>
                        Are you sure you want to change the status to{" "}
                        <strong>{selectedStatus}</strong>?
                    </span>
                ),
                okText: "Confirm",
                cancelText: "Cancel",
                okButtonProps: { danger: true },
                onOk: async () => {
                    try {
                        await editBookingStatus(bookingId, selectedStatus);
                        message.success("Booking status updated");
                        if (onStatusUpdated) {
                            onStatusUpdated(bookingId, selectedStatus);
                        }
                    } catch (error) {
                        message.error("Failed to update status");
                    }
                },
            });
        } else {
            try {
                await editBookingStatus(bookingId, selectedStatus);
                message.success("Booking status updated");
                if (onStatusUpdated) {
                    onStatusUpdated(bookingId, selectedStatus);
                }
            } catch (error) {
                message.error("Failed to update status");
            }
        }
    };

    if (loadingStatus) return null;

    if (selectedStatus === "In Progress" && userRole !== UserRole.THERAPIST) {
        return <Tag color={getStatusColor(selectedStatus)}>{selectedStatus}</Tag>;
    }

    if (statusOptions.length === 0) {
        return <Tag color={getStatusColor(selectedStatus)}>{selectedStatus}</Tag>;
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
                    const color = getStatusColor(status);
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