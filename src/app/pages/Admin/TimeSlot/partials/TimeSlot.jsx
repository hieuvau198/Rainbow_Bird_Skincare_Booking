import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import getTimeSlot from "../../../../../app/modules/Admin/TimeSlot/getTimeSlot";
import getTheBySlotId from "../../../../../app/modules/Admin/TimeSlot/getTheBySlotId";
import UserRole from "../../../../../enums/userRole";
import DecodeRole from "../../../../components/DecodeRole";
import "../../../../styles/Admin/ScrollbarTable.css";
import ViewTherapist from "./partials/ViewTherapist";

export default function TimeSlotList({ timeSlotIds = [] }) {
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [therapists, setTherapists] = useState([]);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const userRole = DecodeRole();

  useEffect(() => {
    const fetchTimeSlots = async () => {
      setLoading(true);
      try {
        const data = await getTimeSlot();
        const timeSlotsWithKey = data.map((timeSlot) => ({
          key: timeSlot.slotId,
          ...timeSlot,
        }));
        const filteredByWorkingDay =
          timeSlotIds.length > 0
            ? timeSlotsWithKey.filter((ts) => timeSlotIds.includes(ts.slotId))
            : timeSlotsWithKey;
        setTimeSlots(filteredByWorkingDay);
        setFilteredTimeSlots(filteredByWorkingDay);
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
      setLoading(false);
    };
    fetchTimeSlots();
  }, [timeSlotIds]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = timeSlots.filter((timeSlot) =>
      timeSlot.startTime.toLowerCase().includes(value)
    );
    setFilteredTimeSlots(filtered);
  };

  const handleViewTherapists = async (record) => {
    try {
      // Lưu slotId được chọn vào state
      setSelectedSlotId(record.slotId);
      const data = await getTheBySlotId(record.slotId);
      setTherapists(data);
      setIsTherapistModalOpen(true);
    } catch (error) {
      console.error("Error fetching therapists:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "slotId",
      key: "slotId",
      width: 50,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      width: 150,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      width: 150,
    },
    {
      title: "Slot Number",
      dataIndex: "slotNumber",
      key: "slotNumber",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      width: 150,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Available" : "Unavailable"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <Button color="primary" variant="solid" type="link" onClick={() => handleViewTherapists(record)}>
            View Therapists
          </Button>
          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Button color="danger" variant="solid" type="link" danger onClick={() => { /* showDeleteConfirm(record) */ }}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-[1260px]">
      <div className="flex justify-end items-center mb-6">
        {/* Các nút khác nếu cần */}
      </div>

      <Table
        columns={columns}
        dataSource={filteredTimeSlots}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content", y: 370 }}
      />

      <ViewTherapist
        open={isTherapistModalOpen}
        onClose={() => setIsTherapistModalOpen(false)}
        therapists={therapists}
        slotId={selectedSlotId}
      />
    </div>
  );
}
