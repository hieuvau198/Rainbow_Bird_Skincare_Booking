import React from 'react';
import TherapistCard from '../../../components/TherapistCard';
import mockTherapists from '../../Customer/ViewTherapist/mock_therapist.json';

export default function HomeBestTherapists() {
  return (
    <div className="p-6 lg:p-24 md:p-16 bg-gray-300/65 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Our Therapists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTherapists.slice(0, 4).map((therapist) => (
          <TherapistCard key={therapist.id} {...therapist} />
        ))}
      </div>
    </div>
  );
}
