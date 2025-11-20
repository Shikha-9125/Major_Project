import React from 'react';
import { Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-2">
          <Code className="w-5 h-5 text-yellow-400" />
          <span className="text-sm">
            Developed by <span className="text-yellow-400 font-semibold">E-SPARK Portal Dev Team</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
