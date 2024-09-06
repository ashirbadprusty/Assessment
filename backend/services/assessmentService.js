// assessmentService.js
const Assessment = require('../models/assessmentModel');

// Create a new assessment
const createAssessment = async (title, description, course, type, userId) => {
  try {
    const assessment = await Assessment.create({
      title,
      description,
      course,
      type,
      createdBy: userId, // Correct field name
    });
    return assessment;
  } catch (error) {
    console.error("Error in createAssessmentService:", error); // Log any potential errors
    throw error;
  }
};



// Get all assessments for a user
const getAssessments = async (userId) => {
  try {
    // Query the database to find assessments created by the user
    const assessments = await Assessment.find({ createdBy: userId });
    return assessments;
  } catch (error) {
    console.error('Error in getAssessmentsService:', error); // Log any potential errors
    throw error; // Rethrow error to be handled by the controller
  }
};


// Get a specific assessment by ID
const getAssessmentById = async (assessmentId) => {
  const assessment = await Assessment.findById(assessmentId);
  return assessment;
};

// Update an assessment
const updateAssessment = async (assessmentId, title, description, course, type) => {
  const assessment = await Assessment.findById(assessmentId);

  if (assessment) {
    assessment.title = title || assessment.title;
    assessment.description = description || assessment.description;
    assessment.course = course || assessment.course;
    assessment.type = type || assessment.type;
    const updatedAssessment = await assessment.save();
    return updatedAssessment;
  } else {
    return null;
  }
};

// Delete an assessment
const deleteAssessment = async (assessmentId) => {
  try {
    const result = await Assessment.deleteOne({ _id: assessmentId });
    return result.deletedCount > 0; // Returns true if a document was deleted
  } catch (error) {
    console.error('Error in deleteAssessmentService:', error);
    throw error; // Rethrow error to be handled by the controller
  }
};


module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
};
