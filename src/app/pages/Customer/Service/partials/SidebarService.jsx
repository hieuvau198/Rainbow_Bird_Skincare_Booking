import React from "react";
import { Checkbox } from "antd";

const SidebarService = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, applyFilters, categories, selectedCategory, setSelectedCategory }) => {

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId); // ✅ Bỏ chọn nếu đã chọn trước đó
      } else {
        return [...prev, categoryId]; // ✅ Thêm vào danh sách nếu chưa được chọn
      }
    });
  };
  
  

  return (
    <div className="col-span-1 p-6 bg-white shadow-sm rounded-lg">

      <h2 className="text-xl font-semibold mb-2">Select Category</h2>
      <div className="flex flex-col gap-y-5 w-full">
        <Checkbox
          checked={selectedCategory.length === 0}
          onChange={() => setSelectedCategory([])}
        >
          All Services
        </Checkbox>

        {categories.map((category) => (
          <Checkbox
            key={category.categoryId}
            checked={selectedCategory.includes(category.categoryId)}
            onChange={() => handleCategorySelect(category.categoryId)}
          >
            {category.categoryName}
          </Checkbox>
        ))}
      </div>


      <h2 className="text-lg font-bold mt-8 mb-2">Price Range</h2>
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
