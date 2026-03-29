import React, { useEffect, useState } from 'react';

const Notification = ({ message, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setIsVisible(true);
    setProgress(100);

    const duration = 2000;
    const interval = 10;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev - step;
        if (next <= 0) {
          clearInterval(timer);
          setIsVisible(false);
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [message]);

  if (!isVisible || !message) return null;

  const iconMap = {
    success: 'fa-check-circle',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation'
  };

  return (
    <div className={`notification ${type}`}>
      <div className="iconContainer">
        <span className="icon">
          <i className={`fas ${iconMap[type] || iconMap.success}`}></i>
        </span>
      </div>
      <div className="content">
        <p className="message">{message}</p>
        <div className="progressBarContainer">
          <div className="progressBar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <button
        className="closeButton"
        onClick={() => setIsVisible(false)}
        aria-label="Close notification"
      >
        <i className="fas fa-xmark"></i>
      </button>
    </div>
  );
};

export default Notification;
