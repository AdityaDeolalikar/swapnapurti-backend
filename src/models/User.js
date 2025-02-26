const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Step 1 fields
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Step 2 fields
  dateOfBirth: {
    type: Date,
    required: false
  },
  bloodGroup: {
    type: String,
    required: false,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  permanentAddress: {
    type: String,
    required: false,
    trim: true
  },
  temporaryAddress: {
    type: String,
    required: false,
    trim: true
  },
  district: {
    type: String,
    required: false,
    trim: true
  },
  occupation: {
    type: String,
    required: false,
    trim: true
  },
  organization: {
    type: String,
    required: false,
    trim: true
  },
  photo: {
    type: String,
    required: false
  },
  emergencyMobile: {
    type: String,
    required: false,
    trim: true
  },
  password: {
    type: String,
    required: false
  },
  registrationStep: {
    type: Number,
    default: 1,
    enum: [1, 2]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model('User', userSchema); 