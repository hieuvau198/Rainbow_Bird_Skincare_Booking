import React from "react";
import { Table, Tag, Button, message } from "antd";

export default function Booking() {
  const dataSource = [
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
  ];

  const handleAction = (record, action) => {
    if (action === "view") {
      message.info(`Viewing details of booking ID: ${record.id}`);
    } else if (action === "cancel") {
      message.warning(`Cancelling booking ID: ${record.id}`);
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
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            size="small"
            className="mr-2"
            onClick={() => handleAction(record, "view")}
          >
            View
          </Button>
          <Button
            type="default"
            size="small"
            danger
            disabled={record.status === "Completed"}
            onClick={() => handleAction(record, "cancel")}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        margin: "20px auto",
        padding: "16px",
        backgroundColor: "#f0f0f0",
        maxWidth: "1600px", // Set max width for the table container
      }}
    >
      <div
        style={{
          backgroundColor: "#fff", // White background for the table
          borderRadius: "16px",
          padding: "18px",
          display: "flex",
          justifyContent: "center", // Center table horizontally
        }}
      >
        <div style={{ width: "100%" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>
            Skincare Service Bookings
          </h1>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
}
