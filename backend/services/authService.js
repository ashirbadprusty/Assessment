const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePassword } = require('../utils/validation');

// Create a new user
const createUser = async (name, email, password, role) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format.');
  }

  if (!validatePassword(password)) {
    throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one symbol.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

// Validate user credentials
const validateUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    return null;
  }
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  createUser,
  validateUser,
  generateToken,
};
