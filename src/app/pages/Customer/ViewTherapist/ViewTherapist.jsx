import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import getTherapist from "../../../modules/Admin/Employee/getTherapist";
import getTherapistProfile from "../../../modules/Admin/Employee/getTherapistProfile";

const ViewTherapist = () => {
  const [therapists, setTherapists] = useState([]);
  const [therapistProfiles, setTherapistProfiles] = useState({});
  const [sortOption, setSortOption] = useState("az");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      setLoading(true);
      try {
        const data = await getTherapist();
        setTherapists(data);

        // Fetch therapist profiles (images)
        const profiles = {};
        for (const therapist of data) {
          const profile = await getTherapistProfile(therapist.therapistId);
          profiles[therapist.therapistId] = profile.profileImage || "https://via.placeholder.com/150";
        }
        setTherapistProfiles(profiles);

      } catch (err) {
        setError(err.message || "Failed to fetch therapists.");
      }
      setLoading(false);
    };

    fetchTherapists();
  }, []);

  // Sorting function
  const sortTherapists = (therapists, option) => {
    switch (option) {
      case "az":
        return [...therapists].sort((a, b) => (a.user?.fullName || "").localeCompare(b.user?.fullName || ""));
      case "za":
        return [...therapists].sort((a, b) => (b.user?.fullName || "").localeCompare(a.user?.fullName || ""));
      case "rating-high-to-low":
        return [...therapists].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "rating-low-to-high":
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
      <h1 className="text-5xl font-bold text-center text-gray-700 mb-6">
        Our Therapists
      </h1>

      {/* Sorting Dropdown */}
      <div className="mb-6">
        <label htmlFor="sort" className="mr-2 font-medium">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="az">Alphabetically, A-Z</option>
          <option value="za">Alphabetically, Z-A</option>
          {/* <option value="rating-high-to-low">Rating, high to low</option>
          <option value="rating-low-to-high">Rating, low to high</option> */}
        </select>
      </div>

      {/* Displaying Therapists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedTherapists.map((therapist) => (
          <Link to={`/therapists/${therapist.therapistId}`} key={therapist.therapistId}>
            <div className="bg-sky-50 shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition">
              {/* Therapist Image */}
              <img
                src={therapistProfiles[therapist.therapistId] || "https://via.placeholder.com/150"}
                alt={therapist.user?.fullName || "Therapist"}
                className="w-full h-52 object-cover object-top rounded-md mb-4"
              />

              {/* Therapist Name */}
              <h2 className="text-lg font-semibold text-gray-700">
                {therapist.user?.fullName || "Unknown"}
              </h2>

              {/* Therapist Phone */}
              <p className="text-sm text-gray-500">
                Phone: {therapist.user?.phone || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewTherapist;
