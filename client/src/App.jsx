import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { useAuth } from "./components/Contexts/AuthContexts";
import AssessmentDashboard from "./components/Dashboard/AssessmentDashboard";
import MyAssessment from "./components/Assessments/MyAssessment";
import CreateAssessment from "./components/Assessments/CreateAssessment";
import AssessmentAnalytics from "./components/Assessments/AssessmentAnalytics";
import RecentActivities from "./components/Assessments/RecentActivities";
import PrivateRoute from "./components/Common/PrivateRoute "; // Import the PrivateRoute component
import AssessmentDetail from "./components/Assessments/AssessmentDetail";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" />
              ) : (
                <AssessmentDashboard />
              )
            }
          />
          {/* Protected routes for teachers only */}
          <Route
            path="/assessments/my-assessments"
            element={
              <PrivateRoute element={<MyAssessment />} roles={['teacher']} />
            }
          />
          <Route
            path="/assessments/:id"
            element={
              <PrivateRoute element={<AssessmentDetail />} roles={['teacher']} />
            }
          />
          <Route
            path="/assessments/create"
            element={
              <PrivateRoute element={<CreateAssessment />} roles={['teacher']} />
            }
          />
          <Route
            path="/assessments/analytics"
            element={
              <PrivateRoute element={<AssessmentAnalytics />} roles={['teacher']} />
            }
          />
          <Route
            path="/assessments/recent"
            element={
              <PrivateRoute element={<RecentActivities />} roles={['teacher']} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
