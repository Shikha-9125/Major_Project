import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      required: true,
      default: 'student'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    // Profile Information
    profileImage: {
      type: String,
      default: null
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: null
    },
    dob: {
      type: Date,
      default: null
    },
    personalEmail: {
      type: String,
      default: null
    },
    mobile: {
      type: String,
      default: null
    },
    batch: {
      type: String,
      default: null
    },
    course: {
      type: String,
      default: 'B.Tech'
    },
    branch: {
      type: String,
      default: 'ELECTRICAL ENGINEERING'
    },
    cgpa: {
      type: Number,
      default: null
    },
    tenthPercentage: {
      type: Number,
      default: null
    },
    twelfthPercentage: {
      type: Number,
      default: null
    },
    activeBacklogs: {
      type: Boolean,
      default: false
    },
    backlogsHistory: {
      type: Boolean,
      default: false
    },
    activeBacklogCount: {
      type: Number,
      default: 0
    },
    debarred: {
      type: Boolean,
      default: false
    },
    linkedIn: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    // Additional fields for placed students
    company: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: ''
    },
    yearOfPlacement: {
      type: Number,
      default: null
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
