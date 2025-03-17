import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import getTherapist from '../../../modules/Home/getTherapist';

export default function HomeBestTherapists() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      setLoading(true);
      try {
        const response = await getTherapist();
        const sortedTherapists = response.sort((a, b) => {
          const ratingA = a.therapist?.rating || 0;
          const ratingB = b.therapist?.rating || 0;
          return ratingB - ratingA;
        });
        setTherapists(sortedTherapists);
      } catch (error) {
        setError(error);
        console.error("Error fetching therapist profile:", error);
      }
      setLoading(false);
    };

    fetchTherapist();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 lg:p-24 md:p-16 bg-green-100/70 min-h-screen flex items-center justify-center">
      <div className="p-10 border-2 border-green-200 bg-green-200 rounded-md shadow-lg md:p-10 w-full lg:border-4 max-w-[1250px]">
        <h1 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          OUR THERAPISTS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {therapists.slice(0, 4).map((therapist) => (
            <Link to={`/therapists/${therapist.therapistId}`} key={therapist.therapistId} target="_top">
              <div className="bg-sky-50 shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition">
                <img
                  src={therapist.profileImage || `https://ui-avatars.com/api/?name=${therapist.therapist.user.fullName}`}
                  alt="Therapist"
                  className="w-full h-52 object-cover object-top rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-700">{therapist.therapist.user.fullName}</h2>
                <p className="text-sm text-gray-500">Available: {therapist.therapist.isAvailable ? 'Yes' : 'No'}</p>
                <p className="text-sm text-gray-500">Schedule: {therapist.therapist.schedule}</p>
                <p className="text-sm text-yellow-500 font-medium">
                  Rating: {therapist.therapist.rating !== null ? therapist.therapist.rating : 'N/A'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
