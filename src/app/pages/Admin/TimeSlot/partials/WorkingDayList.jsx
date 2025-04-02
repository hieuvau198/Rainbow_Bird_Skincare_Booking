import React from "react";
import { Table, Button} from "antd";
import SearchBar from "../../../../components/SearchBar";

export default function WorkingDayList({
  searchText,
  handleSearchChange,
  filteredWorkingDays,
  loading,
  onViewSlot,
  renderExtra,
}) {
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "workingDayId",
    //   key: "workingDayId",
    //   width: 50,
    // },
    {
      title: "Day Name",
      dataIndex: "dayName",
      key: "dayName",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Slot Duration (Minutes)",
      dataIndex: "slotDurationMinutes",
      key: "slotDurationMinutes",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 250,
      render: (_, record) => (
        <Button color="primary" variant="solid" type="link" onClick={() => onViewSlot(record)}>
          View Slot
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Working Days</h2>
        <div className="flex items-center">
          <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
        </div>
      </div>

      {renderExtra && <div className="flex justify-end mb-4">{renderExtra}</div>}

      <Table
        columns={columns}
        dataSource={filteredWorkingDays}
        loading={loading}
        pagination={false}
        bordered
        scroll={{ x: "max-content", y: 400 }}
      />
    </>
  );
}
