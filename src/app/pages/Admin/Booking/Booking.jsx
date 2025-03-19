import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message, Space, Modal, Tag, Row, Col } from "antd";
import { TfiReload } from "react-icons/tfi";
import UserRole from "../../../../enums/userRole";
import DecodeRole from "../../../components/DecodeRole";
import deleteBooking from "../../../modules/Booking/deleteBooking";
import getAllBook from "../../../modules/Booking/getAllBook";
import getBookingById from "../../../modules/Booking/getBookingById";
import ViewBooking from "../Booking/partials/ViewBooking";
import DecodeRoleId from "../../../components/DecodeRoleId";
import getBookByTheId from "../../../modules/Booking/getBookByTheId";
import StatusColor from "../../../components/StatusColor";

export default function Booking() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [statusCounts, setStatusCounts] = useState({});
  const userRole = DecodeRole();

  // Hàm formatDate chuyển đổi chuỗi ngày sang định dạng DD-MM-YYYY
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      let data = [];
      if (userRole === UserRole.THERAPIST) {
        const therapistId = DecodeRoleId("__TheIden");
        data = await getBookByTheId(therapistId);
        data = data.filter((book) => book.status === "In Progress");
      } else {
        data = await getAllBook();
      }
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
      
      // Calculate status counts
      const counts = formattedData.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      }, {});
      setStatusCounts({ ...counts, All: formattedData.length });
      
      // Apply current filter
      applyStatusFilter(selectedStatus, formattedData);
    } catch (error) {
      message.error("Failed to fetch bookings");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [userRole, selectedStatus]);

  useEffect(() => {
    fetchBookings();
    const intervalId = setInterval(fetchBookings, 60000);
    return () => clearInterval(intervalId);
  }, [fetchBookings]);

  const applyStatusFilter = (status, data = dataSource) => {
    if (status === "All") {
      setFilteredDataSource(data);
    } else {
      setFilteredDataSource(data.filter(booking => booking.status === status));
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
            // Also update filtered data
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

  // Tạo các filter options dựa trên dataSource
  const serviceNameFilters = Array.from(
    new Set(dataSource.map((book) => book.serviceName))
  ).map((value) => ({ text: value, value }));

  const bookingDateFilters = Array.from(
    new Set(dataSource.map((book) => formatDate(book.bookingDate)))
  ).map((value) => ({ text: value, value }));

  const statusFilters = Array.from(
    new Set(dataSource.map((book) => book.status))
  ).map((value) => ({ text: value, value }));

  const uniqueStatuses = ["All", ...Array.from(new Set(dataSource.map(item => item.status)))];

  const columns = [
    {
      title: "No.",
      key: "stt",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
      filters: serviceNameFilters,
      onFilter: (value, record) =>
        record.serviceName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 150,
      render: (date) => <span>{formatDate(date)}</span>,
      filters: bookingDateFilters,
      onFilter: (value, record) =>
        formatDate(record.bookingDate) === value,
    },
    {
      title: "Status",
      key: "status",
      width: 150,
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <Tag color={StatusColor(record.status)}>{record.status}</Tag>
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
          {/* Uncomment nếu cần cho phép xóa */}
          {/* {userRole === UserRole.ADMIN && (
            <Button type="link" danger onClick={() => handleAction(record, "Delete")}>
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
          <h1 className="text-[22px] font-bold m-0">Skincare Service Bookings</h1>
          <Button type="primary" onClick={fetchBookings}>
            <TfiReload style={{ marginRight: 8 }} />
            Reload Data
          </Button>
        </div>

        {/* Status Filter Buttons */}
        <div className="mb-5 overflow-x-auto">
          <Row gutter={[8, 8]} className="flex-nowrap" style={{ minWidth: 'max-content' }}>
            {uniqueStatuses.map(status => (
              <Col key={status}>
                <Button 
                  type={selectedStatus === status ? "primary" : "default"}
                  onClick={() => handleStatusFilter(status)}
                  style={status !== "All" ? { backgroundColor: selectedStatus === status ? StatusColor(status) : undefined } : {}}
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
          scroll={{ x: "max-content", y: 400 }}
          loading={loading}
        />
      </div>

      {showViewBooking && (
        <ViewBooking
          booking={selectedBooking}
          onClose={() => {
            setShowViewBooking(false);
            fetchBookings(); // Refresh after closing modal
          }}
          onStatusUpdated={fetchBookings}
        />
      )}
    </div>
  );
}