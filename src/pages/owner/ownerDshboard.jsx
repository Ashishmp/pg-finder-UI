import React from 'react';
import { Plus, Building, Users, Eye, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePgData } from '../../hooks/usePgData';
import Navigation from '../../components/common/navigation';
import PgCard from '../../components/common/PgCard';

const OwnerDashboard = ({ onViewChange, onSelectPg }) => {
  const { user } = useAuth();
  const { getPgsByOwner } = usePgData();
  const ownerPgs = getPgsByOwner(user.email);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView="owner-dashboard" onViewChange={onViewChange} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My PG Properties</h1>
            <p className="text-gray-600">Manage your paying guest accommodations</p>
          </div>
          <button
            onClick={() => onViewChange('add-pg')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New PG
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{ownerPgs.length}</h3>
                <p className="text-gray-600">Total Properties</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 50) + 20}</h3>
                <p className="text-gray-600">Total Inquiries</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 500) + 100}</h3>
                <p className="text-gray-600">Total Views</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">₹{Math.floor(Math.random() * 100000) + 50000}</h3>
                <p className="text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* PG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownerPgs.map(pg => (
            <PgCard 
              key={pg.id} 
              pg={pg} 
              showActions={true}
              onViewDetails={onSelectPg}
            />
          ))}
        </div>

        {ownerPgs.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Added</h3>
            <p className="text-gray-600 mb-4">Start by adding your first PG property</p>
            <button
              onClick={() => onViewChange('add-pg')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First PG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;