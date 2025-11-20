import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Camera, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProfilePage = ({ onProfileUpdate }) => {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    gender: '',
    dob: '',
    personalEmail: '',
    mobile: '',
    batch: '',
    course: 'B.Tech',
    branch: 'ELECTRICAL ENGINEERING',
    cgpa: '',
    tenthPercentage: '',
    twelfthPercentage: '',
    activeBacklogs: false,
    backlogsHistory: false,
    activeBacklogCount: 0,
    debarred: false,
    linkedIn: '',
    address: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const userData = response.data.user;
        setProfileData({
          name: userData.name || '',
          gender: userData.gender || '',
          dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '',
          personalEmail: userData.personalEmail || '',
          mobile: userData.mobile || '',
          batch: userData.batch || '',
          course: userData.course || 'B.Tech',
          branch: userData.branch || 'ELECTRICAL ENGINEERING',
          cgpa: userData.cgpa || '',
          tenthPercentage: userData.tenthPercentage || '',
          twelfthPercentage: userData.twelfthPercentage || '',
          activeBacklogs: userData.activeBacklogs || false,
          backlogsHistory: userData.backlogsHistory || false,
          activeBacklogCount: userData.activeBacklogCount || 0,
          debarred: userData.debarred || false,
          linkedIn: userData.linkedIn || '',
          address: userData.address || ''
        });
        
        if (userData.profileImage) {
          setImagePreview(`http://localhost:5000${userData.profileImage}`);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== null && profileData[key] !== '') {
          formData.append(key, profileData[key]);
        }
      });
      
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success('Profile updated successfully! 🎉');
        setIsEditing(false);
        fetchProfile();
        if (refreshUser) refreshUser();
        if (onProfileUpdate) onProfileUpdate(); // Notify parent to refresh profile image
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const InfoItem = ({ label, value }) => (
    <div className="flex items-start space-x-3 p-3">
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-blue-600">{label}</p>
        <p className="text-base text-gray-800 mt-1">{value || 'Not provided'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section with Profile Image */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100">
                  <User className="w-16 h-16 text-blue-600" />
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-100 transition-colors">
                <Camera className="w-5 h-5 text-blue-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mt-4">{profileData.name || user?.name}</h1>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Information */}
      {!isEditing ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Name" value={profileData.name} />
            <InfoItem label="CGPA" value={profileData.cgpa} />
            <InfoItem label="Gender" value={profileData.gender} />
            <InfoItem label="10th %" value={profileData.tenthPercentage} />
            <InfoItem label="DOB" value={profileData.dob} />
            <InfoItem label="12th %" value={profileData.twelfthPercentage} />
            <InfoItem label="Email" value={user?.email} />
            <InfoItem label="Active Backlogs" value={profileData.activeBacklogs ? 'Yes' : 'No'} />
            <InfoItem label="Personal Email" value={profileData.personalEmail} />
            <InfoItem label="Backlogs History" value={profileData.backlogsHistory ? 'Yes' : 'No'} />
            <InfoItem label="Mobile" value={profileData.mobile} />
            <InfoItem label="Active Backlog Count" value={profileData.activeBacklogCount} />
            <InfoItem label="Batch" value={profileData.batch} />
            <InfoItem label="Debarred" value={profileData.debarred ? 'Yes' : 'No'} />
            <InfoItem label="Course" value={profileData.course} />
            <InfoItem label="LinkedIn" value={profileData.linkedIn} />
            <InfoItem label="Branch" value={profileData.branch} />
            <InfoItem label="Address" value={profileData.address} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profileData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personal Email</label>
              <input
                type="email"
                name="personalEmail"
                value={profileData.personalEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={profileData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
              <input
                type="text"
                name="batch"
                placeholder="e.g., 2026"
                value={profileData.batch}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <input
                type="text"
                name="course"
                value={profileData.course}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={profileData.branch}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CGPA</label>
              <input
                type="number"
                step="0.01"
                name="cgpa"
                value={profileData.cgpa}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">10th %</label>
              <input
                type="number"
                step="0.01"
                name="tenthPercentage"
                value={profileData.tenthPercentage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">12th %</label>
              <input
                type="number"
                step="0.01"
                name="twelfthPercentage"
                value={profileData.twelfthPercentage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Backlog Count</label>
              <input
                type="number"
                name="activeBacklogCount"
                value={profileData.activeBacklogCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                name="linkedIn"
                value={profileData.linkedIn}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="activeBacklogs"
                checked={profileData.activeBacklogs}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">Active Backlogs</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="backlogsHistory"
                checked={profileData.backlogsHistory}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">Backlogs History</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="debarred"
                checked={profileData.debarred}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">Debarred</label>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
