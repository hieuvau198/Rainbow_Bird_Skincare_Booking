import React from "react";
import { sActiveMenu } from "../../../../store/Store";
import { Avatar } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

export default function AdminHeader() {
  const activeMenu = sActiveMenu.use();

  return (
    <div className="fixed top-0 left-0 lg:left-64 w-full lg:w-[calc(100%-16rem)] flex items-center justify-between bg-white px-4 lg:px-6 py-3 shadow-md z-50">
      <h1 className="text-lg lg:text-2xl font-semibold text-gray-800">{activeMenu}</h1>
      <div className="flex items-center gap-x-3 pr-2">
        {/* <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User Avatar"
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
        /> */}
        <Avatar
          size={40}
          icon={<UserOutlined />}
        />
        <div className="text-gray-600 hidden lg:block">
          <p className="font-semibold">Hoàng</p>
          <p className="text-sm">Manager</p>
        </div>
      </div>
    </div>
  );
}