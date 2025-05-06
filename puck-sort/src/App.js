import React from 'react';
import { TeamProvider } from './context/TeamContext';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import './components/CSS/application.css';

const App = () => {
  return (
    <TeamProvider>
      <div className="app-container">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </TeamProvider>
  );
};

export default App;