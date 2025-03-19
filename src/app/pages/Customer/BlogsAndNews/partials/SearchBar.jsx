import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <form className="max-w-lg mx-auto mb-6">
      <div className="flex">
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-3 w-full z-20 text-sm text-gray-900 bg-white rounded-full border border-gray-300 focus:ring-green-400 focus:border-green-400"
            placeholder="Search News or Blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-3 text-sm font-medium h-full text-white bg-green-500 rounded-r-full border border-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;