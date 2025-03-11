import React, { useState, useEffect, useCallback } from "react";
import { Table, Tag, Button, message, Space, Modal } from "antd";
import AddBooking from "../Booking/partials/AddBooking";
import ViewBooking from "../Booking/partials/ViewBooking";
import getAllBook from "../../../modules/Booking/getAllBook";
import deleteBooking from "../../../modules/Booking/deleteBooking";
import BookingStatusSelect from "./partials/BookingStatusSelect";
import { TfiReload } from "react-icons/tfi";

export default function Booking() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Hàm fetch dữ liệu được định nghĩa bên ngoài để có thể sử dụng lại
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllBook();
      const formattedData = data.map((book) => ({
        key: book.bookingId,
        bookingId: book.bookingId,
        id: book.userId,
        name: book.customerName,
        email: book.customerEmail,
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
  }, []);

  useEffect(() => {
    fetchBookings();
    const intervalId = setInterval(fetchBookings, 60000); // Mỗi 1 phút
    return () => clearInterval(intervalId);
  }, [fetchBookings]);

  const handleAction = (record, action) => {
    if (action === "view") {
      setSelectedBooking(record);
      setShowViewBooking(true);
    } else if (action === "cancel") {
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
      title: "STT",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: "Slot Id",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
    {
      title: "Update Status",
      key: "updateStatus",
      width: 300,
      render: (_, record) => (
        <BookingStatusSelect
          bookingId={record.bookingId}
          currentStatus={record.status}
          onStatusUpdated={(id, newStatus) => {
            setDataSource((prevData) =>
              prevData.map((item) =>
                item.bookingId === id ? { ...item, status: newStatus } : item
              )
            );
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* Các hành động khác nếu cần */}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[22px] font-bold m-0">Skincare Service Bookings</h1>
          <Button color="primary" variant="solid" type="primary" onClick={fetchBookings}>
            <TfiReload />
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
