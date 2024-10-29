
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaSyncAlt,
  FaBell,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";
import Logout from "./Logout"; 

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [showTooltip, setShowTooltip] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
   
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  }, []);

  const handleMouseEnter = (tooltip) => {
    setShowTooltip(tooltip);
  };

  const handleMouseLeave = () => {
    setShowTooltip("");
    setShowUserDetails(false);
  };

  const handleUserHover = () => {
    setShowUserDetails(true);
  };

  const handleLogoutClick = () => {
    <Logout />; 
  };

  return (
    <div className="relative flex flex-col items-center w-16 h-screen py-2 space-y-8 text-white bg-gray-800 font-serif">

      <div
        onMouseEnter={handleUserHover}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <FaUser size={20} className="mt-8" />
        {showUserDetails && userDetails && (
          <div className="absolute top-0 px-3 py-1 text-sm text-white bg-gray-700 rounded-md shadow-lg left-20 w-80">
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Number:</strong> {userDetails.number}
            </p>
          </div>
        )}
      </div>

      <div
        onMouseEnter={() => handleMouseEnter("Settings")}
        onMouseLeave={handleMouseLeave}
      >
        <FaCog size={20} />
        {showTooltip === "Settings" && (
          <div className="absolute px-3 py-1 text-sm text-white bg-gray-700 rounded-md left-20">
            Settings
          </div>
        )}
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Sync")}
        onMouseLeave={handleMouseLeave}
      >
        <FaSyncAlt size={20} />
        {showTooltip === "Sync" && (
          <div className="absolute px-3 py-1 text-sm text-white bg-gray-700 rounded-md left-20">
            Sync
          </div>
        )}
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Notifications")}
        onMouseLeave={handleMouseLeave}
      >
        <FaBell size={20} />
        {showTooltip === "Notifications" && (
          <div className="absolute px-3 py-1 text-sm text-white bg-gray-700 rounded-md left-20">
            Notifications
          </div>
        )}
      </div>
      <div
        onMouseEnter={() => handleMouseEnter("Change Password")}
        onMouseLeave={handleMouseLeave}
      >
        <FaKey size={20} className="cursor-pointer " />
        {showTooltip === "Change Password" && (
          <div className="absolute w-auto px-3 py-1 text-sm text-white bg-gray-700 rounded-md cursor-pointer left-20">
            ChangePassword
          </div>
        )}
      </div>

    
      <div
        onMouseEnter={() => handleMouseEnter("Logout")}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/logout"
          className="flex items-center px-4 py-2 transition-colors duration-300 rounded-md hover:bg-blue-600"
        >
          <FaSignOutAlt
            size={20}
            onClick={handleLogoutClick}
            className="cursor-pointer "
          />
        </Link>
        {showTooltip === "Logout" && (
          <div className="absolute px-3 py-1 text-sm text-white bg-gray-700 rounded-md cursor-pointer left-20">
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
