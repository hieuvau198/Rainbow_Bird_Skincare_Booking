import React, { useState, useEffect } from "react";
import { Button, message, Modal, Select } from "antd";
import "../../../styles/Admin/ScrollbarTable.css";
import getTherapist from "../../../modules/Admin/Employee/getTherapist";
import getTheBySlotId from "../../../modules/Admin/TimeSlot/getTheBySlotId";
import getWorkingDay from "../../../modules/Admin/TimeSlot/getWorkingDay";
import addTherapistToSlot from "../../../modules/Admin/TimeSlot/addTheToSlot";
import getTimeSlot from "../../../modules/Admin/TimeSlot/getTimeSlot";
import WorkingDayList from "./partials/WorkingDayList";
import TimeSlot from "./partials/TimeSlot";

export default function WorkingDay() {
  const [loading, setLoading] = useState(false);
  const [workingDays, setWorkingDays] = useState([]);
  const [filteredWorkingDays, setFilteredWorkingDays] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedWorkingDay, setSelectedWorkingDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]); // Lưu các ngày làm việc được chọn
  const [allWeekSelected, setAllWeekSelected] = useState(false); // Kiểm tra có chọn cả tuần hay không  

  useEffect(() => {
    const fetchWorkingDays = async () => {
      setLoading(true);
      try {
        const data = await getWorkingDay();
        const workingDaysWithKey = data.map((wd) => ({
          key: wd.workingDayId,
          ...wd,
        }));
        setWorkingDays(workingDaysWithKey);
        setFilteredWorkingDays(workingDaysWithKey);
      } catch (error) {
        console.error("Error fetching working days:", error);
      }
      setLoading(false);
    };

    fetchWorkingDays();
  }, []);

  const fetchTherapists = async () => {
    try {
      const data = await getTherapist(); // API lấy danh sách therapists
      setTherapists(data);
    } catch (error) {
      console.error("Error fetching therapists:", error);
    }
  };
  
  // Gọi API khi mở modal
  const openModal = () => {
    fetchTherapists();
    setIsModalOpen(true);
  };
  

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = workingDays.filter((wd) =>
      wd.dayName.toLowerCase().includes(value)
    );
    setFilteredWorkingDays(filtered);
  };

  const handleViewSlot = (record) => {
    setSelectedWorkingDay(record);
  };

  const handleSelectDays = (values) => {
    if (values.includes("all")) {
      // Nếu chọn "All Week", chọn tất cả các ngày làm việc
      setSelectedDays(workingDays.map((day) => day.workingDayId));
      setAllWeekSelected(true);
    } else {
      setSelectedDays(values);
      setAllWeekSelected(false);
    }
  };
  
  const handleConfirmAddTherapist = async () => {
    if (!selectedTherapistId) {
      message.error("Please select a therapist!");
      return;
    }
    if (selectedDays.length === 0) {
      message.error("Please select at least one working day!");
      return;
    }
  
    try {
      setLoading(true);
  
      // Lấy danh sách Time Slots
      const timeSlots = await getTimeSlot();
      if (!timeSlots || timeSlots.length === 0) {
        message.error("No time slots available!");
        setLoading(false);
        return;
      }
  
      // Nếu chọn "All Week", lấy tất cả ngày làm việc
      const filteredWorkingDays = allWeekSelected ? workingDays : workingDays.filter((day) => selectedDays.includes(day.workingDayId));
  
      for (const day of filteredWorkingDays) {
        const slotsForDay = timeSlots.filter((slot) => slot.workingDayId === day.workingDayId);
  
        for (const slot of slotsForDay) {
          const existingTherapists = await getTheBySlotId(slot.slotId);
  
          const isAlreadyAssigned = existingTherapists.some(
            (t) => t.therapistId === selectedTherapistId
          );
  
          if (isAlreadyAssigned) {
            console.log(`Therapist ${selectedTherapistId} already exists in Slot ${slot.slotId}, skipping...`);
            continue;
          }
  
          const payload = {
            therapistId: selectedTherapistId,
            slotId: slot.slotId,
            workingDate: day.date || new Date().toISOString().split("T")[0],
            status: "Available",
            createdAt: new Date().toISOString(),
          };
  
          await addTherapistToSlot(payload);
        }
      }
  
      message.success("Therapist assigned to selected working days and time slots successfully!");
    } catch (error) {
      console.error("Error adding therapist:", error);
      message.error("Failed to assign therapist.");
    }
  
    setLoading(false);
    setIsModalOpen(false);
  };
  
  
  return (
    <div className="p-6 max-w-[1270px]">
      {selectedWorkingDay ? (
        <div className="p-6 bg-white rounded-md shadow-md min-h-[620px]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">
              Time Slots for {selectedWorkingDay.dayName}
            </h3>
            <Button color="primary" variant="solid" type="link" onClick={() => setSelectedWorkingDay(null)}>
              Back
            </Button>
          </div>
          <TimeSlot timeSlotIds={selectedWorkingDay.timeSlotIds || []} />
        </div>
      ) : (
        
        <div className="p-6 bg-white rounded-md shadow-md min-h-[620px]">
        {/* <div className="flex justify-end items-center mb-4">
        <Button type="primary" onClick={openModal}>
          Add Therapist for Full Week
        </Button>
        </div> */}
        <Modal
          title="Select Therapist"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleConfirmAddTherapist}
              disabled={!selectedTherapistId}
            >
              Add
            </Button>,
          ]}
        >
          <Select
            placeholder="Select a therapist"
            onChange={(value) => setSelectedTherapistId(value)}
            style={{ width: "100%" }}
          >
            {therapists.map((therapist) => (
              <Select.Option key={therapist.therapistId} value={therapist.therapistId}>
                {therapist.user.fullName}
              </Select.Option>
            ))}
          </Select>
          <Select
            mode="multiple"
            placeholder="Select working days"
            value={selectedDays}
            onChange={handleSelectDays}
            style={{ width: "100%", marginBottom: "16px" }}
          >
            {/* Option "All Week" */}
            <Select.Option key="all" value="all">
              All Week
            </Select.Option>

            {/* Danh sách các ngày làm việc */}
            {workingDays.map((day) => (
              <Select.Option key={day.workingDayId} value={day.workingDayId}>
                {day.dayName}
              </Select.Option>
            ))}
          </Select>
        </Modal>

        <WorkingDayList
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          filteredWorkingDays={filteredWorkingDays}
          loading={loading}
          onViewSlot={handleViewSlot}
          renderExtra={(
            <Button type="primary" onClick={openModal}>
              Add Therapist for Full Week
            </Button>
          )}
        />
      </div>
      
      )}
    </div>
    
  );
}
