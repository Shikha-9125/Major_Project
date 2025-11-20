import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { placementStatsAPI, experienceAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Award,
  BookOpen,
  Target,
  Sparkles,
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Building2
} from 'lucide-react';

function HomePage({ onShareExperience, onViewExperiences }) {
  const { user } = useAuth();
  const [allBatches, setAllBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);

  useEffect(() => {
    fetchAllBatches();
    fetchPlacedStudents();
  }, []);

  // Refetch data when component becomes visible (when user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchAllBatches();
        fetchPlacedStudents();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (selectedBatch) {
      fetchBatchStats(selectedBatch);
    }
  }, [selectedBatch]);

  // Auto-rotate placed students every 3 seconds (based on filtered students)
  useEffect(() => {
    if (!selectedBatch || placedStudents.length === 0) return;
    
    const batchYear = selectedBatch.split('-')[0];
    const filteredCount = placedStudents.filter(student => 
      student.batch && student.batch.toString().startsWith(batchYear)
    ).length;
    
    if (filteredCount > 0) {
      const interval = setInterval(() => {
        setCurrentStudentIndex((prev) => (prev + 1) % filteredCount);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [placedStudents, selectedBatch]);

  const fetchAllBatches = async () => {
    try {
      const data = await placementStatsAPI.getAll();
      setAllBatches(data);
      
      // Set active batch as default, or first batch
      const activeBatch = data.find(b => b.isActive) || data[0];
      if (activeBatch) {
        setSelectedBatch(activeBatch.batch);
        setStats(activeBatch);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching batches:', error);
      // Set default stats if no data
      setStats({
        companiesVisited: 45,
        studentsPlaced: 180,
        averagePackage: 8.5,
        highestPackage: 42,
      });
      setLoading(false);
    }
  };

  const fetchBatchStats = async (batch) => {
    try {
      const data = await placementStatsAPI.getByBatch(batch);
      setStats(data);
    } catch (error) {
      console.error('Error fetching batch stats:', error);
      toast.error('Failed to fetch batch statistics');
    }
  };

  const fetchPlacedStudents = async () => {
    try {
      const data = await experienceAPI.getAll();
      // Get experiences with company placements
      const students = (data.experiences || []).filter(exp => exp.companyName);
      setPlacedStudents(students);
    } catch (error) {
      console.error('Error fetching placed students:', error);
    }
  };

  // Filter students by selected batch
  const getFilteredStudents = () => {
    if (!selectedBatch || placedStudents.length === 0) return [];
    
    // Extract year from batch format "2022-2026" -> "2022"
    const batchYear = selectedBatch.split('-')[0];
    
    // Filter students whose batch matches the selected batch year
    return placedStudents.filter(student => {
      if (!student.batch) return false;
      // Check if student's batch starts with the batch year
      return student.batch.toString().startsWith(batchYear);
    });
  };

  const statsDisplay = [
    { 
      icon: Briefcase, 
      label: 'Companies Visited', 
      value: stats ? `${stats.companiesVisited}+` : '0', 
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      icon: Users, 
      label: 'Students Placed', 
      value: stats ? `${stats.studentsPlaced}+` : '0', 
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      icon: Award, 
      label: 'Avg Package', 
      value: stats ? `${stats.averagePackage} LPA` : '0 LPA', 
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      icon: TrendingUp, 
      label: 'Highest Package', 
      value: stats ? `${stats.highestPackage} LPA` : '0 LPA', 
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ];

  const quickActions = [
    {
      title: 'Share Your Experience',
      description: 'Help others by sharing your placement journey',
      icon: Sparkles,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      action: 'Share Experience',
      onClick: onShareExperience
    },
    {
      title: 'Browse Experiences',
      description: 'Learn from others\' interview experiences',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      action: 'View Experiences',
      onClick: onViewExperiences
    },
    {
      title: 'Placement Resources',
      description: 'Access study materials and preparation guides',
      icon: Target,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      action: 'Coming Soon',
      onClick: null
    },
  ];

  // Get visible students for carousel (show 3 at a time) - filtered by batch
  const getVisibleStudents = () => {
    const filteredStudents = getFilteredStudents();
    if (filteredStudents.length === 0) return [];
    
    const visible = [];
    for (let i = 0; i < Math.min(3, filteredStudents.length); i++) {
      const index = (currentStudentIndex + i) % filteredStudents.length;
      visible.push(filteredStudents[index]);
    }
    return visible;
  };

  // Reset carousel index when batch changes
  useEffect(() => {
    setCurrentStudentIndex(0);
  }, [selectedBatch]);

  // Get companies by type for selected batch
  const getCompaniesByType = () => {
    const filteredStudents = getFilteredStudents();
    const coreCompanies = new Set();
    const nonCoreCompanies = new Set();

    // Add companies from student experiences
    filteredStudents.forEach(student => {
      if (student.companyName) {
        if (student.companyType === 'core') {
          coreCompanies.add(student.companyName);
        } else if (student.companyType === 'non-core') {
          nonCoreCompanies.add(student.companyName);
        }
      }
    });

    // Add manually added companies from placement stats
    if (stats) {
      if (stats.coreCompanies && Array.isArray(stats.coreCompanies)) {
        stats.coreCompanies.forEach(company => coreCompanies.add(company));
      }
      if (stats.nonCoreCompanies && Array.isArray(stats.nonCoreCompanies)) {
        stats.nonCoreCompanies.forEach(company => nonCoreCompanies.add(company));
      }
    }

    return {
      core: Array.from(coreCompanies).sort(),
      nonCore: Array.from(nonCoreCompanies).sort()
    };
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Sparkles className="w-8 h-8" />
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name}! 👋
          </h1>
        </div>
        <p className="text-blue-100 text-lg">
          Your journey to success starts here. Explore placement opportunities and connect with peers.
        </p>
      </div>

      {/* Batch Selector and Stats Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Placement Statistics</h2>
          {allBatches.length > 0 && (
            <div className="relative">
              <select
                value={selectedBatch || ''}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="appearance-none bg-white border-2 border-blue-500 text-gray-800 px-4 py-2 pr-10 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {allBatches.map((batch) => (
                  <option key={batch.batch} value={batch.batch}>
                    Batch: {batch.batch} {batch.isActive && '(Current)'}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={20} />
            </div>
          )}
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading statistics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsDisplay.map((stat, index) => (
              <div 
                key={index} 
                className={`${stat.bgColor} rounded-xl shadow p-6 hover:shadow-lg transition-shadow`}
              >
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.onClick}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 group ${action.onClick ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {action.description}
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                {action.action}
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placed Students Showcase */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
            Our Placed Students
          </div>
          {selectedBatch && getFilteredStudents().length > 0 && (
            <span className="text-sm font-normal bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              Batch: {selectedBatch} ({getFilteredStudents().length} Students)
            </span>
          )}
        </h2>
        
        {placedStudents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No placement records yet. Students will appear here after sharing their experiences!
          </div>
        ) : getFilteredStudents().length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No students from batch {selectedBatch} have shared their placement experiences yet.
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleStudents().map((student, index) => (
                <div
                  key={`${student._id}-${index}`}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  {/* Profile Image */}
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                      {student.profileImage ? (
                        <img 
                          src={`http://localhost:5000${student.profileImage}`}
                          alt={student.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<span class="text-3xl font-bold">${student.name?.charAt(0).toUpperCase() || 'S'}</span>`;
                          }}
                        />
                      ) : (
                        student.name?.charAt(0).toUpperCase() || 'S'
                      )}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {student.name}
                    </h3>
                    
                    {/* Batch */}
                    <div className="flex items-center justify-center mb-2">
                      <GraduationCap className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">
                        Batch: {student.batch || 'N/A'}
                      </span>
                    </div>

                    {/* Company */}
                    <div className="mt-3 bg-white rounded-lg p-3 shadow">
                      <div className="flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-semibold text-green-700">
                          Placed at
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-800 mt-1">
                        {student.companyName}
                      </p>
                      {student.package && (
                        <p className="text-sm text-purple-600 font-semibold mt-1">
                          {student.package} LPA
                        </p>
                      )}
                    </div>

                    {/* Role Badge */}
                    {student.role && (
                      <div className="mt-3">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {student.role}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            {getFilteredStudents().length > 3 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(getFilteredStudents().length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStudentIndex(index * 3)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      Math.floor(currentStudentIndex / 3) === index
                        ? 'bg-blue-600 w-6'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Companies Visited Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
          Companies Visited {selectedBatch && `- Batch ${selectedBatch}`}
        </h2>
        
        {getCompaniesByType().core.length === 0 && getCompaniesByType().nonCore.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No company data available for this batch yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Core Companies */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Core Companies</h3>
                  <p className="text-sm text-blue-600">Electrical Engineering</p>
                </div>
              </div>
              
              {getCompaniesByType().core.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No core companies yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {getCompaniesByType().core.map((company, index) => (
                    <div
                      key={index}
                      className="bg-white px-4 py-2 rounded-lg shadow-sm border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all"
                    >
                      <span className="text-sm font-semibold text-gray-800">{company}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm font-semibold text-blue-800">
                  Total: {getCompaniesByType().core.length} Core {getCompaniesByType().core.length === 1 ? 'Company' : 'Companies'}
                </p>
              </div>
            </div>

            {/* Non-Core Companies */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900">Non-Core Companies</h3>
                  <p className="text-sm text-green-600">IT, Consulting, etc.</p>
                </div>
              </div>
              
              {getCompaniesByType().nonCore.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No non-core companies yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {getCompaniesByType().nonCore.map((company, index) => (
                    <div
                      key={index}
                      className="bg-white px-4 py-2 rounded-lg shadow-sm border-2 border-green-200 hover:border-green-400 hover:shadow-md transition-all"
                    >
                      <span className="text-sm font-semibold text-gray-800">{company}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm font-semibold text-green-800">
                  Total: {getCompaniesByType().nonCore.length} Non-Core {getCompaniesByType().nonCore.length === 1 ? 'Company' : 'Companies'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
