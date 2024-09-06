// userRoutes.js
const express = require('express');
const {
  getUserById,
  updateUserProfile,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get a user by ID
router.get('/:id', protect, getUserById);

// Route to update user profile
router.put('/profile', protect, updateUserProfile);

// Route to delete a user
router.delete('/:id', protect, deleteUser);

module.exports = router;
