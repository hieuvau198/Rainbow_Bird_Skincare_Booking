import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Avatar, Button } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import logOut from "../../modules/Logout";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const menuItems = isLoggedIn
    ? [
        {
          key: "profile",
          label: <Link className="text-md" to="/profile">Profile</Link>,
        },
        {
          key: "schedule",
          label: <Link className="text-md" to="/schedule">Schedule</Link>,
        },
        {
          key: "logout",
          danger: true,
          label: (
            <span
              className="text-md"
              onClick={() => {
                logOut();
              }}
            >
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
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-lime-600">
            LOGO
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6">
          <Link to="/about" className="text-gray-600 hover:text-lime-600 transition duration-200">
            About Us
          </Link>
          <Link to="/services" className="text-gray-600 hover:text-lime-600 transition duration-200">
            Services
          </Link>
          <Link to="/therapists" className="text-gray-600 hover:text-lime-600 transition duration-200">
            Therapists
          </Link>
          <Link to="/news" className="text-gray-600 hover:text-lime-600 transition duration-200">
            Blog & News
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
                src="https://via.placeholder.com/150"
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