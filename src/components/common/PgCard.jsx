import React from 'react';
import { MapPin, Star, Heart, Eye, Trash2 } from 'lucide-react';
import { usePgData } from '../../hooks/usePgData';

const PgCard = ({ pg, showActions = false, onViewDetails }) => {
  const { favorites, toggleFavorite, deletePg } = usePgData();

  const handleToggleFavorite = () => {
    toggleFavorite(pg.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this PG?')) {
      deletePg(pg.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={pg.image}
          alt={pg.title}
          className="w-full h-48 object-cover"
        />
        {!showActions && (
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              favorites.includes(pg.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorites.includes(pg.id) ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{pg.title}</h3>
          <span className="text-2xl font-bold text-blue-600">{pg.price}/mo</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{pg.location}</span>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(pg.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{pg.rating} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {pg.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(pg)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
          {showActions && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PgCard;