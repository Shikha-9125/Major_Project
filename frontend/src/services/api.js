import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Experience API functions
export const experienceAPI = {
  // Create new experience
  create: async (experienceData) => {
    // Check if it's FormData (for file upload)
    const config = experienceData instanceof FormData ? {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } : {};
    
    const response = await api.post('/experiences', experienceData, config);
    return response.data;
  },

  // Get all experiences
  getAll: async () => {
    const response = await api.get('/experiences');
    return response.data;
  },

  // Get my experiences
  getMy: async () => {
    const response = await api.get('/experiences/my');
    return response.data;
  },

  // Delete experience
  delete: async (id) => {
    const response = await api.delete(`/experiences/${id}`);
    return response.data;
  },
};

// Placement Stats API functions
export const placementStatsAPI = {
  // Get all placement stats
  getAll: async () => {
    const response = await api.get('/placement-stats');
    return response.data;
  },

  // Get active batch stats
  getActive: async () => {
    const response = await api.get('/placement-stats/active');
    return response.data;
  },

  // Get stats by batch
  getByBatch: async (batch) => {
    const response = await api.get(`/placement-stats/${batch}`);
    return response.data;
  },

  // Create or update stats (Admin only)
  createOrUpdate: async (statsData) => {
    const response = await api.post('/placement-stats', statsData);
    return response.data;
  },

  // Delete stats (Admin only)
  delete: async (batch) => {
    const response = await api.delete(`/placement-stats/${batch}`);
    return response.data;
  },
};

export default api;
