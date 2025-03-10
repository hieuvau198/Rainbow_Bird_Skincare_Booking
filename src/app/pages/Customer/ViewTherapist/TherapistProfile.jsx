import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const TherapistProfile = () => {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/TherapistProfile/${id}/with-reference`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch therapist profile");
        }
        return response.json();
      })
      .then((data) => {
        setTherapist(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  if (!therapist) {
    return (
      <div className="p-6 text-center text-red-500">
        Therapist profile not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        {/* Header content if needed */}
      </header>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Card 1: Profile Image */}
        <div className="md:w-1/4 bg-teal-200 rounded-lg shadow overflow-hidden self-start h-96">
          <img
            src={therapist.profileImage || "https://via.placeholder.com/150"}
            alt="Therapist"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 2: Profile Content */}
        <div className="md:w-3/4 bg-white rounded-lg shadow flex flex-col">
          {/* Header: Name, Specialization, and Rating */}
          <div className="p-6">
            <h1 className="text-4xl font-bold text-lime-600">
              {therapist.therapist.user.fullName}
            </h1>
            <div className="flex items-center mt-4">
              {Array(4).fill(null).map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
              <FaStarHalfAlt className="text-yellow-500" />
              {therapist.therapist.rating && (
                <span className="ml-2 text-lg text-gray-600">
                  {therapist.therapist.ratingCount}
                </span>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="border-t border-b">
            <ul className="flex">
              {[
                { key: "about", label: "Introduce" },
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

          {/* Tab Content */}
          <div className="p-6 flex-grow">
            {activeTab === "about" && (
              <div>
                <p className="text-gray-700">{therapist.bio}</p>
                <p className="text-gray-700 italic mt-4">
                  "{therapist.personalStatement}"
                </p>
                <p className="text-lg mt-4 text-gray-700">
                  <strong>Specialties:</strong> {therapist.specialties}
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
                  <strong>Certifications:</strong> {therapist.certifications}
                </p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="p-6 border-t flex flex-col items-center">
            <div className="flex justify-center items-center mb-4">
              <div className="flex items-center mr-4">
                <MailOutlined className="mr-1" />
                <span>Email: {therapist.therapist.user.email} </span> {/* Email not available in API response */}
              </div>
              <div className="flex items-center">
                <PhoneOutlined className="mr-1" />
                <span>Phone: {therapist.therapist.user.phone}</span> {/* Phone not available in API response */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      
    </div>
  );
};

export default TherapistProfile;
