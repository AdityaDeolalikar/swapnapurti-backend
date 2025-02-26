const express = require('express');
const router = express.Router();
const { registerStep1, registerStep2, login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Registration Step 1 route
router.post('/register/step1', registerStep1);

// Registration Step 2 route
router.post('/register/step2/:userId', registerStep2);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', protect, logout);

module.exports = router; 