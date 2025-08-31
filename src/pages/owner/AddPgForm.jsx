import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePgData } from '../../hooks/usePgData';
import Navigation from '../../components/common/navigation';
import AddPgForm from '../../components/from/AddPgForm';

const AddPgPage = ({ onViewChange }) => {
  const { user } = useAuth();
  const { addPg } = usePgData();

  const handleSubmit = (formData) => {
    const pgData = {
      ...formData,
      owner: user.name || user.email.split('@')[0],
      ownerEmail: user.email,
      amenities: formData.amenities.split(',').map(item => item.trim()).filter(item => item),
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    };
    
    addPg(pgData);
    onViewChange('owner-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView="add-pg" onViewChange={onViewChange} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New PG Property</h1>
          
          <AddPgForm 
            onSubmit={handleSubmit}
            onCancel={() => onViewChange('owner-dashboard')}
            initialData={{ email: user.email }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPgPage;