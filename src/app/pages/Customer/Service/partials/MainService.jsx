import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, StarOutlined, DollarOutlined, ClockCircleOutlined, AppstoreOutlined, BarsOutlined, TableOutlined, HolderOutlined } from "@ant-design/icons";

export default function MainContent({ services }) {
  const [gridCols, setGridCols] = useState("grid-cols-1");
  const isListView = gridCols === "grid-cols-1";
  const [sortOption, setSortOption] = useState("Alphabetically, A-Z");

  const sortedServices = [...services].sort((a, b) => {
    switch (sortOption) {
      case "Alphabetically, A-Z":
        return a.service_name.localeCompare(b.service_name);
      case "Alphabetically, Z-A":
        return b.service_name.localeCompare(a.service_name);
      case "Price, high to low":
        return parseInt(b.price.replace(/\D/g, ""), 10) - parseInt(a.price.replace(/\D/g, ""), 10);
      case "Price, low to high":
        return parseInt(a.price.replace(/\D/g, ""), 10) - parseInt(b.price.replace(/\D/g, ""), 10);
      case "Rating, high to low":
        return parseFloat(b.reviews) - parseFloat(a.reviews);
      case "Rating, low to high":
        return parseFloat(a.reviews) - parseFloat(b.reviews);
      default:
        return 0;
    }
  });

  return (
    <div className="col-span-3 p-4">
      {/* Sorting and Display Options */}
      <div className="flex justify-between items-center bg-white mb-4">
        <div className="flex space-x-2 text-sm">
          <button className="bg-white">Sort by:</button>
          <select className="p-2 bg-white" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option>Alphabetically, A-Z</option>
            <option>Alphabetically, Z-A</option>
            <option>Price, high to low</option>
            <option>Price, low to high</option>
            <option>Rating, high to low</option>
            <option>Rating, high to low</option>
          </select>

          {/* Column View Options */}
          <button onClick={() => setGridCols("grid-cols-2")} className="p-2 bg-white rounded" title="2 Columns">
            <HolderOutlined className="text-lg" />
          </button>
          <button onClick={() => setGridCols("grid-cols-3")} className="p-1 bg-white rounded" title="3 Columns">
            <AppstoreOutlined className="text-lg" />
          </button>
          <button onClick={() => setGridCols("grid-cols-4")} className="p-1 bg-white rounded" title="4 Columns">
            <TableOutlined className="text-lg" />
          </button>
          <button onClick={() => setGridCols("grid-cols-1")} className="p-1 bg-white rounded" title="List View">
            <BarsOutlined className="text-lg" />
          </button>
        </div>
        
        <span className="text-gray-600">There are {services.length} results in total</span>
      </div>

      {/* Service List */}
      <div className={`grid ${gridCols} gap-4`}>
        {sortedServices.map((service) => (
          <div key={service.service_id} className={`bg-white p-4 ${isListView ? 'flex items-start space-x-4' : ''}`}>
            <Link to={`/services/${service.service_id}`} key={service.service_id} target="_top" className="block w-full">
              <div className={`bg-white cursor-pointer ${isListView ? 'flex' : ''}`}>
                {/* Image */}
                <div className={`relative bg-white ${isListView ? 'w-1/2' : ''}`}>
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className={`w-full h-auto object-contain rounded-md my-2 transition-transform duration-300 hover:scale-105 ${isListView ? 'h-64 w-full' : ''}`}
                  />
                </div>

                {/* Content */}
                <div className={`p-4 flex flex-col justify-start ${isListView ? 'w-1/2' : ''}`}>
                  {/* Title */}
                  <h3 className="text-sm font-semibold mb-1">{service.service_name}</h3>

                  {/* Price & Status */}
                  <div className="flex items-center justify-between text-gray-600 text-xs mb-1">
                    <p><UserOutlined /> {service.buyers} Booking</p>
                    <p><StarOutlined /> {service.reviews} Rating</p>
                  </div>

                  <div className="mb-1">
                    <p className="text-red-500 font-bold text-sm"><DollarOutlined /> {service.price}</p>
                    <p className="text-gray-700 text-xs"><ClockCircleOutlined /> {service.duration_minutes}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-xs mt-2">
                    {service.description}
                    <Link to={`/services/${service.service_id}`} target="_top" className="text-blue-500"> See More</Link>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}