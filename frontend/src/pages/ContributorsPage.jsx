import React from 'react';
import { Linkedin, Phone, Mail, Instagram } from 'lucide-react';

const ContributorsPage = () => {
  const devTeam = [
    {
      name: 'Shikha Gupta',
      role: 'Full Stack Developer',
      batch: "EE'22",
      image: '/team/shikha.jpg',
      linkedin: 'https://www.linkedin.com/in/shikha9125/',
      phone: '9125138485',
      email: 'shikha@example.com',
    },
    {
      name: 'Banoth Gopichand',
      role: 'Backend Developer',
      batch: "EE'22",
      image: '/team/gopichand.jpg',
      linkedin: 'https://www.linkedin.com/in/gopichand-banothu-0594b2255/',
      phone: '9177090681',
      email: 'gopichand@example.com',
    },
    {
      name: 'Sudhakar Garg',
      role: 'Frontend Developer',
      batch: "EE'22",
      image: '/team/sudhakar.jpg',
      linkedin: '#',
      phone: '',
      email: 'sudhakar@example.com',
    },
    {
      name: 'Shubhi Gulati',
      role: 'UI/UX Designer',
      batch: "EE'22",
      image: '/team/shubhi.jpg',
      linkedin: '#',
      phone: '',
      email: 'shubhi@example.com',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Team <span className="text-blue-600">Members</span>
          </h1>
          <p className="text-lg text-gray-600">
            Meet the talented individuals{' '}
            <span className="text-blue-600 font-semibold">who make our team exceptional</span>
          </p>
        </div>

        {/* Team Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600">
            Developer Team
          </h2>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {devTeam.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              {/* Profile Image */}
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 to-blue-400 p-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/160?text=' + member.name.split(' ')[0];
                    }}
                  />
                </div>
              </div>

              {/* Name and Role */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{member.batch}</p>

              {/* Social Links */}
              <div className="flex justify-center space-x-3">
                {member.linkedin && member.linkedin !== '#' && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                  >
                    <Mail size={20} />
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                  >
                    <Phone size={20} />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-200"
                  >
                    <Instagram size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributorsPage;
