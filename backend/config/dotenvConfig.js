// dotenvConfig.js
const dotenv = require('dotenv');

const loadEnvConfig = () => {
  dotenv.config();

  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error('Missing necessary environment variables');
  }

  console.log('Environment variables loaded');
};

module.exports = loadEnvConfig;
