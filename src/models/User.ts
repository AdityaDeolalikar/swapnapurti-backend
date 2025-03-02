import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { roles, TRoles } from "../constants/roles";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  gender: string;
  mobile: string;
  dateOfBirth: Date;
  bloodGroup: string;
  permanentAddress: string;
  temporaryAddress: string;
  district: string;
  occupation: string;
  organization: string;
  photo: string;
  emergencyMobile: string;
  password: string;
  registrationStep: number;
  isVerified: boolean;
  role: TRoles;
}

const userSchema = new mongoose.Schema<IUser>({
  // Step 1 fields
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Step 2 fields
  dateOfBirth: {
    type: Date,
    required: false,
  },
  bloodGroup: {
    type: String,
    required: false,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  permanentAddress: {
    type: String,
    required: false,
    trim: true,
  },
  temporaryAddress: {
    type: String,
    required: false,
    trim: true,
  },
  district: {
    type: String,
    required: false,
    trim: true,
  },
  occupation: {
    type: String,
    required: false,
    trim: true,
  },
  organization: {
    type: String,
    required: false,
    trim: true,
  },
  photo: {
    type: String,
    required: false,
  },
  emergencyMobile: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  registrationStep: {
    type: Number,
    default: 1,
    enum: [1, 2],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    enum: roles,
    // default: rolesEnum.PARTICIPANT,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next: any) {
  if (this.isModified("password")) {
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.pre(["findOneAndUpdate", "updateOne"], async function (next) {
  const update = this.getUpdate();
  //@ts-ignore
  const password = update?.["$set"]?.password || update?.password;
  if (password) {
    // @ts-ignore
    update.password = await bcrypt.hash(password, 12);
    delete update["$set"]?.password;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
