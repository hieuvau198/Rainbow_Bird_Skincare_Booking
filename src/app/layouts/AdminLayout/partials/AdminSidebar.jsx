import React, { useEffect } from "react";
import {
  AiOutlineBook,
  AiOutlineFileText,
  AiOutlineIdcard,
  AiOutlineMessage,
  AiOutlinePieChart,
  AiOutlineSchedule,
  AiOutlineShoppingCart,
  AiOutlineTeam,
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineStar
} from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import UserRole from "../../../../enums/userRole";
import { sActiveMenu } from "../../../../store/Store";
import logo from "../../../assets/img/logo.png";
import DecodeRole from "../../../components/DecodeRole";
import logOut from "../../../modules/Logout";
import { HiOutlineNewspaper } from "react-icons/hi";

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
      "/management/feedback": "Rating",
      "/management/profile": "Profile",
      "/management/quiz": "Quiz",
      "/management/schedule": "Schedule",
      "/management/NewsAndBlog": "News&Blog",
      "/management/workingday": "Working Day",
    };

    const currentMenu = menuMap[currentPath];
    if (currentMenu) {
      sActiveMenu.set(currentMenu);
    }
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 h-screen bg-white shadow-md z-40 lg:w-64 hidden lg:block">
      <div className="py-2 flex justify-center border-b-2">
        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
      </div>

      <nav className="mt-2 w-[80%] mx-auto">
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
                <AiOutlinePieChart />
                <span className="text-[15px] font-semibold">Dashboard</span>
              </div>
            </Link>
          )}

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
              <AiOutlineShoppingCart />
              <span className="text-[15px] font-semibold">Bookings</span>
            </div>
          </Link>

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
                <AiOutlineBook />
                <span className="text-[15px] font-semibold">Quiz</span>
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
                <AiOutlineFileText />
                <span className="text-[15px] font-semibold">Services</span>
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
                <AiOutlineIdcard />
                <span className="text-[15px] font-semibold">Employee</span>
              </div>
            </Link>
          )}

          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Link
              to="/management/workingday"
              className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Working Day"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              onClick={() => {
                sActiveMenu.set("Working Day");
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <AiOutlineClockCircle />
                <span className="text-[15px] font-semibold">Working Days</span>
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
                <AiOutlineTeam />
                <span className="text-[15px] font-semibold">Customer</span>
              </div>
            </Link>
          )}

          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
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
                <AiOutlineMessage />
                <span className="text-[15px] font-semibold">Feedback</span>
              </div>
            </Link>
          )}

          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Link
              to="/management/rating"
              className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "Rating"
                ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                }`}
              onClick={() => {
                sActiveMenu.set("Rating");
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <AiOutlineStar />
                <span className="text-[15px] font-semibold">Rating</span>
              </div>
            </Link>
          )}

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
                <AiOutlineSchedule />
                <span className="text-[15px] font-semibold">Schedule</span>
              </div>
            </Link>
          )}

          <Link
            to="/management/NewsAndBlog"
            className={`group flex items-center gap-3 px-6 py-3 cursor-pointer rounded-2xl ${activeMenu === "News&Blog"
              ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md"
              : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
            onClick={() => {
              sActiveMenu.set("News&Blog");
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <HiOutlineNewspaper />
              <span className="text-[15px] font-semibold">News&Blog</span>
            </div>
          </Link>

          <Link
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
              <AiOutlineUser />
              <span className="text-[15px] font-semibold">Profile</span>
            </div>
          </Link>

          <div className="cursor-pointer hover:bg-gray-200 rounded-lg">
            <a
              onClick={() => logOut()}
              className="flex items-center gap-3 px-6 py-3 w-full text-red-500 hover:text-red-600"
            >
              <TbLogout />
              <span className="text-[15px] font-semibold">Sign Out</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
