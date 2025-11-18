import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Search, Bell, BookOpen, Users, MessageCircle, LogOut, User } from 'lucide-react';

const StudentDashboard = () => {
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

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search seniors, companies, experiences..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
              </button>
              
              <div className="flex items-center space-x-3">
                <div>
                  <span className="text-white font-medium">{user?.name}</span>
                  <div>
                    <span className="text-blue-400 text-xs font-medium">{user?.role}</span>
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
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-gray-300">
            Find placement guidance from your seniors and get started with your job search.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Search className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Find Seniors</h3>
                <p className="text-gray-400 text-sm">Search by company or role</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <BookOpen className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Read Experiences</h3>
                <p className="text-gray-400 text-sm">Browse placement stories</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <MessageCircle className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Connect Direct</h3>
                <p className="text-gray-400 text-sm">Message seniors directly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Companies */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Popular Companies</h3>
            <div className="space-y-3">
              {['Google', 'Microsoft', 'Amazon', 'Adobe', 'Flipkart'].map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-white">{company}</span>
                  <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 20) + 5} seniors</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Experiences */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Experiences</h3>
            <div className="space-y-3">
              {[
                { name: 'Rahul Sharma', company: 'Google', role: 'SDE-1' },
                { name: 'Priya Singh', company: 'Microsoft', role: 'Program Manager' },
                { name: 'Amit Kumar', company: 'Amazon', role: 'SDE-2' },
                { name: 'Sneha Patel', company: 'Adobe', role: 'UI/UX Designer' },
              ].map((exp, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <User className="text-gray-900" size={16} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{exp.name}</p>
                    <p className="text-gray-400 text-sm">{exp.role} at {exp.company}</p>
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

export default StudentDashboard;