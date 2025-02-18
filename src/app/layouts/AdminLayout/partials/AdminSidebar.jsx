import {
  BookOutlined,
  FileTextOutlined,
  IdcardOutlined,
  MessageOutlined,
  PieChartOutlined,
  ScheduleOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserOutlined
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import UserRole from "../../../../enums/userRole";
import { sActiveMenu } from "../../../../store/Store";
import logo from "../../../assets/img/logo.png";
import DecodeRole from "../../../components/DecodeRole";
import logOut from "../../../modules/Logout";

const AdminSidebar = () => {
  const activeMenu = sActiveMenu.use();
  const location = useLocation();
  const userRole = DecodeRole();

  useEffect(() => {
    const currentPath = location.pathname;

    const menuMap = {
      "/management/dashboard": "Dashboard",
      "/management/booking": "Bookings",
      "/management/service": "Services",
      "/management/employee": "Employee",
      "/management/customer": "Customer",
      "/management/feedback": "Feedback",
      "/management/profile": "Profile",
      "/management/quiz": "Quiz",
      "/management/schedule": "Schedule",
    };

    const currentMenu = menuMap[currentPath];
    if (currentMenu) {
      sActiveMenu.set(currentMenu);
    }
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 h-screen bg-white shadow-md z-40 lg:w-64 hidden lg:block">
      <div className="py-4 flex justify-center border-b-2">
        <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
      </div>

      <nav className="mt-6 w-[80%] mx-auto">
        <div className="space-y-2 text-gray-600">
          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Link
              to="/management/dashboard"
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
          )}

          {(userRole !== UserRole.THERAPIST) && (
            <Link
              to="/management/booking"
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
          )}

          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Link
              to="/management/quiz"
              className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Quiz"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              onClick={() => {
                sActiveMenu.set("Quiz");
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <BookOutlined />
                <span className="text-lg font-semibold">Quiz</span>
              </div>
            </Link>
          )}

          {(userRole !== UserRole.THERAPIST) && (
            <Link
              to="/management/service"
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
          )}

          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Link
              to="/management/employee"
              className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Employee"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              onClick={() => {
                sActiveMenu.set("Employee");
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <IdcardOutlined />
                <span className="text-lg font-semibold">Employee</span>
              </div>
            </Link>
          )}

          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Link
              to="/management/customer"
              className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Customer"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              onClick={() => {
                sActiveMenu.set("Customer");
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <SolutionOutlined />
                <span className="text-lg font-semibold">Customer</span>
              </div>
            </Link>
          )}

          {/* {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Link
              to="/management/feedback"
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
          )} */}

          {(userRole === UserRole.THERAPIST) && (
            <Link
              to="/management/schedule"
              className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Schedule"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              onClick={() => {
                sActiveMenu.set("Schedule");
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <ScheduleOutlined />
                <span className="text-lg font-semibold">Schedule</span>
              </div>
            </Link>
          )}

          {/* <Link
            to="/management/profile"
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
          </Link> */}

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