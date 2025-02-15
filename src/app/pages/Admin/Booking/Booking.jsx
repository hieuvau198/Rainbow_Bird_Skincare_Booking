import React, { useState } from "react";
import { Table, Tag, Button, message, Space, Modal } from "antd";
import AddBooking from "../Booking/partials/AddBooking";
import ViewBooking from "../Booking/partials/ViewBooking";

export default function Booking() {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      id: "B001",
      customerName: "Nguyen Van A",
      service: "Facial Treatment",
      date: "2025-01-16",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      key: "2",
      id: "B002",
      customerName: "Le Thi B",
      service: "Acne Treatment",
      date: "2025-01-14",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      key: "3",
      id: "B003",
      customerName: "Tran Van C",
      service: "Skin Whitening",
      date: "2025-01-17",
      time: "2:00 PM",
      status: "Completed",
    },
  ]);

  const [showAddBooking, setShowAddBooking] = useState(false);
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleAction = (record, action) => {
    if (action === "view") {
      setSelectedBooking(record);
      setShowViewBooking(true);
    } else if (action === "cancel") {
      Modal.confirm({
        title: "Confirm Deletion",
        content: `Are you sure you want to delete booking ID: ${record.id}?`,
        okText: "Yes",
        cancelText: "No",
        onOk: () => {
          setDataSource((prevData) =>
            prevData.filter((item) => item.id !== record.id)
          );
          message.success(`Deleted booking ID: ${record.id}`);
        },
      });
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Confirmed"
            ? "green"
            : status === "Pending"
              ? "gold"
              : "gray";
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button color="gold" variant="solid" type="link" onClick={() =>
            handleAction(record, "view")}>View details</Button>
          <Button color="danger" variant="solid" type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[580px]">
        {/* Dòng chứa tiêu đề và nút Add Booking */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[22px] font-bold m-0">
            Skincare Service Bookings
          </h1>
          <Button type="primary" size="normal" onClick={() => setShowAddBooking(true)}>
            + Add Booking
          </Button>
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={{ pageSize: 5 }}
        />
      </div>

      {showAddBooking && <AddBooking onClose={() => setShowAddBooking(false)} />}
      {showViewBooking && (
        <ViewBooking
          booking={selectedBooking}
          onClose={() => setShowViewBooking(false)}
        />
      )}
    </div>
  );
}
