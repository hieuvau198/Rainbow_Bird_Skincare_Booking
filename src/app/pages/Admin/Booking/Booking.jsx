import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message, Space, Modal } from "antd";
import AddBooking from "../Booking/partials/AddBooking";
import ViewBooking from "../Booking/partials/ViewBooking";
import getAllBook from "../../../modules/Booking/getAllBook";

export default function Booking() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBook();
        setDataSource(data);
      } catch (error) {
        message.error("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

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
        onOk: () => {
          setDataSource(prevData =>
            prevData.filter(item => item.bookingId !== record.bookingId)
          );
          message.success(`Deleted booking ID: ${record.bookingId}`);
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
      title: "ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customerName",
      render: (customer) => (customer && customer.fullName ? customer.fullName : "N/A"),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (service, record) =>
        service && service.name ? service.name : `Service ${record.serviceId}`,
    },
    {
      title: "Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: "Time",
      dataIndex: "timeSlot",
      key: "timeSlot",
      render: (timeSlot) =>
        timeSlot && timeSlot.startTime ? timeSlot.startTime : "N/A",
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
          <Button type="link" onClick={() => handleAction(record, "view")}>
            View details
          </Button>
          {/* <Button type="link" danger onClick={() => handleAction(record, "cancel")}>
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        {/* Header với tiêu đề và nút Add Booking */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[22px] font-bold m-0">Skincare Service Bookings</h1>
          {/* <Button type="primary" size="normal" onClick={() => setShowAddBooking(true)}>
            + Add Booking
          </Button> */}
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="bookingId"
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content", y: 400 }}
          loading={loading}
        />
      </div>

      {/* {showAddBooking && <AddBooking onClose={() => setShowAddBooking(false)} />} */}
      {showViewBooking && (
        <ViewBooking booking={selectedBooking} onClose={() => setShowViewBooking(false)} />
      )}
    </div>
  );
}
