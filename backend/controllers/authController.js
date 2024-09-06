const { createUser, validateUser, generateToken,   } = require('../services/authService');
const User = require('../models/userModel');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate role
    if (!['teacher', 'student'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Create user
    const user = await createUser(name, email, password, role);

    // Respond with user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Authenticate user and get token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate user credentials
    const user = await validateUser(email, password);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Respond with user data and token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Get logged-in user profile
const getUserProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    // Fetch user profile
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user profile
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
