import React, { useState, useEffect } from 'react';
import { placementStatsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Save, X, CheckCircle, Building2, Briefcase } from 'lucide-react';

const ManageStatsPage = () => {
  const [allStats, setAllStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBatch, setEditingBatch] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    batch: '',
    companiesVisited: 0,
    studentsPlaced: 0,
    averagePackage: 0,
    highestPackage: 0,
    isActive: false,
    coreCompanies: [],
    nonCoreCompanies: [],
  });
  const [newCoreCompany, setNewCoreCompany] = useState('');
  const [newNonCoreCompany, setNewNonCoreCompany] = useState('');

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const data = await placementStatsAPI.getAll();
      setAllStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.batch) {
      toast.error('Batch is required');
      return;
    }

    try {
      await placementStatsAPI.createOrUpdate(formData);
      toast.success('Statistics updated successfully! 🎉');
      setShowAddForm(false);
      setEditingBatch(null);
      setFormData({
        batch: '',
        companiesVisited: 0,
        studentsPlaced: 0,
        averagePackage: 0,
        highestPackage: 0,
        isActive: false,
        coreCompanies: [],
        nonCoreCompanies: [],
      });
      setNewCoreCompany('');
      setNewNonCoreCompany('');
      fetchAllStats();
    } catch (error) {
      console.error('Error saving stats:', error);
      toast.error(error.response?.data?.message || 'Failed to save statistics');
    }
  };

  const handleEdit = (stats) => {
    setFormData({
      batch: stats.batch,
      companiesVisited: stats.companiesVisited,
      studentsPlaced: stats.studentsPlaced,
      averagePackage: stats.averagePackage,
      highestPackage: stats.highestPackage,
      isActive: stats.isActive,
      coreCompanies: stats.coreCompanies || [],
      nonCoreCompanies: stats.nonCoreCompanies || [],
    });
    setEditingBatch(stats.batch);
    setShowAddForm(true);
  };

  const handleDelete = async (batch) => {
    if (!confirm(`Are you sure you want to delete statistics for batch ${batch}?`)) {
      return;
    }

    try {
      await placementStatsAPI.delete(batch);
      toast.success('Statistics deleted successfully');
      fetchAllStats();
    } catch (error) {
      console.error('Error deleting stats:', error);
      toast.error(error.response?.data?.message || 'Failed to delete statistics');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingBatch(null);
    setFormData({
      batch: '',
      companiesVisited: 0,
      studentsPlaced: 0,
      averagePackage: 0,
      highestPackage: 0,
      isActive: false,
      coreCompanies: [],
      nonCoreCompanies: [],
    });
    setNewCoreCompany('');
    setNewNonCoreCompany('');
  };

  const addCoreCompany = () => {
    if (newCoreCompany.trim() && !formData.coreCompanies.includes(newCoreCompany.trim())) {
      setFormData(prev => ({
        ...prev,
        coreCompanies: [...prev.coreCompanies, newCoreCompany.trim()]
      }));
      setNewCoreCompany('');
    }
  };

  const removeCoreCompany = (company) => {
    setFormData(prev => ({
      ...prev,
      coreCompanies: prev.coreCompanies.filter(c => c !== company)
    }));
  };

  const addNonCoreCompany = () => {
    if (newNonCoreCompany.trim() && !formData.nonCoreCompanies.includes(newNonCoreCompany.trim())) {
      setFormData(prev => ({
        ...prev,
        nonCoreCompanies: [...prev.nonCoreCompanies, newNonCoreCompany.trim()]
      }));
      setNewNonCoreCompany('');
    }
  };

  const removeNonCoreCompany = (company) => {
    setFormData(prev => ({
      ...prev,
      nonCoreCompanies: prev.nonCoreCompanies.filter(c => c !== company)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Placement Statistics</h1>
          <p className="text-gray-600 mt-1">Update placement data for different batches</p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add New Batch</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {editingBatch ? `Edit Statistics for ${editingBatch}` : 'Add New Batch Statistics'}
            </h2>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Batch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  placeholder="e.g., 2022-2026"
                  disabled={!!editingBatch}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  required
                />
              </div>

              {/* Companies Visited */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Companies Visited
                </label>
                <input
                  type="number"
                  name="companiesVisited"
                  value={formData.companiesVisited}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Students Placed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Students Placed
                </label>
                <input
                  type="number"
                  name="studentsPlaced"
                  value={formData.studentsPlaced}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Average Package */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Package (LPA)
                </label>
                <input
                  type="number"
                  name="averagePackage"
                  value={formData.averagePackage}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Highest Package */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highest Package (LPA)
                </label>
                <input
                  type="number"
                  name="highestPackage"
                  value={formData.highestPackage}
                  onChange={handleInputChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Active Batch */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  id="isActive"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-3 text-sm font-medium text-gray-700">
                  Set as Current/Active Batch
                </label>
              </div>
            </div>

            {/* Company Management Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Manage Companies</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add companies manually that will appear in the "Companies Visited" section. 
                These will be combined with companies from student experiences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Companies */}
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Briefcase size={20} className="text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Core Companies</h4>
                  </div>
                  
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={newCoreCompany}
                      onChange={(e) => setNewCoreCompany(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoreCompany())}
                      placeholder="Enter company name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      type="button"
                      onClick={addCoreCompany}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.coreCompanies.map((company, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{company}</span>
                        <button
                          type="button"
                          onClick={() => removeCoreCompany(company)}
                          className="hover:text-blue-900"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.coreCompanies.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No core companies added yet</p>
                    )}
                  </div>
                </div>

                {/* Non-Core Companies */}
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Building2 size={20} className="text-green-600" />
                    <h4 className="font-semibold text-gray-800">Non-Core Companies</h4>
                  </div>
                  
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={newNonCoreCompany}
                      onChange={(e) => setNewNonCoreCompany(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNonCoreCompany())}
                      placeholder="Enter company name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <button
                      type="button"
                      onClick={addNonCoreCompany}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.nonCoreCompanies.map((company, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        <span>{company}</span>
                        <button
                          type="button"
                          onClick={() => removeNonCoreCompany(company)}
                          className="hover:text-green-900"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.nonCoreCompanies.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No non-core companies added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={20} />
                <span>{editingBatch ? 'Update' : 'Save'} Statistics</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats List */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Existing Statistics</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading statistics...
          </div>
        ) : allStats.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No statistics found. Add your first batch statistics above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Companies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students Placed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Highest Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allStats.map((stats) => (
                  <tr key={stats.batch} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{stats.batch}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stats.companiesVisited}+</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stats.studentsPlaced}+</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stats.averagePackage} LPA</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{stats.highestPackage} LPA</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {stats.isActive ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          <span className="text-xs font-semibold">Active</span>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(stats)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(stats.batch)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Set one batch as "Active" to display it by default on the home page</li>
          <li>• Use format "YYYY-YYYY" for batch names (e.g., 2022-2026)</li>
          <li>• Only admins can update placement statistics</li>
          <li>• Changes will be reflected immediately on the home page</li>
        </ul>
      </div>
    </div>
  );
};

export default ManageStatsPage;
