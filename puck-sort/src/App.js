import React, { useState } from 'react';
import { TeamProvider } from './context/TeamContext';
import Landing from './components/Landing/Landing';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import './components/CSS/application.css';

const App = () => {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <TeamProvider>
      {showLanding ? (
        <Landing onEnter={() => setShowLanding(false)} />
      ) : (
        <div className="app-container">
          <Header onLogoClick={() => setShowLanding(true)} />
          <Dashboard />
          <Footer />
        </div>
      )}
    </TeamProvider>
  );
};

export default App;
