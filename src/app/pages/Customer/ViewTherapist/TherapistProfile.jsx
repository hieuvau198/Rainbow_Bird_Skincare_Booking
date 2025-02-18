import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import mockTherapists from "./mock_therapist_profile.json";

const TherapistProfile = () => {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const foundTherapist = mockTherapists.find(
      (t) => t.id.toString() === id
    );
    setTherapist(foundTherapist);
  }, [id]);

  if (!therapist) {
    return (
      <div className="p-6 text-center text-red-500">
        Therapist not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        
      </header>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Card 1: Hình ảnh */}
        <div className="md:w-1/4 bg-teal-400 rounded-lg shadow overflow-hidden">
          <img
            src={therapist.profileImage}
            alt={therapist.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="md:w-1/4 bg-white rounded-lg shadow p-6">
          
        </div> */}
        {/* Card 2: Nội dung */}
        <div className="md:w-3/4 bg-white rounded-lg shadow flex flex-col">
          {/* Phần tiêu đề: Tên, chuyên môn và rating */}
          <div className="p-6">
            <h1 className="text-4xl font-bold text-lime-600">
              {therapist.name.toUpperCase()} -{" "}
              <span className="text-xl font-semibold text-gray-600">
                {therapist.specialization}
              </span>
            </h1>
            <div className="flex items-center mt-4">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              <FaStarHalfAlt className="text-yellow-500" />
              <span className="ml-2 text-lg text-gray-600">20 reviews</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="border-t border-b">
            <ul className="flex">
              {[
                { key: "about", label: "Introduce" },
                { key: "reviews", label: "Rating" },
                { key: "schedule", label: "Schedules" },
                { key: "credentials", label: "Certificates" },
              ].map((tab) => (
                <li
                  key={tab.key}
                  className={`cursor-pointer px-6 py-3 ${
                    activeTab === tab.key
                      ? "border-b-2 border-green-500 text-green-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          </nav>

          {/* Nội dung Tab */}
          <div className="p-6 flex-grow">
            {activeTab === "about" && (
              <div>
                <p className="text-gray-700">{therapist.bio}</p>
                <p className="text-gray-700 italic mt-4">
                  "{therapist.personalStatement}"
                </p>
                <p className="text-lg mt-4 text-gray-700">
                  <strong>Specialties:</strong>{" "}
                  {therapist.specialties.join(", ")}
                </p>
                <p className="text-lg mt-4 text-gray-700">
                  <strong>Experience:</strong> {therapist.yearsExperience} years
                </p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <p>Reviews section...</p>
              </div>
            )}
            {activeTab === "schedule" && (
              <div>
                <p>Schedule section...</p>
              </div>
            )}
            {activeTab === "credentials" && (
              <div>
                <p>
                  <strong>Education:</strong> {therapist.education}
                </p>
                <p className="mt-4">
                  <strong>Certifications:</strong>{" "}
                  {therapist.certifications.join(", ")}
                </p>
              </div>
            )}
          </div>

          {/* Phần liên hệ */}
          <div className="p-6 border-t flex flex-col items-center">
            <div className="flex justify-center items-center mb-4">
              <div className="flex items-center mr-4">
                <MailOutlined className="mr-1" />
                <span>{therapist.email}</span>
              </div>
              <div className="flex items-center">
                <PhoneOutlined className="mr-1" />
                <span>{therapist.phone}</span>
              </div>
            </div>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 font-semibold">
              Contact
            </button>
          </div>
        </div>
        
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mt-5">
      <div className="md:w-2/4 bg-white rounded-lg shadow p-6">
          
          </div>
          <div className="md:w-2/4 bg-white rounded-lg shadow p-6">
            
          </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
