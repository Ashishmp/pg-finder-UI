import React, { useState } from 'react';
import { Search, Filter, Building, Heart, MapPin } from 'lucide-react';
import { usePgData } from '../../hooks/usePgData';
import Navigation from '../../components/common/navigation';
import PgCard from '../../components/common/PgCard';
import { FILTER_OPTIONS } from '../../utils/constants';

const UserDashboard = ({ onViewChange, onSelectPg }) => {
  const { pgs, favorites, searchPgs } = usePgData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredPgs = searchPgs(searchTerm, filterType);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView="user-dashboard" onViewChange={onViewChange} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect PG</h1>
          <p className="text-gray-600">Discover comfortable and affordable paying guest accommodations</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location or PG name..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {FILTER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{filteredPgs.length}</h3>
                <p className="text-gray-600">Available PGs</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{favorites.length}</h3>
                <p className="text-gray-600">Favorites</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">5+</h3>
                <p className="text-gray-600">Cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* PG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPgs.map(pg => (
            <PgCard 
              key={pg.id} 
              pg={pg} 
              onViewDetails={onSelectPg}
            />
          ))}
        </div>

        {filteredPgs.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No PGs Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;