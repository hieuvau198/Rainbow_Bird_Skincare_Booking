import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd"; // Import Ant Design Pagination
import {UserOutlined,StarOutlined,DollarOutlined,ClockCircleOutlined,AppstoreOutlined,BarsOutlined,TableOutlined,HolderOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

export default function MainContent({ services }) {
  const [gridCols, setGridCols] = useState("grid-cols-1");
  const isListView = gridCols === "grid-cols-1";
  const [sortOption, setSortOption] = useState("Alphabetically, A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Default: 6 services per page

  // Update `pageSize` based on `gridCols`
  useEffect(() => {
    if (gridCols === "grid-cols-4") {
      setPageSize(8);
    } else {
      setPageSize(6);
    }
    setCurrentPage(1); // Reset về trang đầu khi thay đổi số cột
  }, [gridCols]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };

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

  // Pagination Logic: Get services for the current page
  const paginatedServices = sortedServices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
            <option>Rating, low to high</option>
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
        {paginatedServices.map((service) => (
          <div
            key={service.service_id}
            className={`bg-white p-4 border border-lime-200 rounded-md shadow-sm h-full flex flex-col ${
              isListView ? "flex items-start space-x-4" : "justify-between"
            }`}
          >
            <Link to={`/services/${service.service_id}`} key={service.service_id} target="_top" className="block w-full h-full">
              <div className={`bg-white cursor-pointer ${isListView ? "flex" : "h-full flex flex-col"}`}>
                {/* Image (Fixed Size) */}
                <div className={`relative bg-white ${isListView ? "w-1/2" : ""}`}>
                  <div className="w-full h-[300px] flex items-center justify-center overflow-hidden rounded-md bg-gray-100 hover:scale-105 transition">
                    <img
                      src={service.image}
                      alt={service.service_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`p-4 flex flex-col flex-grow ${isListView ? "w-1/2" : ""}`}>
                  {/* Title */}
                  <h3 className="text-sm font-semibold mb-1">{service.service_name}</h3>

                  {/* Price & Status */}
                  <div className="flex items-center justify-between text-gray-600 text-xs mb-1">
                    <p><UserOutlined /> {service.buyers} Booking</p>
                    <p><StarOutlined /> {service.reviews} Rating</p>
                  </div>

                  {/* Pricing and Duration */}
                  <div className="mb-2">
                    <p className="text-red-500 font-bold text-sm"><DollarOutlined /> {service.price}</p>
                    <p className="text-gray-700 text-xs"><ClockCircleOutlined /> {service.duration_minutes}</p>
                  </div>

                  {/* Description */}
                  <div className="text-gray-600 text-xs mt-2 markdown-container flex-grow min-h-[4rem]">
                    <ReactMarkdown>{truncateText(service.description, 40)}</ReactMarkdown>
                  </div>

                  <div className="mt-auto">
                    <Link to={`/services/${service.service_id}`} target="_top" className="text-blue-500 text-xs mt-4">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={sortedServices.length}
          onChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll lên top khi chuyển trang
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
