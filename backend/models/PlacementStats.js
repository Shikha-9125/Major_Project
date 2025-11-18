import mongoose from 'mongoose';

const placementStatsSchema = new mongoose.Schema({
  batch: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // Format: "2022-2026"
  },
  companiesVisited: {
    type: Number,
    required: true,
    default: 0,
  },
  studentsPlaced: {
    type: Number,
    required: true,
    default: 0,
  },
  averagePackage: {
    type: Number,
    required: true,
    default: 0,
    // In LPA
  },
  highestPackage: {
    type: Number,
    required: true,
    default: 0,
    // In LPA
  },
  coreCompanies: {
    type: [String],
    default: [],
    // Manually added core companies
  },
  nonCoreCompanies: {
    type: [String],
    default: [],
    // Manually added non-core companies
  },
  isActive: {
    type: Boolean,
    default: true,
    // To mark current/active batch
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Index for faster queries
placementStatsSchema.index({ batch: 1 });
placementStatsSchema.index({ isActive: 1 });

const PlacementStats = mongoose.model('PlacementStats', placementStatsSchema);

export default PlacementStats;
