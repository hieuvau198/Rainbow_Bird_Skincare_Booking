import React, { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
import Loading from "../../../../../components/Loading";
import getTherapistProfile from "../../../../../modules/Admin/Employee/getTherapistProfile";
import AddTherapistProfile from "../../../../../pages/Admin/Employee/partials/TherapistPartials/AddTherapistProfile";
import updateTherapistProfile from "../../../../../modules/Admin/Employee/updateTherapistProfile";

export default function ViewTherapistProfile({ open, therapistId, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const fetchProfile = async (id) => {
    setLoading(true);
    try {
      const data = await getTherapistProfile(id);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching therapist profile:", error);
      setProfile(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && therapistId) {
      fetchProfile(therapistId);
    }
  }, [open, therapistId]);

  const handleProfileSubmit = async (values) => {
    try {
      if (!profile || !profile.profileId) {
        message.error("Profile does not exist. Cannot update.");
        return;
      }

      const updatedProfile = await updateTherapistProfile(profile.therapistId, values);
      message.success("Therapist profile updated successfully!");
      setProfile(updatedProfile);
      setShowProfileModal(false);
    } catch (error) {
      message.error(error.message || "Operation failed. Please try again.");
    }
  };

  return (
    <>
      <Modal
        open={open}
        width={1000}
        onCancel={onClose}
        footer={[
          <Button
            key="update"
            type="primary"
            onClick={() => setShowProfileModal(true)}
            disabled={!profile} // Disable nút update nếu không có profile
          >
            Update Therapist Profile
          </Button>,
          <Button key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
        title={<div className="text-center text-2xl font-bold">Therapist Details</div>}
      >
        {loading ? (
          <Loading />
        ) : profile ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-center items-center">
              <img
                src={
                  profile.profileImage ||
                  `https://ui-avatars.com/api/?name=${profile?.therapist?.user?.fullName || 'Therapist'}`
                }
                alt="Therapist Profile"
                className="w-60 h-60 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center space-y-3">
              <div className="flex items-center">
                <span className="font-bold w-32">Therapist ID:</span>
                <span className="ml-4">{profile.therapistId}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-32">Bio:</span>
                <span className="ml-4">{profile.bio}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-32">Personal Statement:</span>
                <span className="ml-4">{profile.personalStatement}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-32">Education:</span>
                <span className="ml-4">{profile.education}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-32">Certifications:</span>
                <span className="ml-4">{profile.certifications}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-32">Specialties:</span>
                <span className="ml-4">{profile.specialties}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-32">Languages:</span>
                <span className="ml-4">{profile.languages}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-32">Years Experience:</span>
                <span className="ml-4">{profile.yearsExperience}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data available.</p>
        )}
      </Modal>

      {showProfileModal && profile && (
        <AddTherapistProfile
          open={showProfileModal}
          initialData={profile}
          onClose={() => setShowProfileModal(false)}
          onSubmit={handleProfileSubmit}
        />
      )}
    </>
  );
}
