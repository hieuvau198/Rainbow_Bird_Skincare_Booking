import {
  FileTextOutlined,
  LineChartOutlined,
  MessageOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { FaChartPie } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import logOut from "../../../modules/Logout";
import { sActiveMenu } from "../../../../store/Store";

const AdminSidebar = () => {
  const activeMenu = sActiveMenu.use();
  const location = useLocation();

  useEffect(() => {
    const currentMenu = menuItems.find((item) => item.link === location.pathname);
    if (currentMenu) {
      sActiveMenu.set(currentMenu.label);
    }
  }, [location.pathname]);

  const menuItems = [
    { id: "/dashboard", label: "Dashboard", icon: <FaChartPie />, link: "/admin/dashboard" },
    { id: "/bookings", label: "Bookings", icon: <ShoppingCartOutlined />, link: "/admin/booking" },
    { id: "/services", label: "Services", icon: <FileTextOutlined />, link: "/admin/dashboard" },
    { id: "/employee", label: "Employee", icon: <LineChartOutlined />, link: "/admin/employee" },
    { id: "/feedback", label: "Feedback", icon: <MessageOutlined />, link: "/admin/feedback" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen lg:w-64 md:w-56 bg-white shadow-md z-50 flex flex-col items-center">
      <div className="mt-4">
        <img
          src="https://cms.imgworlds.com/assets/473cfc50-242c-46f8-80be-68b867e28919.jpg?key=home-gallery"
          alt="Logo"
          className="w-20 h-20 rounded-full"
        />
      </div>

      <nav className="mt-9 w-[80%]">
        <ul className="space-y-2 -ml-1 text-gray-600">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`group flex items-center justify-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === item.label
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              onClick={() => sActiveMenu.set(item.label)}
            >
              <Link to={item.link} className="flex items-center gap-3 w-full">
                {item.icon}
                <span className="text-lg font-semibold">{item.label}</span>
              </Link>
            </li>
          ))}

          <li className="group hover:bg-gray-200 rounded-lg">
            <a
              onClick={() => logOut()}
              className="flex items-center  gap-3 px-6 py-3 w-full text-red-500 hover:text-red-600"
            >
              <TbLogout />
              <span>Sign Out</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;