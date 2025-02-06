import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen flex justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Hình ảnh bên trái */}
        <div className="md:w-1/3 bg-gray-200 flex justify-center items-center p-4">
          <img
            src={therapist.profileImage}
            alt={therapist.name}
            className="object-cover w-full h-full rounded-md"
          />
        </div>

        {/* Thông tin bên phải */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold text-blue-800">{therapist.name.toUpperCase()}</h1>
          <p className="text-lg text-gray-600 font-semibold">{therapist.position}</p>
          <p className="text-md text-gray-600">{therapist.hospital}</p>

          {/* Nội dung chi tiết */}
          <div className="mt-6 space-y-3 text-gray-700">
            <p><strong>Specialization:</strong> {therapist.specialization}</p>
            <p><strong>Specialties:</strong> {therapist.specialties.join(", ")}</p>
            <p><strong>Experience:</strong> {therapist.yearsExperience} years</p>
            <p><strong>Languages:</strong> {therapist.languages.join(", ")}</p>
            <p><strong>Education:</strong> {therapist.education}</p>
            <p><strong>Certifications:</strong> {therapist.certifications.join(", ")}</p>
            <p><strong>Accepting New Clients:</strong> {therapist.acceptsNewClients ? "Yes" : "No"}</p>
            <p><strong>Rating:</strong> <span className="text-yellow-500 font-medium">{therapist.rating}</span></p>
          </div>

          {/* Thông tin liên hệ */}
          <div className="mt-6 text-gray-700">
            <p><strong>Email:</strong> {therapist.email}</p>
            <p><strong>Phone:</strong> {therapist.phone}</p>
          </div>

          {/* Tiểu sử và câu nói */}
          <p className="text-gray-700 mt-4">{therapist.bio}</p>
          <p className="text-gray-700 italic mt-4">"{therapist.personalStatement}"</p>

          {/* Thời gian cập nhật */}
          <p className="text-sm text-gray-500 mt-2">Profile Created: {new Date(therapist.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Last Updated: {new Date(therapist.updatedAt).toLocaleDateString()}</p>

          {/* Nút quay lại */}
          <Link to="/therapists" className="mt-6 inline-block text-blue-600 font-semibold hover:text-blue-800">
            ← Back
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TherapistProfile;
