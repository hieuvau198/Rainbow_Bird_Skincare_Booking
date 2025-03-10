import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";
import getTherapistProfile from "../../../modules/Admin/Employee/getTherapistProfile";
import getTherapist from "../../../modules/Admin/Employee/getTherapist";

const TherapistProfile = () => {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [therapistDetails, setTherapistDetails] = useState({
    fullName: "Unknown",
    email: "Not available",
    phone: "Not available",
  });
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTherapistData = async () => {
      setLoading(true);
      try {
        // Fetch Therapist Profile
        const profileData = await getTherapistProfile(id);
        setTherapist(profileData);

        // Fetch All Therapists to Find Matching Name, Email, and Phone
        const allTherapists = await getTherapist();
        const matchedTherapist = allTherapists.find((t) => t.therapistId === parseInt(id));
        
        if (matchedTherapist) {
          setTherapistDetails({
            fullName: matchedTherapist.user?.fullName || "Unknown",
            email: matchedTherapist.user?.email || "Not available",
            phone: matchedTherapist.user?.phone || "Not available",
          });
        }
      } catch (err) {
        setError(err.message || "Failed to fetch therapist data.");
      }
      setLoading(false);
    };

    fetchTherapistData();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  if (!therapist) {
    return <div className="p-6 text-center text-red-500">Therapist profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div className="md:w-1/4 bg-teal-200 rounded-lg shadow overflow-hidden self-start h-96">
          <img
            src={therapist.profileImage || "https://via.placeholder.com/150"}
            alt={therapistDetails.fullName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Content */}
        <div className="md:w-3/4 bg-white rounded-lg shadow flex flex-col">
          <div className="p-6">
            <h1 className="text-4xl font-bold text-lime-600">
              {therapistDetails.fullName}
            </h1>
            <p className="text-lg text-gray-500">{therapist.specialties}</p>
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
              {[{ key: "about", label: "Introduce" },
                { key: "reviews", label: "Rating" },
                { key: "schedule", label: "Schedules" },
                { key: "credentials", label: "Certificates" }
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
            {activeTab === "reviews" && <div>Reviews section...</div>}
            {activeTab === "schedule" && <div>Schedule section...</div>}
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
                <span>{therapistDetails.email}</span>
              </div>
              <div className="flex items-center">
                <PhoneOutlined className="mr-1" />
                <span>{therapistDetails.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
