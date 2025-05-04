import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="content">
        <p className="copyright">
          &copy; {currentYear} PuckSort | Ball Hockey Team Management System
        </p>
        <div className="links">
          <a href="#terms" className="link">Terms</a>
          <a href="#privacy" className="link">Privacy</a>
          <a href="#help" className="link">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;