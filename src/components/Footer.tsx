import React from 'react';
import { Youtube, Facebook, Globe, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-eduwarn-blue dark:bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Made with love */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-gray-300">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className="text-gray-300">by</span>
            <span className="font-semibold text-amber-400">EduWarn Nepal</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a
              href="https://youtube.com/@eduwarnnepal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500 transition-colors duration-200"
              aria-label="YouTube Channel"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a
              href="https://facebook.com/eduwarnnepal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors duration-200"
              aria-label="Facebook Page"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://eduwarn.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-500 transition-colors duration-200"
              aria-label="Official Website"
            >
              <Globe className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © 2025 EduWarn Nepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;