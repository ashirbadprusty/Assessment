import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaPlusCircle,
  FaChartPie,
  FaHistory,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  return (
    <div className="w-72 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-lg">
      <div className="text-2xl font-bold p-6 bg-gradient-to-r from-blue-700 to-purple-600 text-center">
        My Dashboard
      </div>
      <nav className="flex-1 p-6">
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center p-3 text-lg font-semibold rounded-md transition-colors duration-200 ${
                  isActive ? " text-orange-400" : " hover:text-orange-400"
                }`
              }
            >
              <RxDashboard className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assessments/my-assessments"
              className={({ isActive }) =>
                `flex items-center p-3 text-lg font-semibold rounded-md transition-colors duration-200 ${
                  isActive ? " text-blue-400" : " hover:text-blue-400"
                }`
              }
            >
              <FaClipboardList className="mr-3" />
              My Assessments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assessments/create"
              className={({ isActive }) =>
                `flex items-center p-3 text-lg font-semibold rounded-md transition-colors duration-200 ${
                  isActive ? " text-green-400" : " hover:text-green-400"
                }`
              }
            >
              <FaPlusCircle className="mr-3" />
              Create Assessment
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/assessments/analytics"
              className={({ isActive }) =>
                `flex items-center p-3 text-lg font-semibold rounded-md transition-colors duration-200 ${
                  isActive ? " text-yellow-400" : " hover:text-yellow-400"
                }`
              }
            >
              <FaChartPie className="mr-3" />
              Assessment Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assessments/recent"
              className={({ isActive }) =>
                `flex items-center p-3 text-lg font-semibold rounded-md transition-colors duration-200 ${
                  isActive ? " text-red-400" : " hover:text-red-400"
                }`
              }
            >
              <FaHistory className="mr-3" />
              Recent Activities
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <div className="p-6 bg-gray-900 text-center text-sm">
        &copy; 2024 Your Name
      </div>
    </div>
  );
};

export default Sidebar;
