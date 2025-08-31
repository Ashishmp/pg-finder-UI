import React, { createContext, useContext, useState } from 'react';
import { INITIAL_PGS } from '../utils/constants';

const PgDataContext = createContext();

export const usePgData = () => {
  const context = useContext(PgDataContext);
  if (!context) {
    throw new Error('usePgData must be used within a PgDataProvider');
  }
  return context;
};

export const PgDataProvider = ({ children }) => {
  const [pgs, setPgs] = useState(INITIAL_PGS);
  const [favorites, setFavorites] = useState([]);

  const addPg = (pgData) => {
    const newPg = {
      id: pgs.length + 1,
      ...pgData,
      rating: 0,
      createdAt: new Date().toISOString()
    };
    setPgs(prev => [...prev, newPg]);
    return newPg;
  };

  const deletePg = (pgId) => {
    setPgs(prev => prev.filter(pg => pg.id !== pgId));
    setFavorites(prev => prev.filter(id => id !== pgId));
  };

  const updatePg = (pgId, updates) => {
    setPgs(prev => prev.map(pg => 
      pg.id === pgId ? { ...pg, ...updates } : pg
    ));
  };

  const toggleFavorite = (pgId) => {
    setFavorites(prev => 
      prev.includes(pgId) 
        ? prev.filter(id => id !== pgId)
        : [...prev, pgId]
    );
  };

  const getPgsByOwner = (ownerEmail) => {
    return pgs.filter(pg => pg.ownerEmail === ownerEmail);
  };

  const getFavoritePgs = () => {
    return pgs.filter(pg => favorites.includes(pg.id));
  };

  const searchPgs = (searchTerm, filterType = 'all') => {
    return pgs.filter(pg => {
      const matchesSearch = pg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pg.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || pg.type.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  };

  const value = {
    pgs,
    favorites,
    addPg,
    deletePg,
    updatePg,
    toggleFavorite,
    getPgsByOwner,
    getFavoritePgs,
    searchPgs
  };

  return (
    <PgDataContext.Provider value={value}>
      {children}
    </PgDataContext.Provider>
  );
};