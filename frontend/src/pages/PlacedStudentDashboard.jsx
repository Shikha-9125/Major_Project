import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Plus, Eye, Users, MessageSquare, LogOut, User, Award, Calendar, Building } from 'lucide-react';

const PlacedStudentDashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                Place<span className="text-yellow-400">mate</span>
              </h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div>
                  <span className="text-white font-medium">{user?.name}</span>
                  <div className="flex items-center space-x-1">
                    <Award className="text-yellow-400" size={14} />
                    <span className="text-yellow-400 text-xs font-medium">Mentor</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 🎉
          </h2>
          <p className="text-gray-300">
            Help juniors with your placement experience and guide them to success.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Experiences Shared</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Eye className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Students Helped</p>
                <p className="text-2xl font-bold text-white">27</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Users className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Messages</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <MessageSquare className="text-purple-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Profile Views</p>
                <p className="text-2xl font-bold text-white">156</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Eye className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6 hover:from-blue-500/20 hover:to-blue-600/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Plus className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Share Experience</h3>
                <p className="text-gray-400 text-sm">Add your placement story</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6 hover:from-green-500/20 hover:to-green-600/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <MessageSquare className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold">View Messages</h3>
                <p className="text-gray-400 text-sm">Reply to junior queries</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6 hover:from-purple-500/20 hover:to-purple-600/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <User className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Update Profile</h3>
                <p className="text-gray-400 text-sm">Edit your details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Placement Info */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Building className="mr-2 text-yellow-400" size={20} />
              My Placement Details
            </h3>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Company</span>
                  <span className="text-white font-medium">{user?.company || 'Not Updated'}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Position</span>
                  <span className="text-white font-medium">{user?.position || 'Not Updated'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Year</span>
                  <span className="text-white font-medium">{user?.yearOfPlacement || 'Not Updated'}</span>
                </div>
              </div>
              <button className="w-full py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors">
                Update Placement Info
              </button>
            </div>
          </div>

          {/* My Experiences */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">My Shared Experiences</h3>
            <div className="space-y-3">
              {[
                { title: 'Google SDE Interview Experience', views: 45, date: '2 days ago' },
                { title: 'Microsoft Internship Journey', views: 32, date: '1 week ago' },
                { title: 'Amazon Placement Tips & Tricks', views: 67, date: '2 weeks ago' },
              ].map((exp, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <h4 className="text-white font-medium mb-1">{exp.title}</h4>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <span className="flex items-center">
                      <Eye className="mr-1" size={14} />
                      {exp.views} views
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1" size={14} />
                      {exp.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
              + Add New Experience
            </button>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="mt-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Messages</h3>
            <div className="space-y-3">
              {[
                { name: 'Ankit Sharma', message: 'Hi! Can you share your Google interview experience?', time: '2 hours ago' },
                { name: 'Priya Verma', message: 'Thank you for the detailed Amazon experience post!', time: '5 hours ago' },
                { name: 'Rohit Kumar', message: 'Can we connect for guidance on DSA preparation?', time: '1 day ago' },
                { name: 'Neha Singh', message: 'Your Microsoft tips were really helpful!', time: '2 days ago' },
              ].map((msg, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-gray-900" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-medium">{msg.name}</p>
                      <span className="text-gray-400 text-xs">{msg.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlacedStudentDashboard;