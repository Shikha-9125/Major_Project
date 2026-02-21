import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Background images array
  const backgroundImages = [
    'https://v1.nitj.ac.in/ITEP/img/01.jpg',
    'https://ctp.nitj.ac.in/_DSC0092.jpg',
    'https://nitj.ac.in/files/1710350960606-WhatsApp%20Image%202024-03-13%20at%206.04.37%20PM.jpeg',
    'https://nitj.ac.in/files/1686204105750-IMG_20230608_112803.jpg'
  ];

  // Auto-rotate background images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-between px-4 py-6">
        
        {/* NITJ Logo */}
        <div className="mt-2">
          <img 
            src="https://www.nitj.ac.in/public/assets/images/logo_250.png" 
            alt="NITJ Logo" 
            className="w-24 h-24 md:w-28 md:h-28 object-contain filter drop-shadow-2xl"
          />
        </div>
        
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto -mt-8">
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight drop-shadow-2xl">
            Welcome to{' '}
            <span className="text-blue-400">
              E-SPARK
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base md:text-xl text-blue-300 mb-4 font-semibold drop-shadow-lg">
            Electrical Society for Progression, Academic Research & Knowledge
          </p>
          
          {/* Taglines */}
          <p className="text-sm md:text-lg text-gray-200 mb-2 drop-shadow-md">
            "Unlocking Potential, Creating Success"
          </p>
          <p className="text-xs md:text-base text-gray-300 mb-6 drop-shadow-md">
            "Strong industry connections and professional growth."
          </p>
          
          {/* CTA Button */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-3 bg-white/90 hover:bg-white text-blue-900 font-bold text-base md:text-lg rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-400"
          >
            Get In
          </button>
        </div>
        
        {/* Feature Cards Section */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto w-full px-4 mb-4">
          
          {/* Card 01 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-3 md:p-4 hover:bg-white/20 transition-all duration-300 shadow-2xl">
            <div className="text-blue-400 text-lg md:text-2xl font-bold mb-1 md:mb-2">01</div>
            <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2">STUDENT HUB</h3>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed hidden md:block">
              Central hub for students and resources.
            </p>
          </div>

          {/* Card 02 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-3 md:p-4 hover:bg-white/20 transition-all duration-300 shadow-2xl">
            <div className="text-blue-400 text-lg md:text-2xl font-bold mb-1 md:mb-2">02</div>
            <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2">DEPARTMENT INFO</h3>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed hidden md:block">
              Comprehensive department information.
            </p>
          </div>

          {/* Card 03 */}
          <div 
            onClick={() => navigate('/contributors')}
            className="bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-3 md:p-4 hover:bg-white/20 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            <div className="text-blue-400 text-lg md:text-2xl font-bold mb-1 md:mb-2">03</div>
            <h3 className="text-white text-sm md:text-lg font-semibold mb-1 md:mb-2">CONTRIBUTORS</h3>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed hidden md:block">
              Meet the team behind this portal.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mb-2">
          <p className="text-gray-300 text-xs md:text-sm drop-shadow-md">
            Dr. B R Ambedkar National Institute of Technology Jalandhar
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Electrical Engineering Department
          </p>
        </div>
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default LandingPage;