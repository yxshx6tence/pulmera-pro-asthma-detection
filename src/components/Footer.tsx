import React from 'react';
import { Stethoscope } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4">
          <Stethoscope className="w-12 h-12 mx-auto text-blue-400 mb-4" />
        </div>
        <p className="text-gray-300 mb-2">
          © 2025 Pulmera Pro by Team Pulmonova. This tool is for educational purposes only.
        </p>
        <p className="text-gray-400 text-sm">
          Always consult with healthcare professionals for medical concerns.
        </p>
      </div>
    </footer>
  );
};

export default Footer;