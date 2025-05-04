import React from 'react';
import { TeamProvider } from './context/TeamContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <TeamProvider>
        <div className="app-container">
          <Header />
          <Dashboard />
          <Footer />
        </div>
      </TeamProvider>
    </ThemeProvider>
  );
};

export default App;