import {
  FileTextOutlined,
  LineChartOutlined,
  MessageOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../app/assets/img/logo.png";
import { sActiveMenu } from "../../../../store/Store";
import logOut from "../../../modules/Logout";

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
      "/admin/quiz": "Quiz",
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
        <div className="space-y-2 text-gray-600">
          <Link
            to="/admin/dashboard"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Dashboard"
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Dashboard");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <PieChartOutlined />
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
          </Link>

          <Link
            to="/admin/booking"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Bookings"
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Bookings");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <ShoppingCartOutlined />
              <span className="text-lg font-semibold">Bookings</span>
            </div>
          </Link>

          <Link
            to="/admin/quiz"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Quiz"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Quiz");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <FileTextOutlined />
              <span className="text-lg font-semibold">Quiz</span>
            </div>
          </Link>

          <Link
            to="/admin/service"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Services"
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Services");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <FileTextOutlined />
              <span className="text-lg font-semibold">Services</span>
            </div>
          </Link>

          <Link
            to="/admin/employee"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Employee"
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Employee");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <LineChartOutlined />
              <span className="text-lg font-semibold">Employee</span>
            </div>
          </Link>

          <Link
            to="/admin/feedback"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Feedback"
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Feedback");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <MessageOutlined />
              <span className="text-lg font-semibold">Feedback</span>
            </div>
          </Link>

          <Link
            to="/admin/profile"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Profile"
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("Profile");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <UserOutlined />
              <span className="text-lg font-semibold">Profile</span>
            </div>
          </Link>

          <div className="cursor-pointer hover:bg-gray-200 rounded-lg">
            <a
              onClick={() => logOut()}
              className="flex items-center gap-3 px-6 py-3 w-full text-red-500 hover:text-red-600"
            >
              <TbLogout />
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;