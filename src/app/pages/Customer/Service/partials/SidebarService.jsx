import React from "react";

const SidebarService = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, applyFilters }) => {
  return (
    <div className="col-span-1 p-6 bg-white shadow-sm rounded-lg">

      <h2 className="text-lg font-bold mt-4 mb-2">Price Range</h2>
      <div className="flex items-center space-x-2 text-sm">
        <input
          type="number"
          className="w-1/2 p-1 border rounded"
          placeholder="From"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          className="w-1/2 p-1 border rounded"
          placeholder="To"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <button
        onClick={applyFilters}
        className="mt-2 w-full bg-orange-500 text-white p-2 rounded-md text-sm"
      >
        Apply
      </button>
    </div>
  );
};

export default SidebarService;
