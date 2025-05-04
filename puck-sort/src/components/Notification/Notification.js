import React, { useEffect, useState } from 'react';

const Notification = ({ message, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    // Show the notification
    setIsVisible(true);
    setProgress(100);
    
    // Start the progress timer
    const duration = 3000; // 3 seconds
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
    
    // Clean up
    return () => {
      clearInterval(timer);
    };
  }, [message]);
  
  if (!isVisible || !message) return null;
  
  // Get the appropriate icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '!';
      case 'info':
        return 'i';
      case 'warning':
        return '⚠';
      default:
        return '✓';
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
        ×
      </button>
    </div>
  );
};

export default Notification;