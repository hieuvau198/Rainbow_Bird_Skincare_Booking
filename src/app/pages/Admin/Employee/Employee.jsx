import { Button } from "antd";
import React, { useState } from "react";
import ManagerTable from "./partials/ManagerTable";
import StaffTable from "./partials/StaffTable";
import TherapistTable from "./partials/TherapistTable";

export default function Employee() {
  const [activeCategory, setActiveCategory] = useState("therapists");

  const renderTableComponent = () => {
    switch (activeCategory) {
      case "therapists":
        return <TherapistTable />;
      case "staffs":
        return <StaffTable />;
      case "managers":
        return <ManagerTable />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Empolyee</h2>
          <div className="flex space-x-4">
            <Button
              type={activeCategory === "therapists" ? "primary" : "default"}
              onClick={() => setActiveCategory("therapists")}
            >
              Therapists
            </Button>
            <Button
              type={activeCategory === "staffs" ? "primary" : "default"}
              onClick={() => setActiveCategory("staffs")}
            >
              Staffs
            </Button>
            <Button
              type={activeCategory === "managers" ? "primary" : "default"}
              onClick={() => setActiveCategory("managers")}
            >
              Managers
            </Button>
          </div>
        </div>

        {renderTableComponent()}
      </div>
    </div>
  );
}
