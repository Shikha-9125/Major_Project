import React from 'react';
import { Building2, Briefcase, DollarSign, Calendar, Award, Phone, Mail, Linkedin, Trash2 } from 'lucide-react';

const ExperienceCard = ({ experience, isMyExperience = false, onDelete, currentUser }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCompanyTypeColor = (type) => {
    return type === 'core' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 flex items-center">
              <Building2 className="mr-2" size={20} />
              {experience.companyName}
            </h3>
            <p className="text-blue-100 text-sm flex items-center">
              <Briefcase className="mr-1" size={14} />
              {experience.role}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCompanyTypeColor(experience.companyType)}`}>
              {experience.companyType === 'core' ? 'Core' : 'Non-Core'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(experience.difficulty)}`}>
              {experience.difficulty.charAt(0).toUpperCase() + experience.difficulty.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Personal Info */}
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="font-semibold text-gray-700">{experience.name}</span>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-gray-600">{experience.department}</span>
            </div>
            <span className="text-gray-500 flex items-center">
              <Calendar size={14} className="mr-1" />
              {experience.batch}
            </span>
          </div>
        </div>

        {/* Package */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
            <DollarSign className="text-green-600" size={20} />
            <div>
              <p className="text-xs text-gray-600">Package</p>
              <p className="text-lg font-bold text-green-700">{experience.package}</p>
            </div>
          </div>
        </div>

        {/* Interview Rounds */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Award className="mr-1" size={16} />
            Interview Process
          </h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {experience.interviewRounds}
          </p>
        </div>

        {/* Technical Questions */}
        {experience.technicalQuestions && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Technical Questions</h4>
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg whitespace-pre-wrap">
              {experience.technicalQuestions}
            </p>
          </div>
        )}

        {/* HR Questions */}
        {experience.hrQuestions && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">HR Questions</h4>
            <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg whitespace-pre-wrap">
              {experience.hrQuestions}
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips & Advice</h4>
          <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg whitespace-pre-wrap">
            {experience.tips}
          </p>
        </div>

        {/* Contact Info */}
        {(experience.phone || experience.email || experience.linkedin) && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
            <div className="flex flex-wrap gap-2">
              {experience.phone && (
                <a
                  href={`tel:${experience.phone}`}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                >
                  <Phone size={14} />
                  <span>{experience.phone}</span>
                </a>
              )}
              {experience.email && (
                <a
                  href={`mailto:${experience.email}`}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
                >
                  <Mail size={14} />
                  <span>{experience.email}</span>
                </a>
              )}
              {experience.linkedin && (
                <a
                  href={experience.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Delete Button (only for own experiences) */}
        {(isMyExperience || currentUser?.role === 'admin') && onDelete && (
          <div className="pt-4 mt-4 border-t border-gray-100">
            <button
              onClick={() => onDelete(experience._id)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete Experience</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer with timestamp */}
      <div className="bg-gray-50 px-5 py-3 text-xs text-gray-500">
        Shared on {new Date(experience.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
};

export default ExperienceCard;
