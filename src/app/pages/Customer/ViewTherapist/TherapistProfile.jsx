import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "antd";
import mockTherapists from "./mock_therapist_profile.json";

const TherapistProfile = () => {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const foundTherapist = mockTherapists.find((t) => t.id.toString() === id);
    setTherapist(foundTherapist);
  }, [id]);

  if (!therapist) {
    return <div className="p-6 text-center text-red-500">Therapist not found</div>;
  }

  return (
    <div className="p-6 lg:p-24 md:p-16 bg-white min-h-screen flex justify-center">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl bg-white">
        
        {/* Hình ảnh bên trái với kích thước cố định */}
        <div className="md:w-4/5 flex justify-center items-center p-4">
          <img
            src={therapist.profileImage}
            alt={therapist.name}
            className="object-cover w-300 h-500"
          />
        </div>

        {/* Phần chữ mở rộng hơn */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold text-blue-800">
            {therapist.name.toUpperCase()}
          </h1>
          <p className="text-lg text-gray-600 font-semibold">
            {therapist.position}
          </p>
          <p className="text-md text-gray-600">{therapist.hospital}</p>

          {/* Nội dung chi tiết */}
          <div className="mt-6 space-y-3 text-gray-700">
            <p>
              <strong>Specialization:</strong> {therapist.specialization}
            </p>
            <p>
              <strong>Specialties:</strong> {therapist.specialties.join(", ")}
            </p>
            <p>
              <strong>Experience:</strong> {therapist.yearsExperience} years
            </p>
            <p>
              <strong>Languages:</strong> {therapist.languages.join(", ")}
            </p>
            <p>
              <strong>Education:</strong> {therapist.education}
            </p>
            <p>
              <strong>Certifications:</strong> {therapist.certifications.join(", ")}
            </p>
            <p>
              <strong>Accepting New Clients:</strong>{" "}
              {therapist.acceptsNewClients ? "Yes" : "No"}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              <span className="text-yellow-500 font-medium">
                {therapist.rating}
              </span>
            </p>
          </div>

          {/* Thông tin liên hệ */}
          <div className="mt-6 text-gray-700">
            <p>
              <strong>Email:</strong> {therapist.email}
            </p>
            <p>
              <strong>Phone:</strong> {therapist.phone}
            </p>
          </div>

          {/* Tiểu sử và câu nói */}
          <p className="text-gray-700 mt-4">{therapist.bio}</p>
          <p className="text-gray-700 italic mt-4">
            "{therapist.personalStatement}"
          </p>

          {/* Thời gian cập nhật */}
          <p className="text-sm text-gray-500 mt-2">
            Profile Created:{" "}
            {new Date(therapist.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Last Updated:{" "}
            {new Date(therapist.updatedAt).toLocaleDateString()}
          </p>

          {/* Nút quay lại */}
          <Link to="/therapists">
            <Button type="primary" style={{ marginTop: "24px" }}>
              ← Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
