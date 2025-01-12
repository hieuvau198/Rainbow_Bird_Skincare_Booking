import { BellOutlined } from "@ant-design/icons";
import React from "react";

export default function AdminHeader({ activeMenu }) {
  return (
    <div className="flex items-center justify-between bg-white ml-64 pl-6 pr-12 py-4 max-h-20 shadow-md">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-semibold text-gray-800">{activeMenu}</h1>

      {/* Hành động bên phải */}
      <div className="flex items-center gap-6">
        {/* Thông báo */}
        <div className="relative cursor-pointer">
          <BellOutlined className="text-xl text-gray-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            1
          </span>
        </div>

        {/* Thông tin người dùng */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-gray-600">
            <p className="font-semibold">Hoàng</p>
            <p className="text-sm">Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}