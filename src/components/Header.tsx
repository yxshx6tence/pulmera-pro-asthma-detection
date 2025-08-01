import React from 'react';
import { Home, MessageCircle, Users, BookOpen, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // <-- This is where the import should be

// I'm assuming you had this import correct at the top.
// If not, make sure all your imports are at the very top.
// import { Home, MessageCircle, Users, BookOpen, ChevronDown } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle, path: '/feedback' },
    { id: 'team', label: 'Team', icon: Users, path: '/team' },
    { id: 'learn', label: 'Learn', icon: BookOpen, path: '/learn' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://img.icons8.com/external-ddara-lineal-color-ddara/64/external-lung-medical-ddara-lineal-color-ddara.png"
              alt="Pulmera Pro Logo"
              className="w-10 h-10 rounded-full object-cover bg-white"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Pulmera Pro</h1>
              <p className="text-sm text-gray-500">by Team Pulmonova</p>
            </div>
          </Link>

          {/* Navigation Bar */}
          <nav className="flex items-center space-x-8" aria-label="Main navigation">
            <ul className="flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Language Selector */}
            <div className="flex items-center space-x-2 ml-6">
              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                <span>US English</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}