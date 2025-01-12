import { BellOutlined } from "@ant-design/icons";
import React from "react";

export default function AdminHeader({ activeMenu }) {
  return (
    <div className="fixed top-0 left-64 w-[calc(100%-16rem)] flex items-center justify-between bg-white pl-6 pr-12 py-4 max-h-20 shadow-md z-50">
      <h1 className="text-2xl font-semibold text-gray-800">{activeMenu}</h1>

      <div className="flex items-center gap-6">

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