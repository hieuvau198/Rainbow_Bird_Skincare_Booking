import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message, Space, Modal } from "antd";
import { TfiReload } from "react-icons/tfi";
import UserRole from "../../../../enums/userRole";
import DecodeRole from "../../../components/DecodeRole";
import deleteBooking from "../../../modules/Booking/deleteBooking";
import getAllBook from "../../../modules/Booking/getAllBook";
import getBookingById from "../../../modules/Booking/getBookingById";
import ViewBooking from "../Booking/partials/ViewBooking";
import BookingStatusSelect from "./partials/BookingStatusSelect";
import DecodeRoleId from "../../../components/DecodeRoleId";
import getBookByTheId from "../../../modules/Booking/getBookByTheId";

export default function Booking() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const userRole = DecodeRole();


  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      let data = [];
      if (userRole === UserRole.THERAPIST) {
        // Lấy therapistId từ cookie thông qua DecodeRoleId
        const therapistId = DecodeRoleId("__TheIden");
        data = await getBookByTheId(therapistId);
        // Chỉ lấy ra các booking có status "In Progress"
        data = data.filter((book) => book.status === "In Progress");
      } else {
        data = await getAllBook();
      }
      const formattedData = data.map((book) => ({
        key: book.bookingId,
        bookingId: book.bookingId,
        id: book.userId,
        name: book.customerName,
        serviceName: book.serviceName,
        bookingDate: book.bookingDate,
        timeSlot: book.slotId,
        status: book.status,
      }));
      setDataSource(formattedData);
    } catch (error) {
      message.error("Failed to fetch bookings");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [userRole]);

  useEffect(() => {
    fetchBookings();
    const intervalId = setInterval(fetchBookings, 60000);
    return () => clearInterval(intervalId);
  }, [fetchBookings]);

  const handleAction = async (record, action) => {
    if (action === "View details") {
      try {
        const detail = await getBookingById(record.bookingId);
        setSelectedBooking(detail);
        setShowViewBooking(true);
      } catch (error) {
        message.error("Failed to fetch booking details");
        console.error("Error fetching booking detail:", error);
      }
    } else if (action === "Delete") {
      Modal.confirm({
        title: "Confirm Deletion",
        content: `Are you sure you want to delete booking ID: ${record.bookingId}?`,
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          try {
            await deleteBooking(record.bookingId);
            setDataSource((prevData) =>
              prevData.filter((item) => item.bookingId !== record.bookingId)
            );
            message.success(`Deleted booking ID: ${record.bookingId}`);
          } catch (error) {
            message.error("Failed to delete booking");
          }
        },
      });
    }
  };

  const columns = [
    {
      title: "No.",
      key: "stt",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "customerName",
    },
    {
      title: "Sevice Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 120,
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: "Update Status",
      key: "updateStatus",
      width: 280,
      render: (_, record) => (
        <BookingStatusSelect
          bookingId={record.bookingId}
          currentStatus={record.status}
          onStatusUpdated={() => {
            fetchBookings();
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="primary"
            variant="solid"
            type="link"
            onClick={() => handleAction(record, "View details")}
          >
            View details
          </Button>
          {/* {userRole === UserRole.ADMIN && (
            <Button
              color="red"
              variant="solid"
              type="link"
              danger
              onClick={() => handleAction(record, "Delete")}
            >
              Delete
            </Button>
          )} */}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[22px] font-bold m-0">
            Skincare Service Bookings
          </h1>
          <Button type="primary" onClick={fetchBookings}>
            <TfiReload style={{ marginRight: 8 }} />
            Reload Data
          </Button>
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="bookingId"
          bordered
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content", y: 400 }}
          loading={loading}
        />
      </div>

      {showViewBooking && (
        <ViewBooking
          booking={selectedBooking}
          onClose={() => setShowViewBooking(false)}
        />
      )}
    </div>
  );
}
