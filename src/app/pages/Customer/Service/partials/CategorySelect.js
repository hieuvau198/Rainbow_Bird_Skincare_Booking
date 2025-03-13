import React from "react";
import { Button } from "antd";

const CategorySelect = ({ categories, selectedCategory, setSelectedCategory }) => {
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select Category</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          type={selectedCategory === null ? "primary" : "default"}
          onClick={() => handleCategorySelect(null)}
        >
          All Services
        </Button>

        {categories.map((category) => (
          <Button
            key={category.categoryId}
            type={selectedCategory === category.categoryId ? "primary" : "default"}
            onClick={() => handleCategorySelect(category.categoryId)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
