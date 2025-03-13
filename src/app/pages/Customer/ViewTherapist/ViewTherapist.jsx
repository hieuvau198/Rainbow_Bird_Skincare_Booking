import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

const ViewTherapist = () => {
  const [therapists, setTherapists] = useState([]);
  const [sortOption, setSortOption] = useState('az');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/TherapistProfile/with-reference')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch therapists');
        }
        return response.json();
      })
      .then(data => {
        setTherapists(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Sorting function
  const sortTherapists = (therapists, option) => {
    switch (option) {
      case 'az':
        return [...therapists].sort((a, b) => a.therapistId - b.therapistId);
      case 'za':
        return [...therapists].sort((a, b) => b.therapistId - a.therapistId);
      case 'rating-high-to-low':
        return [...therapists].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'rating-low-to-high':
        return [...therapists].sort((a, b) => (a.rating || 0) - (b.rating || 0));
      default:
        return therapists;
    }
  };

  const sortedTherapists = sortTherapists(therapists, sortOption);

  if (loading) return <Loading />;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 lg:p-24 md:p-16 bg-slate-50 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-gray-700 mb-6">Our Therapists</h1>

      {/* Sorting Dropdown */}
      <div className="mb-6">
        <label htmlFor="sort" className="mr-2 font-medium">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="az">Alphabetically, A-Z</option>
          <option value="za">Alphabetically, Z-A</option>
          <option value="rating-high-to-low">Rating, high to low</option>
          <option value="rating-low-to-high">Rating, low to high</option>
        </select>
      </div>

      {/* Displaying Therapists using UI from TherapistCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedTherapists.map((therapist) => (
          <Link to={`/therapists/${therapist.therapistId}`} key={therapist.therapistId}>
            <div className="bg-sky-50 shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition">
              {/* Updated Placeholder Image */}
              <img
                src={therapist.profileImage || `https://ui-avatars.com/api/?name=${therapist.therapist.user.fullName}`}
                alt="Therapist"
                className="w-full h-52 object-cover object-top rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">{therapist.therapist.user.fullName}</h2>
              <p className="text-sm text-gray-500">Available: {therapist.isAvailable ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-500">Schedule: {therapist.schedule}</p>
              <p className="text-sm text-yellow-500 font-medium">
                Rating: {therapist.therapist.rating !== null ? therapist.therapist.rating : 'N/A'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewTherapist;
