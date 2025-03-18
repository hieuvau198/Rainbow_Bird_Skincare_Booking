import React from "react";
import { Table, Button, Space } from "antd";
import BookingStatusSelect from "./BookingStatusSelect";

const BookingTable = ({ title, data, fetchBookings, handleViewBooking }) => {
  const columns = [
    { title: "No.", key: "stt", width: 60, render: (_, __, index) => index + 1 },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Service Name", dataIndex: "serviceName", key: "serviceName" },
    { 
      title: "Booking Date", 
      dataIndex: "bookingDate", 
      key: "bookingDate", 
      width: 120, 
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span> 
    },
    {
      title: "Update Status",
      key: "updateStatus",
      width: 280,
      render: (_, record) => (
        <BookingStatusSelect
          bookingId={record.bookingId}
          currentStatus={record.status}
          onStatusUpdated={fetchBookings}
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
            type="primary"
            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
            onClick={() => handleViewBooking(record)}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="bookingId"
        bordered
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content", y: 250 }}
      />
    </div>
  );
};

export default BookingTable;
