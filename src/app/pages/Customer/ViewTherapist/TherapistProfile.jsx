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
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row w-full max-w-4xl">
        {/* Hình ảnh bên trái */}
        <div className="md:w-2/3 flex justify-center">
          <img
            src={therapist.profileImage}
            alt={therapist.name}
            className="object-cover rounded-md w-48 h-48 md:w-60 md:h-60"
          />
        </div>

        {/* Thông tin therapist bên phải */}
        <div className="md:w-2/3 flex flex-col p-6">
          <h1 className="text-2xl font-bold text-gray-700">{therapist.name}</h1>
          <p className="text-sm text-gray-500">Profile ID: {therapist.profileId}</p>
          <p className="text-sm text-gray-500">Specialization: {therapist.specialization}</p>
          <p className="text-sm text-gray-500">Specialties: {therapist.specialties.join(", ")}</p>
          <p className="text-sm text-gray-500">Experience: {therapist.yearsExperience} years</p>
          <p className="text-sm text-gray-500">Languages: {therapist.languages.join(", ")}</p>
          <p className="text-sm text-gray-500">Education: {therapist.education}</p>
          <p className="text-sm text-gray-500">Certifications: {therapist.certifications.join(", ")}</p>
          <p className="text-sm text-gray-500">Accepting New Clients: {therapist.acceptsNewClients ? "Yes" : "No"}</p>
          <p className="text-sm text-yellow-500 font-medium">Rating: {therapist.rating}</p>
          <p className="text-sm text-gray-500">Email: {therapist.email}</p>
          <p className="text-sm text-gray-500">Phone: {therapist.phone}</p>
          <p className="text-sm text-gray-700 mt-4">{therapist.bio}</p>
          <p className="text-sm text-gray-700 italic mt-4">"{therapist.personalStatement}"</p>
          <p className="text-sm text-gray-500 mt-2">Profile Created: {new Date(therapist.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Last Updated: {new Date(therapist.updatedAt).toLocaleDateString()}</p>

          <Link to="/therapists" className="mt-4 text-blue-500 underline">Go back</Link>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
