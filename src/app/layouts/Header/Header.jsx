import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Avatar, Button } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import logOut from "../../modules/Logout";
import logo from "../../assets/img/logo.png";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("_aT");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logOut();
  };

  const menuItems = isLoggedIn
    ? [
      {
        key: "profile",
        label: <Link className="text-md" to="/profile">Profile</Link>,
      },
      {
        key: "schedule",
        label: <Link className="text-md" to="/schedule-booking">Schedule</Link>,
      },
      {
        key: "logout",
        danger: true,
        label: (
          <span className="text-md" onClick={handleLogout}>
            Logout
          </span>
        ),
      },
    ]
    : [
      {
        key: "login",
        label: (
          <Link
            to="/login"
            className="text-md text-lime-600 font-semibold hover:underline"
          >
            Login
          </Link>
        ),
      },
    ];

  return (
    <div className="bg-gradient-to-l from-lime-200 via-sky-100 to-green-200 dark:bg-slate-600 shadow-md">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-lime-600">
            <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-500 hover:text-lime-700 font-semibold transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="text-gray-500 hover:text-lime-700 font-semibold transition duration-200"
          >
            Quiz
          </Link>
          <Link
            to="/services"
            className="text-gray-500 hover:text-lime-700 font-semibold transition duration-200"
          >
            Services
          </Link>
          <Link
            to="/therapists"
            className="text-gray-500 hover:text-lime-700 font-semibold transition duration-200"
          >
            Therapists
          </Link>
          <Link
            to="/news"
            className="text-gray-500 hover:text-lime-700 font-semibold transition duration-200"
          >
            Blog & News
          </Link>
          <Link
            to="/about"
            className="text-gray-500 hover:text-lime-700 font-semibold transition duration-200"
          >
            About Us
          </Link>
          {isLoggedIn ? (
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["hover"]}
              placement="bottom"
              overlayStyle={{ minWidth: "90px", textAlign: "center" }}
            >
              <Avatar
                size={40}
                icon={<UserOutlined />}
                className="cursor-pointer"
              />
            </Dropdown>
          ) : (
            <Link
              to="/login"
              className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition duration-200"
            >
              Login
            </Link>
          )}
        </nav>

        <div className="lg:hidden">
          <Dropdown
            menu={{
              items: [
                { key: "about", label: <Link to="/about">About Us</Link> },
                { key: "services", label: <Link to="/services">Services</Link> },
                { key: "therapists", label: <Link to="/therapists">Therapists</Link> },
                { key: "blog", label: <Link to="/blog">Blog & News</Link> },
                ...menuItems,
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MenuOutlined className="text-xl text-gray-600" />}
              className="p-0"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
