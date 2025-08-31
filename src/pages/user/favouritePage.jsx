import React from 'react';
import { Heart } from 'lucide-react';
import { usePgData } from '../../hooks/usePgData';
import Navigation from '../../components/common/navigation';
import PgCard from '../../components/common/PgCard';

const FavoritesPage = ({ onViewChange, onSelectPg }) => {
  const { getFavoritePgs } = usePgData();
  const favoritePgs = getFavoritePgs();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView="favorites" onViewChange={onViewChange} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600">Your saved PG accommodations</p>
        </div>

        {favoritePgs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritePgs.map(pg => (
              <PgCard 
                key={pg.id} 
                pg={pg} 
                onViewDetails={onSelectPg}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
            <p className="text-gray-600 mb-4">Start exploring and save your favorite PGs</p>
            <button
              onClick={() => onViewChange('user-dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse PGs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;