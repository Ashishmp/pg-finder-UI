import React from 'react';
import { X, MapPin, Star, User, Phone, Mail, Building, Heart } from 'lucide-react';
import { usePgData } from '../../hooks/usePgData';

const PgDetailsModal = ({ pg, onClose }) => {
  const { favorites, toggleFavorite } = usePgData();

  const handleToggleFavorite = () => {
    toggleFavorite(pg.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="relative">
          <img
            src={pg.image}
            alt={pg.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{pg.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{pg.location}</span>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(pg.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{pg.rating} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 mb-2">{pg.price}/mo</div>
              <div className="text-sm text-gray-600">{pg.type} Room</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{pg.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {pg.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">{pg.owner}</div>
                  <div className="text-sm text-gray-600">Property Owner</div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">{pg.phone}</div>
                  <div className="text-sm text-gray-600">Call for inquiries</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">{pg.email}</div>
                  <div className="text-sm text-gray-600">Send email</div>
                </div>
              </div>
              <div className="flex items-center">
                <Building className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">{pg.availability}</div>
                  <div className="text-sm text-gray-600">Availability Status</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Phone className="w-5 h-5 inline mr-2" />
              Call Owner
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium">
              <Mail className="w-5 h-5 inline mr-2" />
              Send Message
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                favorites.includes(pg.id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Heart className={`w-5 h-5 inline mr-2 ${favorites.includes(pg.id) ? 'fill-current' : ''}`} />
              {favorites.includes(pg.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgDetailsModal;