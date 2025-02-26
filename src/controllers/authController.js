const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Step 1
exports.registerStep1 = async (req, res) => {
  try {
    const { fullName, email, gender, mobile } = req.body;

    // Check if user already exists with email or mobile
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { mobile }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email.toLowerCase() 
          ? 'Email already registered' 
          : 'Mobile number already registered'
      });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      gender,
      mobile,
      registrationStep: 1
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Step 1 registration successful',
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        mobile: user.mobile,
        registrationStep: user.registrationStep
      }
    });
  } catch (error) {
    console.error('Registration Step 1 Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Register Step 2
exports.registerStep2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      dateOfBirth,
      bloodGroup,
      permanentAddress,
      temporaryAddress,
      district,
      occupation,
      organization,
      photo,
      emergencyMobile,
      password
    } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if step 1 is completed
    if (user.registrationStep !== 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid registration step'
      });
    }

    // Validate emergency mobile is different from primary mobile
    if (emergencyMobile === user.mobile) {
      return res.status(400).json({
        success: false,
        message: 'Emergency contact must be different from primary mobile number'
      });
    }

    // Update user with step 2 data
    user.dateOfBirth = new Date(dateOfBirth);
    user.bloodGroup = bloodGroup;
    user.permanentAddress = permanentAddress;
    user.temporaryAddress = temporaryAddress;
    user.district = district;
    user.occupation = occupation;
    user.organization = organization;
    user.photo = photo;
    user.emergencyMobile = emergencyMobile;
    user.password = password;
    user.registrationStep = 2;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Registration completed successfully',
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        registrationStep: user.registrationStep
      }
    });
  } catch (error) {
    console.error('Registration Step 2 Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if registration is complete
    if (user.registrationStep !== 2) {
      return res.status(400).json({
        success: false,
        message: 'Please complete your registration first'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          photo: user.photo
        }
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // Since we're using JWT, we don't need to do anything on the server
    // The client will remove the token
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}; 