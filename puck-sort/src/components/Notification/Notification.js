import React, { useEffect, useState } from 'react';

const Notification = ({ message, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    // Show the notification
    setIsVisible(true);
    setProgress(100);
    
    // Start the progress timer
    const duration = 2000; // 2 seconds
    const interval = 10; // Update every 10ms
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress - step;
        if (newProgress <= 0) {
          clearInterval(timer);
          setIsVisible(false);
          return 0;
        }
        return newProgress;
      });
    }, interval);
    
    return () => {
      clearInterval(timer);
    };
  }, [message]);
  
  if (!isVisible || !message) return null;
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="fas fa-check-circle"></i>;
      case 'error':
        return <i className="fas fa-exclamation-circle"></i>;
      case 'info':
        return <i className="fas fa-info-circle"></i>;
      case 'warning':
        return <i className="fas fa-exclamation-triangle"></i>;
      default:
        return <i className="fas fa-check-circle"></i>;
    }
  };

  return (
    <div className={`notification ${type}`}>
      <div className="iconContainer">
        <span className="icon">{getIcon()}</span>
      </div>
      <div className="content">
        <p className="message">{message}</p>
        <div className="progressBarContainer">
          <div 
            className="progressBar" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      <button 
        className="closeButton"
        onClick={() => setIsVisible(false)}
        aria-label="Close notification"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Notification;