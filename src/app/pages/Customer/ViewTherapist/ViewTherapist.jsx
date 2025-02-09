import React from 'react';
import { Link } from 'react-router-dom';
import mockTherapists from './mock_therapist.json';
import TherapistCard from '../../../components/TherapistCard';

const ViewTherapist = () => {
  return (
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Our Therapists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTherapists.map((therapist) => (
          <TherapistCard key={therapist.id} {...therapist} />
        ))}
      </div>
    </div>
  );
};

export default ViewTherapist;
