import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContexts'; // Import the AuthContext for token
import Sidebar from '../Dashboard/Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons

// Fetch assessment detail
const fetchAssessmentDetail = async (id, token) => {
  const { data } = await axios.get(`http://localhost:5000/api/assessments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const AssessmentDetail = () => {
  const { id } = useParams(); // Get the assessment ID from the URL
  const { token } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar visibility

  const { data: assessment, isLoading, error } = useQuery({
    queryKey: ['assessment', id],
    queryFn: () => fetchAssessmentDetail(id, token),
    enabled: !!token && !!id, // Only fetch if token and id are available
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Error fetching assessment detail</p>;

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 lg:relative lg:w-64 bg-gray-800 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block lg:w-64`}
      >
        <Sidebar />
      </div>

      {/* Close Button */}
      {isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-6 left-2 text-white lg:hidden z-50"
        >
          <FaTimes className="w-8 h-8" />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 p-6 lg:p-12 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        {/* Hamburger Menu */}
        <div className="lg:hidden flex justify-between items-center mb-6 p-4 bg-gray-800">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-semibold text-white">
            Assessment Detail
          </h1>
        </div>

        {/* Heading visible on larger screens */}
        <h1 className="text-3xl font-semibold text-gray-800 hidden lg:block pb-6">
          Assessment Detail
        </h1>

        <div className="bg-white p-8 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-4">{assessment.title}</h1>
          <p className="text-sm text-gray-500 mb-2">
            Created on: {new Date(assessment.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-4">Course: {assessment.course}</p>
          <p className="text-lg text-gray-700">{assessment.description}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetail;
