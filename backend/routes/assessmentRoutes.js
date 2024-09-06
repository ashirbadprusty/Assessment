// routes/assessmentRoutes.js
const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize.js");
const {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
} = require("../controllers/assessmentController");
const { protect } = require("../middlewares/authMiddleware.js");

router.post(
  "/",
  protect,
  authorize(["teacher"]), // Only teachers can create assessments
  createAssessment
);

router.get(
  "/",
  protect,
  authorize(["teacher", "student"]), // Both teachers and students can view assessments
  getAssessments
);

router.get(
  "/:id",
  protect,
  authorize(["teacher", "student"]), // Both teachers and students can view specific assessments
  getAssessmentById
);

router.put(
  "/:id",
  protect,
  authorize(["teacher"]), // Only teachers can update assessments
  updateAssessment
);

router.delete(
  "/:id",
  protect,
  authorize(["teacher"]), // Only teachers can delete assessments
  deleteAssessment
);

module.exports = router;
