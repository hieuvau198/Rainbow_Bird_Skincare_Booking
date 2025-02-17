import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import mockTherapists from "./mock_therapist_profile.json";

const TherapistProfile = () => {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const foundTherapist = mockTherapists.find((t) => t.id.toString() === id);
    setTherapist(foundTherapist);
  }, [id]);

  if (!therapist) {
    return (
      <div className="p-6 text-center text-red-500">Therapist not found</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 lg:p-24 md:p-16 min-h-screen">
      {/* Nút Back và tiêu đề ABOUT US trong cùng một dòng */}

      {/* Main Content: Card chứa hình ảnh bên trái và phần chữ bên phải */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mx-auto bg-white p-6">
        {/* Hình ảnh Therapist */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={therapist.profileImage}
            alt={therapist.name}
            className="object-cover w-full h-auto"
          />
        </div>

        {/* Thông tin bên phải */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            {/* Tên và Specialization */}
            <h1 className="text-4xl font-bold text-lime-600">
              {therapist.name.toUpperCase()} -{" "}
              <span className="text-xl font-semibold text-gray-600">
                {therapist.specialization}
              </span>
            </h1>

            {/* Các thông tin chi tiết */}
            <p className="text-lg mt-4 text-gray-700">
              <strong>Specialties:</strong> {therapist.specialties.join(", ")}
            </p>
            <p className="text-lg mt-4 text-gray-700">
              <strong>Experience:</strong> {therapist.yearsExperience} years
            </p>
            <p className="text-lg mt-4 text-gray-700">
              <strong>Languages:</strong> {therapist.languages.join(", ")}
            </p>
            <p className="text-lg mt-4 text-gray-700">
              <strong>Education:</strong> {therapist.education}
            </p>
            <p className="text-lg mt-4 text-gray-700">
              <strong>Certifications:</strong>{" "}
              {therapist.certifications.join(", ")}
            </p>
            <p className="text-gray-700 mt-4">{therapist.bio}</p>
            <p className="text-gray-700 italic mt-4">
              "{therapist.personalStatement}"
            </p>

            {/* Rating */}
            <div className="flex flex-col items-start mt-4">
              <div className="flex items-center">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                <FaStarHalfAlt className="text-yellow-500" />
                <span className="ml-2 text-lg text-gray-600">20 reviews</span>
              </div>
            </div>
          </div>

          {/* Email và Phone ở dòng cuối, căn giữa */}
          <div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex items-center mr-4">
                <MailOutlined className="mr-1" />
                <span>{therapist.email}</span>
              </div>
              <div className="flex items-center">
                <PhoneOutlined className="mr-1" />
                <span>{therapist.phone}</span>
              </div>
            </div>

            {/* Nút Contact màu xanh lá ở dưới cùng */}
            <div className="flex justify-center items-center mt-4">
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 font-semibold">
                Contact to
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
