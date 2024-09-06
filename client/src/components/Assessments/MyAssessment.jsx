import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../Dashboard/Sidebar';

// Fetch all assessments
const fetchAssessments = async (token) => {
  const { data } = await axios.get('http://localhost:5000/api/assessments', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Edit assessment API call
const editAssessment = async ({ id, token, updatedData }) => {
  await axios.put(`http://localhost:5000/api/assessments/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete assessment API call
const deleteAssessment = async ({ id, token }) => {
  await axios.delete(`http://localhost:5000/api/assessments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const MyAssessment = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryKey = ['assessments'];
  const { data: assessments = [], isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchAssessments(token),
    enabled: !!token,
  });

  // State for managing assessments and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [selectedAssessment, setSelectedAssessment] = useState(null); // Selected assessment
  const assessmentsPerPage = 4;

  // Mutation for deleting assessments
  const deleteMutation = useMutation({
    mutationFn: deleteAssessment,
    onSuccess: () => {
      // Refetch assessments after deletion
      queryClient.invalidateQueries(queryKey);
    },
  });

  // Mutation for editing assessments
  const editMutation = useMutation({
    mutationFn: editAssessment,
    onSuccess: () => {
      // Refetch assessments after edit
      queryClient.invalidateQueries(queryKey);
      closeModal(); // Close modal on success
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading assessments</p>;

  // Filter and sort assessments
  const filteredAssessments = assessments
    .filter((assessment) =>
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((assessment) =>
      filterType ? assessment.type === filterType : true
    );

  const sortedAssessments = filteredAssessments.sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === 'popularity') {
      return b.popularity - a.popularity;
    } else if (sortOption === 'completion') {
      return b.completionRate - a.completionRate;
    } else {
      return 0;
    }
  });

  const indexOfLastAssessment = currentPage * assessmentsPerPage;
  const indexOfFirstAssessment = indexOfLastAssessment - assessmentsPerPage;
  const currentAssessments = sortedAssessments.slice(indexOfFirstAssessment, indexOfLastAssessment);

  const totalPages = Math.ceil(sortedAssessments.length / assessmentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      deleteMutation.mutate({ id, token });
    }
  };

  // Open modal and set selected assessment
  const handleEdit = (assessment) => {
    setSelectedAssessment(assessment);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssessment(null);
  };

  // Handle form submit in modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      title: e.target.title.value,
      description: e.target.description.value,
      course: e.target.course.value,
      type: e.target.type.value,
    };
    editMutation.mutate({ id: selectedAssessment._id, token, updatedData });
  };

  return (
    <div className="relative h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 lg:relative lg:w-64 bg-gray-800 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-30 lg:translate-x-0 lg:block lg:w-64`}
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
        className={`flex-1 flex flex-col p-6 lg:p-10 transition-all duration-300 overflow-hidden ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        {/* Hamburger Menu for small screens */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-gray-800">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">My Assessments</h1>
        </div>

        <h1 className="text-2xl font-bold mb-4 hidden lg:block">My Assessments</h1>

        {/* Search Bar and Filters */}
        <div className="relative mb-4 mt-2 flex flex-col lg:flex-row lg:justify-between lg:items-center lg:space-x-4">
          <div className="relative mb-4 lg:mb-0 flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assessments by title..."
              className="w-full p-2 pl-10 border rounded focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex space-x-4 lg:space-x-8">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 border rounded focus:border-blue-500 outline-none"
            >
              <option value="">Filter by Type</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
              <option value="survey">Survey</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded focus:border-blue-500 outline-none"
            >
              <option value="">Sort by</option>
              <option value="date">Date (Newest First)</option>
              <option value="popularity">Popularity</option>
              <option value="completion">Completion Rate</option>
            </select>
          </div>
        </div>

        <div className="flex-grow space-y-4 overflow-auto">
          {currentAssessments.length > 0 ? (
            currentAssessments.map((assessment) => (
              <div key={assessment._id} className="p-4 border rounded shadow-sm flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    <Link to={`/assessments/${assessment._id}`} className="text-blue-500 hover:underline">
                      {assessment.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500">Created on: {new Date(assessment.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Course: {assessment.course}</p>
                  <p className="text-sm text-gray-500">Type: {assessment.type}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(assessment)}
                    // className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(assessment._id)}
                    // className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No assessments found</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded mx-1 ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* Modal for editing assessment */}
        {isModalOpen && selectedAssessment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Edit Assessment</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedAssessment.title}
                    className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedAssessment.description}
                    className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Course</label>
                  <input
                    type="text"
                    name="course"
                    defaultValue={selectedAssessment.course}
                    className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Type</label>
                  <select
                    name="type"
                    defaultValue={selectedAssessment.type}
                    className="w-full p-2 border rounded focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                    <option value="survey">Survey</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssessment;
