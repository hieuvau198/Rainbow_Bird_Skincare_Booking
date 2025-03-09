import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import getTherapist from "../../../../../modules/Admin/Employee/getTherapist";
import addTherapistToSlot from "../../../../../modules/Admin/TimeSlot/addTheToSlot";
import deleteTheSlot from "../../../../../modules/Admin/TimeSlot/deleteTheSlot";
import getTheBySlotId from "../../../../../modules/Admin/TimeSlot/getTheBySlotId";

export default function ViewTherapist({ open, onClose, therapists, slotId }) {
  const [mode, setMode] = useState("view");
  const [allTherapists, setAllTherapists] = useState([]);
  const [availableTherapists, setAvailableTherapists] = useState([]);
  const [selectedTherapistId, setSelectedTherapistId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewTherapists, setViewTherapists] = useState(therapists);

  useEffect(() => {
    if (mode === "add" && allTherapists.length === 0) {
      const fetchTherapists = async () => {
        try {
          const data = await getTherapist();
          setAllTherapists(data);
        } catch (error) {
          console.error("Error fetching all therapists:", error);
        }
      };
      fetchTherapists();
    }
  }, [mode, allTherapists.length]);

  useEffect(() => {
    if (mode === "add") {
      const existingIds = viewTherapists.map((t) => t.therapistId);
      const available = allTherapists.filter(
        (profile) => !existingIds.includes(profile.therapistId)
      );
      setAvailableTherapists(available);
    }
  }, [mode, viewTherapists, allTherapists]);

  useEffect(() => {
    setViewTherapists(therapists);
  }, [therapists]);

  const fetchSlotTherapists = async () => {
    try {
      const data = await getTheBySlotId(slotId);
      setViewTherapists(data);
    } catch (error) {
      console.error("Error fetching therapists for slot:", error);
    }
  };

  const handleAddSubmit = async () => {
    if (!selectedTherapistId) {
      message.error("Please select a therapist");
      return;
    }
    setLoading(true);
    const payload = {
      therapistId: selectedTherapistId,
      slotId: slotId,
      workingDate: "2025-01-01",
      status: "Available",
      createdAt: new Date().toISOString(),
    };
    try {
      await addTherapistToSlot(payload);
      message.success("Therapist added successfully");
      await fetchSlotTherapists();
      setMode("view");
    } catch (error) {
      console.error("Error adding therapist:", error);
      message.error("Failed to add therapist");
    }
    setLoading(false);
  };

  const handleDeleteTherapist = async (availabilityId) => {
    try {
      // Gọi API xóa therapist khỏi slot
      await deleteTheSlot(availabilityId);
      message.success("Therapist removed successfully");
      setViewTherapists((prev) =>
        prev.filter((t) => t.availabilityId !== availabilityId)
      );
    } catch (error) {
      console.error("Error deleting therapist from slot:", error);
      message.error("Failed to remove therapist");
    }
  };

  return (
    <Modal
      title={mode === "view" ? "Therapists" : "Add Therapist"}
      open={open}
      onCancel={() => {
        onClose();
        setMode("view");
      }}
      footer={
        mode === "view"
          ? [
            <Button key="add" onClick={() => setMode("add")}>
              Add
            </Button>,
            <Button key="close" onClick={onClose}>
              Close
            </Button>,
          ]
          : [
            <Button key="back" onClick={() => setMode("view")}>
              Back
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleAddSubmit}
            >
              Submit
            </Button>,
          ]
      }
    >
      {mode === "view" ? (
        <div className="grid grid-cols-3 gap-4">
          {viewTherapists && viewTherapists.length > 0 ? (
            viewTherapists.map((therapist) => (
              <div
                key={therapist.availabilityId}
                className="relative group p-4 border rounded shadow flex items-center justify-center"
              >
                <div className="z-10 cursor-pointer">{therapist.therapistName}</div>
                <div onClick={() => handleDeleteTherapist(therapist.availabilityId)} className="absolute inset-0 cursor-pointer bg-slate-400 opacity-0 group-hover:opacity-100 rounded transition-opacity flex items-center justify-center">
                  <FaTrash className="z-20"size={20} color="white" />
                </div>
              </div>
            ))
          ) : (
            <p>No therapists found.</p>
          )}
        </div>
      ) : (
        <Form layout="vertical">
          <Form.Item label="Select Therapist">
            <Select
              placeholder="Select a therapist"
              onChange={(value) => setSelectedTherapistId(value)}
            >
              {availableTherapists.map((profile) => {
                const id = profile.therapistId;
                const name = profile.user.fullName || "Unknown";
                return (
                  <Select.Option key={id} value={id}>
                    {`ID: ${id} - Name: ${name}`}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
