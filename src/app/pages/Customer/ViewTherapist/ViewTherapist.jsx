import React, { useState } from 'react';
import mockTherapists from './mock_therapist.json';
import TherapistCard from '../../../components/TherapistCard';

const ViewTherapist = () => {
  // Trạng thái cho tuỳ chọn sắp xếp
  const [sortOption, setSortOption] = useState('az');

  // Hàm sắp xếp dựa trên sortOption
  const sortTherapists = (therapists, option) => {
    switch (option) {
      case 'az':
        return [...therapists].sort((a, b) => a.name.localeCompare(b.name));
      case 'za':
        return [...therapists].sort((a, b) => b.name.localeCompare(a.name));
      case 'price-high-to-low':
        return [...therapists].sort((a, b) => b.rating - a.rating);
      case 'rating-low-to-high':
        return [...therapists].sort((a, b) => a.rating - b.rating);
      default:
        return therapists;
    }
  };

  // Tạo danh sách therapist đã sắp xếp
  const sortedTherapists = sortTherapists(mockTherapists, sortOption);

  return (
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Our Therapists</h1>
      
      {/* Dropdown chọn kiểu sắp xếp */}
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
          <option value="rating-high-to-low">Rating, high to low</option>
          <option value="rating-low-to-high">Rating, low to high</option>
        </select>
      </div>

      {/* Hiển thị therapists đã sắp xếp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedTherapists.map((therapist) => (
          <TherapistCard key={therapist.id} {...therapist} />
        ))}
      </div>
    </div>
  );
};

export default ViewTherapist;
