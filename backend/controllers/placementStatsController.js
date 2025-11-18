import PlacementStats from '../models/PlacementStats.js';
import mongoose from 'mongoose';
import { inMemoryStore } from '../utils/inMemoryStore.js';

// Check if MongoDB is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// In-memory storage for placement stats (fallback)
const placementStatsStore = [];

// Get all placement stats
export const getAllStats = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const stats = await PlacementStats.find()
        .sort({ batch: -1 })
        .populate('updatedBy', 'name email');
      
      // Ensure company arrays exist for all stats (backwards compatibility)
      const statsWithCompanies = stats.map(stat => {
        const statObj = stat.toObject();
        if (!statObj.coreCompanies) statObj.coreCompanies = [];
        if (!statObj.nonCoreCompanies) statObj.nonCoreCompanies = [];
        return statObj;
      });
      
      res.json(statsWithCompanies);
    } else {
      res.json(placementStatsStore);
    }
  } catch (error) {
    console.error('Error fetching placement stats:', error);
    res.status(500).json({ message: 'Failed to fetch placement statistics' });
  }
};

// Get stats for a specific batch
export const getStatsByBatch = async (req, res) => {
  try {
    const { batch } = req.params;
    
    if (isMongoConnected()) {
      const stats = await PlacementStats.findOne({ batch })
        .populate('updatedBy', 'name email');
      
      if (!stats) {
        return res.status(404).json({ message: 'Stats not found for this batch' });
      }
      
      // Ensure company arrays exist (for backwards compatibility with old documents)
      const statsObj = stats.toObject();
      if (!statsObj.coreCompanies) statsObj.coreCompanies = [];
      if (!statsObj.nonCoreCompanies) statsObj.nonCoreCompanies = [];
      
      res.json(statsObj);
    } else {
      const stats = placementStatsStore.find(s => s.batch === batch);
      if (!stats) {
        return res.status(404).json({ message: 'Stats not found for this batch' });
      }
      res.json(stats);
    }
  } catch (error) {
    console.error('Error fetching batch stats:', error);
    res.status(500).json({ message: 'Failed to fetch batch statistics' });
  }
};

// Get active/current batch stats
export const getActiveStats = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const stats = await PlacementStats.findOne({ isActive: true })
        .populate('updatedBy', 'name email');
      
      if (!stats) {
        return res.status(404).json({ message: 'No active batch found' });
      }
      
      res.json(stats);
    } else {
      const stats = placementStatsStore.find(s => s.isActive);
      if (!stats) {
        return res.status(404).json({ message: 'No active batch found' });
      }
      res.json(stats);
    }
  } catch (error) {
    console.error('Error fetching active stats:', error);
    res.status(500).json({ message: 'Failed to fetch active batch statistics' });
  }
};

// Create or update placement stats (Admin only)
export const createOrUpdateStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update placement statistics' });
    }

    const { batch, companiesVisited, studentsPlaced, averagePackage, highestPackage, isActive, coreCompanies, nonCoreCompanies } = req.body;

    // Validate required fields
    if (!batch) {
      return res.status(400).json({ message: 'Batch is required' });
    }

    if (isMongoConnected()) {
      // If setting as active, deactivate other batches
      if (isActive) {
        await PlacementStats.updateMany({}, { isActive: false });
      }

      // Find existing stats or create new
      let stats = await PlacementStats.findOne({ batch });

      if (stats) {
        // Update existing
        stats.companiesVisited = companiesVisited || stats.companiesVisited;
        stats.studentsPlaced = studentsPlaced || stats.studentsPlaced;
        stats.averagePackage = averagePackage || stats.averagePackage;
        stats.highestPackage = highestPackage || stats.highestPackage;
        stats.isActive = isActive !== undefined ? isActive : stats.isActive;
        stats.coreCompanies = coreCompanies || stats.coreCompanies;
        stats.nonCoreCompanies = nonCoreCompanies || stats.nonCoreCompanies;
        stats.updatedBy = req.user.id;
        await stats.save();
      } else {
        // Create new
        stats = await PlacementStats.create({
          batch,
          companiesVisited: companiesVisited || 0,
          studentsPlaced: studentsPlaced || 0,
          averagePackage: averagePackage || 0,
          highestPackage: highestPackage || 0,
          isActive: isActive || false,
          coreCompanies: coreCompanies || [],
          nonCoreCompanies: nonCoreCompanies || [],
          updatedBy: req.user.id,
        });
      }

      await stats.populate('updatedBy', 'name email');
      res.status(201).json(stats);
    } else {
      // In-memory store
      if (isActive) {
        placementStatsStore.forEach(s => s.isActive = false);
      }

      const existingIndex = placementStatsStore.findIndex(s => s.batch === batch);
      
      if (existingIndex >= 0) {
        // Update
        placementStatsStore[existingIndex] = {
          ...placementStatsStore[existingIndex],
          companiesVisited: companiesVisited || placementStatsStore[existingIndex].companiesVisited,
          studentsPlaced: studentsPlaced || placementStatsStore[existingIndex].studentsPlaced,
          averagePackage: averagePackage || placementStatsStore[existingIndex].averagePackage,
          highestPackage: highestPackage || placementStatsStore[existingIndex].highestPackage,
          isActive: isActive !== undefined ? isActive : placementStatsStore[existingIndex].isActive,
          coreCompanies: coreCompanies || placementStatsStore[existingIndex].coreCompanies,
          nonCoreCompanies: nonCoreCompanies || placementStatsStore[existingIndex].nonCoreCompanies,
          updatedBy: req.user.id,
          updatedAt: new Date(),
        };
        res.status(201).json(placementStatsStore[existingIndex]);
      } else {
        // Create
        const newStats = {
          _id: Date.now().toString(),
          batch,
          companiesVisited: companiesVisited || 0,
          studentsPlaced: studentsPlaced || 0,
          averagePackage: averagePackage || 0,
          highestPackage: highestPackage || 0,
          isActive: isActive || false,
          coreCompanies: coreCompanies || [],
          nonCoreCompanies: nonCoreCompanies || [],
          updatedBy: req.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        placementStatsStore.push(newStats);
        res.status(201).json(newStats);
      }
    }
  } catch (error) {
    console.error('Error creating/updating stats:', error);
    res.status(500).json({ message: 'Failed to update placement statistics' });
  }
};

// Delete placement stats (Admin only)
export const deleteStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete placement statistics' });
    }

    const { batch } = req.params;

    if (isMongoConnected()) {
      const stats = await PlacementStats.findOneAndDelete({ batch });
      
      if (!stats) {
        return res.status(404).json({ message: 'Stats not found' });
      }
      
      res.json({ message: 'Stats deleted successfully' });
    } else {
      const index = placementStatsStore.findIndex(s => s.batch === batch);
      
      if (index === -1) {
        return res.status(404).json({ message: 'Stats not found' });
      }
      
      placementStatsStore.splice(index, 1);
      res.json({ message: 'Stats deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting stats:', error);
    res.status(500).json({ message: 'Failed to delete placement statistics' });
  }
};
