import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContexts";
import Sidebar from "../Dashboard/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons

const createAssessment = async (assessmentData) => {
  const { token } = assessmentData;
  const response = await axios.post(
    "http://localhost:5000/api/assessments",
    {
      title: assessmentData.title,
      description: assessmentData.description,
      course: assessmentData.course,
      type: assessmentData.type,
      userId: assessmentData.userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const CreateAssessment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token, userData } = useAuth(); // Retrieve token and user data from AuthContext

  const mutation = useMutation({
    mutationFn: (assessmentData) => createAssessment(assessmentData),
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setCourse("");
      setType("");
      setMessage({
        type: "success",
        content: "Assessment created successfully",
      });
    },
    onError: (error) => {
      console.error("Error creating assessment:", error);
      setMessage({ type: "error", content: "Error creating assessment" });
    },
  });

  useEffect(() => {
    if (message.content) {
      const timer = setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token || !userData) {
      console.error("User not authenticated");
      return;
    }

    mutation.mutate({
      title,
      description,
      course,
      type,
      token,
      userId: userData._id,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
            Create Assessment
          </h1>
        </div>

        {/* Heading visible on larger screens */}
        <h1 className="text-3xl font-semibold text-gray-800 hidden md:hidden lg:block pb-6">
          Create Assessment
        </h1>

        {/* Success/Error Message */}
        {message.content && (
          <div
            className={`mb-4 p-4 border rounded ${
              message.type === "error"
                ? "bg-red-100 text-red-600 border-red-300"
                : "bg-green-100 text-green-600 border-green-300"
            }`}
          >
            {message.content}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-md shadow-md"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 sm:text-base transition ease-in-out duration-150"
              placeholder="Enter assessment title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 sm:text-base transition ease-in-out duration-150"
              placeholder="Brief description of the assessment"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="course"
                className="block text-lg font-medium text-gray-700"
              >
                Course
              </label>
              <input
                type="text"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 sm:text-base transition ease-in-out duration-150"
                placeholder="Enter course name"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-lg font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 outline-none focus:border-blue-500 sm:text-base transition ease-in-out duration-150"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
                <option value="survey">Survey</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition ease-in-out duration-200"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Creating..." : "Create Assessment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssessment;
