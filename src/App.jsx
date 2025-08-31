import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { PgDataProvider } from './hooks/usePgData';
import MainApp from './components/mainApp';
import './styles/globals.css';

const App = () => {
  return (
    <AuthProvider>
      <PgDataProvider>
        <MainApp />
      </PgDataProvider>
    </AuthProvider>
  );
};

export default App;