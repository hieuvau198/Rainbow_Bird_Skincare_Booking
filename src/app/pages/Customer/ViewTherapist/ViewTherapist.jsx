import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import getTherapist from "../../../modules/Home/getTherapist";

const ViewTherapist = () => {
  const [therapists, setTherapists] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [sortOption, setSortOption] = useState("az");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      setLoading(true);
      try {
        const response = await getTherapist();
        setTherapists(response);
      } catch (error) {
        setError(error);
        console.error("Error fetching therapist profile:", error);
      }
      setLoading(false);
    }

    fetchTherapist();
  }, []);

  const sortTherapists = (therapistsList, option) => {
    switch (option) {
      case "az":
        return [...therapistsList].sort(
          (a, b) => a.therapistId - b.therapistId
        );
      case "za":
        return [...therapistsList].sort(
          (a, b) => b.therapistId - a.therapistId
        );
        case "rating-high-to-low":
          return [...therapistsList].sort(
            (a, b) => (b.therapist.rating || 0) - (a.therapist.rating || 0)
          );
        case "rating-low-to-high":
          return [...therapistsList].sort(
            (a, b) => (a.therapist.rating || 0) - (b.therapist.rating || 0)
          );
        
      default:
        return therapistsList;
    }
  };

  // Filter function
  const filterTherapists = (therapistsList) => {
    return therapistsList.filter((t) => {
      const nameMatches = t.therapist.user.fullName
        .toLowerCase()
        .includes(searchName.toLowerCase());

      if (searchRating === "") {
        return nameMatches;
      }

      const therapistRating = t.therapist.rating || 0;
      return nameMatches && therapistRating >= parseFloat(searchRating);
    });
  };

  const filteredTherapists = filterTherapists(therapists);
  const sortedTherapists = sortTherapists(filteredTherapists, sortOption);

  if (loading) return <Loading />;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-slate-50 flex gap-1">
      {/* Filter & Sort Sidebar (smaller, rounded, shadowed) */}
      <div className="hidden md:block ml-10 ">
        <div className="sticky top-4 bg-sky-50 shadow rounded-lg p-4 w-[240px] ml-20 mt-20 mb-10">
          <h2 className="text-xl font-bold mb-4"></h2>

          {/* Search by Name */}
          <div className="mb-6">
            <label htmlFor="searchName" className="block mb-2 font-medium">

            </label>
            <input
              type="text"
              id="searchName"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full"
              placeholder="Search..."
            />
          </div>


          {/* Sort Options */}
          <div>
            <p className="font-medium mb-2">Sort by:</p>

            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="sortOption"
                value="az"
                checked={sortOption === "az"}
                onChange={(e) => setSortOption(e.target.value)}
                className="mr-2"
              />
              A-Z
            </label>

            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="sortOption"
                value="za"
                checked={sortOption === "za"}
                onChange={(e) => setSortOption(e.target.value)}
                className="mr-2"
              />
              Z-A
            </label>

            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="sortOption"
                value="rating-high-to-low"
                checked={sortOption === "rating-high-to-low"}
                onChange={(e) => setSortOption(e.target.value)}
                className="mr-2"
              />
              Rating: High to Low
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="sortOption"
                value="rating-low-to-high"
                checked={sortOption === "rating-low-to-high"}
                onChange={(e) => setSortOption(e.target.value)}
                className="mr-2"
              />
              Rating: Low to High
            </label>
          </div>
        </div>
      </div>

      {/* Main Content: Therapists List */}
      <div className="flex-1 p-4 lg:p-8 mr-16 mb-20">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600 mb-3 mr-20">
          Our Therapists
        </h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedTherapists.map((therapist) => (
            <Link
              to={`/therapists/${therapist.therapistId}`}
              key={therapist.therapistId}
              target="_top"
            >
              <div className="bg-sky-50 shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition -mt-1">
                <img
                  src={therapist.profileImage || `https://ui-avatars.com/api/?name=${therapist.therapist.user.fullName}`}
                  alt="Therapist"
                  className="w-full h-52 object-cover object-top rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-700">
                  {therapist.therapist.user.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  Available: {therapist.isAvailable ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-500">
                  Schedule: {therapist.schedule}
                </p>
                <p className="text-sm text-yellow-500 font-medium">
                  Rating:{" "}
                  {therapist.therapist.rating !== null
                    ? therapist.therapist.rating
                    : "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTherapist;
