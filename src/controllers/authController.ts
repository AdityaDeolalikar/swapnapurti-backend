import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppRequestHandler } from "../common/types/request";
import AppError from "../core/errors/app-error";
// Register Step 1
export const registerStep1: AppRequestHandler<
  unknown,
  any,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { fullName, email, gender, mobile } = req.body;

    // Check if user already exists with email or mobile
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile }],
    });

    if (existingUser) {
      throw new AppError(
        existingUser.email === email.toLowerCase()
          ? "Email already registered"
          : "Mobile number already registered",
        400
      );
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      gender,
      mobile,
      registrationStep: 1,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Step 1 registration successful",
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        mobile: user.mobile,
        registrationStep: user.registrationStep,
      },
    });
  } catch (error) {
    console.error("Registration Step 1 Error:", error);
    next(error);
  }
};

// Register Step 2
export const registerStep2: AppRequestHandler<
  unknown,
  any,
  unknown,
  { userId: string }
> = async (req, res, next) => {
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
      password,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Check if step 1 is completed
    if (user.registrationStep !== 1) {
      throw new AppError("Invalid registration step", 400);
    }

    // Validate emergency mobile is different from primary mobile
    if (emergencyMobile === user.mobile) {
      throw new AppError(
        "Emergency contact must be different from primary mobile number",
        400
      );
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
      message: "Registration completed successfully",
      data: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        registrationStep: user.registrationStep,
      },
    });
  } catch (error) {
    console.error("Registration Step 2 Error:", error);
    next(error);
  }
};

// Login
export const login: AppRequestHandler<unknown, any, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // Check if registration is complete
    if (user.registrationStep !== 2) {
      throw new AppError("Registration is not complete", 400);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString() },
      //@ts-ignore
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          photo: user.photo,
        },
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    next(error);
  }
};

// Logout
export const logout: AppRequestHandler = async (req, res, next) => {
  try {
    // Since we're using JWT, we don't need to do anything on the server
    // The client will remove the token
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    next(error);
  }
};
