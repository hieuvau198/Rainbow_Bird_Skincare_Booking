import React from 'react';
import TherapistCard from '../../../components/TherapistCard';
import mockTherapists from '../../Customer/ViewTherapist/mock_therapist.json';
import { Link } from 'react-router-dom';
export default function HomeBestTherapists() {
  return (
      <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">BEST THERAPISTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTherapists.slice(0, 4).map((therapist) => (
            <TherapistCard key={therapist.id} {...therapist} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link target="_top" to={"/therapists"}>
            <button className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded">
              View More
            </button>
          </Link>
        </div>
      </div>
  );
}
