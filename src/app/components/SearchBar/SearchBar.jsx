import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ searchText, onSearchChange }) => {
  return (
    <Input
      placeholder="Search by Name"
      value={searchText}
      onChange={onSearchChange}
      allowClear
      prefix={<SearchOutlined />}
      className="w-64 mr-4"
    />
  );
};

export default SearchBar;
