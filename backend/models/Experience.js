import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    // Reference to user who shared
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    // Personal Info
    name: {
      type: String,
      required: true,
      trim: true
    },
    batch: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    
    // Company Info
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    companyType: {
      type: String,
      enum: ['core', 'non-core'],
      required: true
    },
    package: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    
    // Interview Process
    interviewRounds: {
      type: String,
      required: true
    },
    technicalQuestions: {
      type: String,
      default: ''
    },
    hrQuestions: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    
    // Contact Info (optional)
    phone: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    
    // Engagement metrics
    likes: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true 
  }
);

// Index for faster queries
experienceSchema.index({ companyName: 1, createdAt: -1 });
experienceSchema.index({ user: 1 });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
