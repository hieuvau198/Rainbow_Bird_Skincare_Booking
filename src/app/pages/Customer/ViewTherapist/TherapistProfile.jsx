import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import mockTherapists from './mock_therapist_profile.json';

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
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <img
          src={therapist.profileImage}
          alt={therapist.name}
          className="object-cover min-h-52 rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-700">{therapist.name}</h1>
        <p className="text-sm text-gray-500">Specialization: {therapist.specialization}</p>
        <p className="text-sm text-gray-500">Experience: {therapist.experience}</p>
        <p className="text-sm text-yellow-500 font-medium">Rating: {therapist.rating}</p>
        <p className="text-sm text-gray-500">Email: {therapist.email}</p>
        <p className="text-sm text-gray-500">Phone: {therapist.phone}</p>
        <p className="text-sm text-gray-700 mt-4 text-center">{therapist.bio}</p>
        <Link to="/therapists" className="mt-4 text-blue-500 underline">Go back</Link>
      </div>
    </div>
  );
};

export default TherapistProfile;
