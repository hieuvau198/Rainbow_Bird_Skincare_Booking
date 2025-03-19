import React, { useEffect, useState, useCallback } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import getTimeSlot from "../../../../../app/modules/Admin/TimeSlot/getTimeSlot";
import getTheBySlotId from "../../../../../app/modules/Admin/TimeSlot/getTheBySlotId";
import { DeleteOutlined } from "@ant-design/icons";
import UserRole from "../../../../../enums/userRole";
import DecodeRole from "../../../../components/DecodeRole";
import "../../../../styles/Admin/ScrollbarTable.css";
import ViewTherapist from "./partials/ViewTherapist";
import deleteTheSlot from "../../../../../app/modules/Admin/TimeSlot/deleteTheSlot"; // Import API xóa

export default function TimeSlotList({ timeSlotIds = [] }) {
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [therapists, setTherapists] = useState([]);
  const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const userRole = DecodeRole();

  // Load danh sách timeSlots
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

  // Hàm load dữ liệu therapist cho tất cả các slot
  const loadTherapistData = useCallback(async () => {
    try {
      const allTherapists = await Promise.all(
        timeSlots.map(async (slot) => {
          const therapists = await getTheBySlotId(slot.slotId);
          return therapists.map((t) => ({
            ...t,
            slotId: slot.slotId,
            workingDay: slot.workingDay || "No Assigned Day",
          }));
        })
      );
      setTherapists(allTherapists.flat());
    } catch (error) {
      console.error("Error fetching therapist data:", error);
    }
  }, [timeSlots]);

  // Gọi loadTherapistData khi timeSlots thay đổi
  useEffect(() => {
    if (timeSlots.length > 0) {
      loadTherapistData();
    }
  }, [timeSlots, loadTherapistData]);

  // Hàm xử lý xóa therapist khỏi slot và load lại dữ liệu mới
  const handleDeleteSlot = async (therapistId, slotId) => {
    try {
      await deleteTheSlot(therapistId); // Gọi API xóa, truyền therapistId
      message.success("Therapist removed from slot successfully.");
      // Load lại dữ liệu therapist sau khi xóa
      loadTherapistData();
    } catch (error) {
      console.error("Error deleting therapist from slot:", error);
      message.error("Failed to remove therapist.");
    }
  };

  const columns = [
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      width: 100,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      width: 100,
    },
    {
      title: "Slot Number",
      dataIndex: "slotNumber",
      key: "slotNumber",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Available" : "Unavailable"}
        </Tag>
      ),
    },
    {
      title: "Therapists Working Days",
      dataIndex: "slotId",
      key: "therapists",
      render: (slotId) => {
        const therapistsForSlot = therapists.filter((t) => t.slotId === slotId);
        return therapistsForSlot.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {therapistsForSlot.map((therapist) => (
              <div
                key={therapist.therapistId}
                className="group relative flex items-center gap-3 bg-sky-400/95 hover:bg-sky-300/95 p-1 rounded-lg shadow-md border border-sky-500 transition-colors duration-300"
              >
                <img
                  src={
                    therapist.profileImage ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      therapist.therapistName
                    )}`
                  }
                  alt="Therapist"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 font-semibold">
                  {therapist.therapistName}
                </span>
                <DeleteOutlined
                  className="absolute right-2 opacity-0 group-hover:opacity-100 text-red-500 text-xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSlot(therapist.availabilityId);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center bg-gray-200 p-1 rounded-lg shadow-md border border-grey-800 w-56 h-10">
            No Assigned Therapists
          </div>
        );
      },
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

      {/* <ViewTherapist
        open={isTherapistModalOpen}
        onClose={() => setIsTherapistModalOpen(false)}
        therapists={therapists}
        slotId={selectedSlotId}
      /> */}
    </div>
  );
}
