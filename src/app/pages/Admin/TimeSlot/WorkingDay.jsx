import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "../../../styles/Admin/ScrollbarTable.css";
import getWorkingDay from "../../../modules/Admin/TimeSlot/getWorkingDay";
import WorkingDayList from "./partials/WorkingDayList";
import TimeSlot from "./partials/TimeSlot";

export default function WorkingDay() {
  const [loading, setLoading] = useState(false);
  const [workingDays, setWorkingDays] = useState([]);
  const [filteredWorkingDays, setFilteredWorkingDays] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedWorkingDay, setSelectedWorkingDay] = useState(null);

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
          <WorkingDayList
            searchText={searchText}
            handleSearchChange={handleSearchChange}
            filteredWorkingDays={filteredWorkingDays}
            loading={loading}
            onViewSlot={handleViewSlot}
          />
        </div>
      )}
    </div>
  );
}
