// analyticsService.js
const ActivityLog = require('../models/ActivityLog');

// Log an activity
const logActivity = async (action, userId, description) => {
  const activity = await ActivityLog.create({
    action,
    user: userId,
    description,
  });

  return activity;
};

// Generate a report of activities
const generateActivityReport = async (userId) => {
  const activities = await ActivityLog.find({ user: userId }).sort({ createdAt: -1 });
  return activities;
};

module.exports = {
  logActivity,
  generateActivityReport,
};
