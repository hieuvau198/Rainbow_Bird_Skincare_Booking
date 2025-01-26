import {
  FileTextOutlined,
  LineChartOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { FaChartPie } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { sActiveMenu } from "../../../../store/Store";
import logOut from "../../../modules/Logout";
import logo from "../../../../app/assets/img/logo.png";

const AdminSidebar = () => {
  const activeMenu = sActiveMenu.use();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    const menuMap = {
      "/admin/dashboard": "Dashboard",
      "/admin/booking": "Bookings",
      "/admin/service": "Services",
      "/admin/employee": "Employee",
      "/admin/feedback": "Feedback",
      "/admin/profile": "Profile",
    };

    const currentMenu = menuMap[currentPath];
    if (currentMenu) {
      sActiveMenu.set(currentMenu);
    }
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 h-screen bg-white shadow-md z-40 lg:w-64 hidden lg:block">
      <div className="mt-4 flex justify-center border-b-2">
        <img src={logo} alt="Logo" className="w-28 h-28 rounded-full" />
      </div>

      <nav className="mt-6 w-[80%] mx-auto">
        <ul className="space-y-2 text-gray-600">
          <li
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Dashboard"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Dashboard");
            }}
          >
            <Link to="/admin/dashboard" className="flex items-center gap-3 w-full">
              <FaChartPie />
              <span className="text-lg font-semibold">Dashboard</span>
            </Link>
          </li>

          <li
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Bookings"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Bookings");
            }}
          >
            <Link to="/admin/booking" className="flex items-center gap-3 w-full">
              <ShoppingCartOutlined />
              <span className="text-lg font-semibold">Bookings</span>
            </Link>
          </li>

          <li
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Services"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Services");
            }}
          >
            <Link to="/admin/service" className="flex items-center gap-3 w-full">
              <FileTextOutlined />
              <span className="text-lg font-semibold">Services</span>
            </Link>
          </li>

          <li
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Employee"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Employee");
            }}
          >
            <Link to="/admin/employee" className="flex items-center gap-3 w-full">
              <LineChartOutlined />
              <span className="text-lg font-semibold">Employee</span>
            </Link>
          </li>

          <li
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Feedback"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Feedback");
            }}
          >
            <Link to="/admin/feedback" className="flex items-center gap-3 w-full">
              <MessageOutlined />
              <span className="text-lg font-semibold">Feedback</span>
            </Link>
          </li>

          <li
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Profile"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Profile");
            }}
          >
            <Link to="/admin/profile" className="flex items-center gap-3 w-full">
              <UserOutlined />
              <span className="text-lg font-semibold">Profile</span>
            </Link>
          </li>

          <li className="group hover:bg-gray-200 rounded-lg">
            <a
              onClick={() => logOut()}
              className="flex items-center gap-3 px-6 py-3 w-full text-red-500 hover:text-red-600"
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