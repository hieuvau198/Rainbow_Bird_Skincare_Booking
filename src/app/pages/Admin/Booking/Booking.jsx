import React, { useState, useEffect } from "react";
import { Table, Tag, Button, message, Space, Modal } from "antd";
import AddBooking from "../Booking/partials/AddBooking";
import ViewBooking from "../Booking/partials/ViewBooking";
import getAllBook from "../../../modules/Booking/getAllBook";
import deleteBooking from "../../../modules/Booking/deleteBooking";

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
        const formattedData = data.map(book => ({
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
        onOk: async () => {
          try {
            await deleteBooking(record.bookingId);
            setDataSource(prevData =>
              prevData.filter(item => item.bookingId !== record.bookingId)
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
      key: "customernameName",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Confirmed":
            color = "green";
            break;
          case "Cancelled By Customer":
          case "Cancelled By Staff":
            color = "volcano";
            break;
          case "Checked In":
            color = "blue";
            break;
          case "No Show":
            color = "red";
            break;
          case "In Process":
            color = "orange";
            break;
          case "Completed":
            color = "green";
            break;
          case "Checked Out":
            color = "cyan";
            break;
          default:
            color = "default";
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Button type="link" onClick={() => handleAction(record, "view")}>
            View details
          </Button> */}
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
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[22px] font-bold m-0">Skincare Service Bookings</h1>
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
        <ViewBooking booking={selectedBooking} onClose={() => setShowViewBooking(false)} />
      )}
    </div>
  );
}
