import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logOut from "../../modules/Logout";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const menuItems = [
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
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-28 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" target="_top" className="text-2xl font-bold text-blue-600">
            LOGO
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            Services
          </Link>
          <Link
            to="/therapists"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            Therapists
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            Blog & News
          </Link>

          {isLoggedIn ? (
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["hover"]}
              placement="bottom"
              overlayStyle={{
                minWidth: "90px",
                textAlign: "center",
              }}
              openClassName="ant-dropdown-open"
            >
              <Avatar
                size={50}
                src="https://randomuser.me/api/portraits/men/75.jpg"
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
      </div>
    </header>
  );
}