import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, message, Tag, Row, Col } from "antd";
import { TfiReload } from "react-icons/tfi";
import getBookByTheId from "../../../../modules/Booking/getBookByTheId";
import getBookingById from "../../../../modules/Booking/getBookingById";
import ViewBooking from "../staff/ViewBooking";
import DecodeRoleId from "../../../../components/DecodeRoleId";
import StatusColor from "../../../../components/StatusColor";
import FormatDate from "../../../../components/FormatDate";

export default function TherapistBooking() {
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showViewBooking, setShowViewBooking] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [statusCounts, setStatusCounts] = useState({});

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const therapistId = DecodeRoleId("__TheIden");
      console.log("Therapist ID:", therapistId);
      const data = await getBookByTheId(therapistId);
      console.log("Fetched bookings:", data);
      const allowedStatuses = [
        "Checked In",
        "In Progress",
        "Incomplete",
        "Completed",
        "Checked Out",
      ];
      const filtered = data.filter((b) => allowedStatuses.includes(b.status));
      const formatted = filtered.map((b) => ({
        key: b.bookingId,
        ...b,
      }));

      setAllBookings(formatted);

      const counts = formatted.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});
      setStatusCounts({ All: formatted.length, ...counts });

      applyFilter(selectedStatus, formatted);
    } catch (error) {
      message.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 60000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  const applyFilter = (status, data = allBookings) => {
    if (status === "All") {
      setFilteredBookings(data);
    } else {
      setFilteredBookings(data.filter((b) => b.status === status));
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    applyFilter(status);
  };

  const handleView = async (bookingId) => {
    try {
      const detail = await getBookingById(bookingId);
      setSelectedBooking(detail);
      setShowViewBooking(true);
    } catch (error) {
      message.error("Failed to load booking detail");
    }
  };

  const allStatuses = [
    "Checked In",
    "In Progress",
    "Incomplete",
    "Completed",
    "Checked Out",
  ];
  const uniqueStatuses = ["All", ...allStatuses];

  const columns = [
    {
      title: "No.",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      render: (date) => <FormatDate date={date} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={StatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          type="link"
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => handleView(record.bookingId)}
        >
          View details
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[22px] font-bold m-0">My Bookings</h1>
          <Button type="primary" onClick={fetchBookings}>
            <TfiReload style={{ marginRight: 4 }} />
            Reload
          </Button>
        </div>

        {/* Filter by Status */}
        <div className="mb-5">
          <Row gutter={[8, 8]} wrap>
            {uniqueStatuses.map((status) => (
              <Col key={status}>
                <Button
                  type={selectedStatus === status ? "primary" : "default"}
                  onClick={() => handleStatusChange(status)}
                  style={
                    status !== "All"
                      ? {
                          backgroundColor:
                            selectedStatus === status
                              ? StatusColor(status)
                              : undefined,
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
          dataSource={filteredBookings}
          columns={columns}
          rowKey="bookingId"
          bordered
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content", y: 350 }}
          loading={loading}
          locale={{
            emptyText: (
              <div className="text-center py-10 text-gray-500">
                🛋️ No bookings found for <strong>{selectedStatus}</strong>.
              </div>
            ),
          }}
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
