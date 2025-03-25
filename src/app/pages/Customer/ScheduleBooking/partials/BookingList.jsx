import React from "react";
import { Table, Tag, Button } from "antd";
import dayjs from "dayjs";
import StatusColor from "../../../../components/StatusColor";
import FormatDate from "../../../../components/FormatDate";

const BookingList = ({ bookings, onViewDetail }) => {
  const columns = [
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 120,
      render: (date) => <FormatDate date={date} />,
      sorter: (a, b) => dayjs(a.bookingDate).unix() - dayjs(b.bookingDate).unix(),
      defaultSortOrder: "ascend",
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
      width: 120,
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
        <Button color="lime" variant="solid" onClick={() => onViewDetail(record)}>View</Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-md shadow-md min-h-[630px]">
      <h2 className="grid text-2xl font-bold mb-4 justify-center">Booking History</h2>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="bookingId"
        bordered
        pagination={{ pageSize: 6 }}
        scroll={{ y: 350 }}
      />
    </div>
  );
};

export default BookingList;
