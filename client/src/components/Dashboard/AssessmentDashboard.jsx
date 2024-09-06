import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AssessmentAnalytics from '../Assessments/AssessmentAnalytics';
import RecentActivities from '../Assessments/RecentActivities';
import { Button } from 'antd';
import { useAuth } from '../Contexts/AuthContexts';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons

const AssessmentDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [activities, setActivities] = useState([
    'Created a new assessment on React',
    'Updated the assessment for Node.js',
    'Deleted the assessment for MongoDB'
  ]);
  const [analytics, setAnalytics] = useState([
    { title: 'Total Assessments', value: 10 },
    { title: 'Completed Assessments', value: 7 },
    { title: 'Pending Assessments', value: 3 },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Sidebar for lg screens and above */}
      <div
        className={`fixed inset-y-0 left-0 lg:relative lg:w-72 bg-gray-800 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block lg:w-72 z-30`}
      >
        <Sidebar />
      </div>

      {/* Close Button */}
      {isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-6 left-2 text-white lg:hidden z-40"
        >
          <FaTimes className="w-8 h-8" />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 p-6 lg:p-12 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-72" : ""
        }`}
      >
        {/* Hamburger Menu */}
        <div className="lg:hidden flex justify-between items-center mb-6 p-4 bg-gray-800 z-40">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Assessment Dashboard</h1>
          <Button
            size="large"
            type="primary"
            className="profile-btn"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Heading visible on larger screens */}
        <div className="hidden lg:flex justify-between items-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Assessment Dashboard
          </h1>
          <Button
            size="large"
            type="primary"
            className="profile-btn"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Assessment Analytics Section */}
        <AssessmentAnalytics analytics={analytics} />

        {/* Recent Activities Section */}
        <RecentActivities activities={activities} />

        {/* Add more content here if needed */}
      </div>
    </div>
  );
};

export default AssessmentDashboard;
