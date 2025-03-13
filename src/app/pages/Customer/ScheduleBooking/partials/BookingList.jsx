import React from "react";
import { Table, Tag, Button } from "antd";
import dayjs from "dayjs";
import StatusColor from "../../../../components/StatusColor";

const BookingList = ({ bookings, onViewDetail }) => {
  const columns = [
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 150,
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={StatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 120,
      render: (text, record) => (
        <Button color="lime" variant="solid" onClick={() => onViewDetail(record)}>View Detail</Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-slate-600 rounded-md shadow-md min-h-[600px]">
      <h2 className="grid text-2xl font-bold mb-4 justify-center">Booking List</h2>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="bookingId"
        bordered
        scroll={{ x: "max-content", y: 350 }}
      />
    </div>
  );
};

export default BookingList;
