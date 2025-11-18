import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { inMemoryStore } from '../utils/inMemoryStore.js';

// Check if MongoDB is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header or cookie
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }

    try {
      // Verify token
      const jwtSecret = process.env.JWT_SECRET || 'default-jwt-secret-for-development-only';
      const decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
      
      // Get user from token
      let user;
      if (isMongoConnected()) {
        user = await User.findById(decoded.id);
      } else {
        user = inMemoryStore.findUserById(decoded.id);
      }
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no user found'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} is not authorized to access this resource`
      });
    }

    next();
  };
};

// Optional auth - doesn't require login but adds user if logged in
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const jwtSecret = process.env.JWT_SECRET || 'default-jwt-secret-for-development-only';
        const decoded = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
        
        if (isMongoConnected()) {
          req.user = await User.findById(decoded.id);
        } else {
          req.user = inMemoryStore.findUserById(decoded.id);
        }
      } catch (error) {
        // Token invalid but we don't block access
        console.log('Invalid token in optional auth:', error.message);
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    next();
  }
};