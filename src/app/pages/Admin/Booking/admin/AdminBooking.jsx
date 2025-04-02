// admin/AdminBooking.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message, Space, Modal, Tag, Row, Col } from "antd";
import deleteBooking from "../../../../modules/Booking/deleteBooking";
import getAllBook from "../../../../modules/Booking/getAllBook";
import getBookingById from "../../../../modules/Booking/getBookingById";
import ViewBooking from "../staff/ViewBooking";
import StatusColor from "../../../../components/StatusColor";
import FormatDate from "../../../../components/FormatDate";
import { TfiReload } from "react-icons/tfi";

export default function AdminBooking() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [statusCounts, setStatusCounts] = useState({});

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()}`;
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllBook();
      const formattedData = data.map((book) => ({
        key: book.bookingId,
        bookingId: book.bookingId,
        id: book.userId,
        customerName: book.customerName,
        serviceName: book.serviceName,
        bookingDate: book.bookingDate,
        timeSlot: book.slotId,
        status: book.status,
      }));
      setDataSource(formattedData);

      const counts = formattedData.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      }, {});
      setStatusCounts({ ...counts, All: formattedData.length });

      applyStatusFilter(selectedStatus, formattedData);
    } catch (error) {
      message.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    fetchBookings();
    const intervalId = setInterval(fetchBookings, 60000);
    return () => clearInterval(intervalId);
  }, [fetchBookings]);

  const applyStatusFilter = (status, data = dataSource) => {
    if (status === "All") {
      setFilteredDataSource(data);
    } else {
      setFilteredDataSource(data.filter((booking) => booking.status === status));
    }
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    applyStatusFilter(status);
  };

  const handleAction = async (record, action) => {
    if (action === "View details") {
      try {
        const detail = await getBookingById(record.bookingId);
        setSelectedBooking(detail);
        setShowViewBooking(true);
      } catch (error) {
        message.error("Failed to fetch booking details");
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
            setFilteredDataSource((prevData) =>
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

  const serviceNameFilters = Array.from(
    new Set(dataSource.map((book) => book.serviceName))
  ).map((value) => ({ text: value, value }));

  const bookingDateFilters = Array.from(
    new Set(dataSource.map((book) => formatDate(book.bookingDate)))
  ).map((value) => ({ text: value, value }));

  const statusFilters = Array.from(
    new Set(dataSource.map((book) => book.status))
  ).map((value) => ({ text: value, value }));

  const uniqueStatuses = ["All", ...Array.from(new Set(dataSource.map((item) => item.status)))];

  const columns = [
    {
      title: "No.",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      filters: serviceNameFilters,
      onFilter: (value, record) =>
        record.serviceName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      render: (date) => <FormatDate date={date} />,
      width: 150,
      filters: bookingDateFilters,
      onFilter: (value, record) => formatDate(record.bookingDate) === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={StatusColor(status)}>{status}</Tag>,
      width: 150,
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button color="primary" variant="solid" type="link" onClick={() => handleAction(record, "View details")}>
            View details
          </Button>
          {/* <Button color="red" variant="solid" type="link" danger onClick={() => handleAction(record, "Delete")}>
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
          <h1 className="text-[22px] font-bold m-0">Admin Bookings</h1>
          <Button type="primary" onClick={fetchBookings}>
            <TfiReload style={{ marginRight: 4 }} />
            Reload
          </Button>
        </div>

        <div className="mb-5">
          <Row gutter={[8, 8]} wrap>
            {uniqueStatuses.map((status) => (
              <Col key={status}>
                <Button
                  type={selectedStatus === status ? "primary" : "default"}
                  onClick={() => handleStatusFilter(status)}
                  style={
                    status !== "All"
                      ? {
                          backgroundColor:
                            selectedStatus === status ? StatusColor(status) : undefined,
                        }
                      : {}
                  }
                >
                  {status} ({statusCounts[status] || 0})
                </Button>
              </Col>
            ))}
          </Row>
        </div>

        <Table
          dataSource={filteredDataSource}
          columns={columns}
          rowKey="bookingId"
          bordered
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content", y: 350 }}
          loading={loading}
        />
      </div>

      {showViewBooking && (
        <ViewBooking
          booking={selectedBooking}
          onClose={() => {
            setShowViewBooking(false);
            fetchBookings();
          }}
          onStatusUpdated={fetchBookings}
        />
      )}
    </div>
  );
}
