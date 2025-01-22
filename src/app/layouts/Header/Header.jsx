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
      <div className="container mx-auto px-36 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" target="_top" className="text-2xl font-bold text-lime-600">
            LOGO
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <Link
            to="/about"
            className="text-gray-600 hover:text-lime-600 transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-gray-600 hover:text-lime-600 transition duration-200"
          >
            Services
          </Link>
          <Link
            to="/therapists"
            className="text-gray-600 hover:text-lime-600 transition duration-200"
          >
            Therapists
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 hover:text-lime-600 transition duration-200"
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
                src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/270961679_10159870536636108_2642967668131478092_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFcKl-V6-IcsAMbuC15NFDdKmwUhI5YCb0qbBSEjlgJvWOpSKl3-IjxZpa8SmROKDGZI5ShY_7cnrfPXsHB02uw&_nc_ohc=QhTJECPW7ewQ7kNvgFpxoZD&_nc_oc=AdiKdtkmZPaeC1RldWIbW4sz3gtBi4r6rEFND-8S11k1Lgh1PUXog_vK_yfSyGQFjq4&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=ABnkf-_xQmKgrxvOCHEh5Dg&oh=00_AYDvtTwN6ZTh_SJRTjHsl_gci6R2mKkBoMOah8gZ78WBMA&oe=678EF957"
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