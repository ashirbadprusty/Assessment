// routes/testRoutes.js
const express = require('express');
const router = express.Router();

// Sample GET endpoint
router.get('/',(req,res)=>{
    res.send('Welcome to the Server')
});

router.get('/status', (req, res) => {
  res.status(200).json({ message: 'Server is running fine!' });
});

module.exports = router;
