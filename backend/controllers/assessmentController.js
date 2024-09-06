const {
  createAssessment: createAssessmentService,
  getAssessments: getAssessmentsService,
  getAssessmentById: getAssessmentByIdService,
  updateAssessment: updateAssessmentService,
  deleteAssessment: deleteAssessmentService,
} = require("../services/assessmentService");

// Create a new assessment
const createAssessment = async (req, res) => {
  const { title, description, course, type } = req.body;

  try {
    // Call service function to create assessment
    const assessment = await createAssessmentService(
      title,
      description,
      course,
      type,
      req.user._id
    );
    res.status(201).json(assessment);
  } catch (error) {
    console.error("Error in createAssessment:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

// Get all assessments
const getAssessments = async (req, res) => {
  try {
    // Call service function to get assessments
    const assessments = await getAssessmentsService(req.user._id);
    res.json(assessments);
  } catch (error) {
    console.error("Error in getAssessments controller:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

// Get a single assessment by ID
const getAssessmentById = async (req, res) => {
  try {
    // Call service function to get assessment by ID
    const assessment = await getAssessmentByIdService(req.params.id);

    if (assessment) {
      res.json(assessment);
    } else {
      res.status(404).json({ message: "Assessment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an assessment
const updateAssessment = async (req, res) => {
  const { title, description, course, type } = req.body;

  try {
    // Call service function to update assessment
    const updatedAssessment = await updateAssessmentService(
      req.params.id,
      title,
      description,
      course,
      type
    );

    if (updatedAssessment) {
      res.json(updatedAssessment);
    } else {
      res.status(404).json({ message: "Assessment not found" });
    }
  } catch (error) {
    console.error("Error in updateAssessment controller:", error); // Log the error for debugging

    res.status(500).json({ message: error.message });
  }
};

// Delete an assessment
const deleteAssessment = async (req, res) => {
  try {
    console.log("Deleting assessment with ID:", req.params.id); // Log the ID

    // Call service function to delete assessment
    const isDeleted = await deleteAssessmentService(req.params.id);

    if (isDeleted) {
      res.json({ message: "Assessment removed" });
    } else {
      res.status(404).json({ message: "Assessment not found" });
    }
  } catch (error) {
    console.error("Error in deleteAssessment controller:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
};
