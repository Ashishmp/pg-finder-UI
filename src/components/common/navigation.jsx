import React, { useState } from 'react';
import { Home, Plus, Heart, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = ({ currentView, onViewChange }) => {
  const { user, logout, isOwner } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
  };

  const handleNavigation = (view) => {
    onViewChange(view);
    setShowMobileMenu(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Home className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">PG Finder</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isOwner && (
              <>
                <button
                  onClick={() => handleNavigation('user-dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'user-dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Find PGs
                </button>
                <button
                  onClick={() => handleNavigation('favorites')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'favorites' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Favorites
                </button>
              </>
            )}
            {isOwner && (
              <>
                <button
                  onClick={() => handleNavigation('owner-dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'owner-dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  My PGs
                </button>
                <button
                  onClick={() => handleNavigation('add-pg')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add PG
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 inline mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-gray-600"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {!isOwner && (
              <>
                <button
                  onClick={() => handleNavigation('user-dashboard')}
                  className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Find PGs
                </button>
                <button
                  onClick={() => handleNavigation('favorites')}
                  className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Favorites
                </button>
              </>
            )}
            {isOwner && (
              <>
                <button
                  onClick={() => handleNavigation('owner-dashboard')}
                  className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  My PGs
                </button>
                <button
                  onClick={() => handleNavigation('add-pg')}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add PG
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 inline mr-1" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;