import React from 'react';
import { Link } from 'react-router-dom';
import mockTherapists from './mock_therapist.json';

const ViewTherapist = () => {
  return (
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Our Therapists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTherapists.map((therapist) => (
          <Link to={`/therapists/${therapist.id}`} key={therapist.id}>
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition">
              <img
                src={therapist.profileImage}
                alt={therapist.name}
                className="object-cover min-h-52 rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">{therapist.name}</h2>
              <p className="text-sm text-gray-500">Specialization: {therapist.specialization}</p>
              <p className="text-sm text-gray-500">Experience: {therapist.experience}</p>
              <p className="text-sm text-yellow-500 font-medium">Rating: {therapist.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewTherapist;
