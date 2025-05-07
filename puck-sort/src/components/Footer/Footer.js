import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="content">
        <p className="copyright">
          <i className="far fa-copyright"></i> {currentYear} PuckSort | Hockey Team Management System
        </p>
        <div className="links">
          <a href="#terms" className="link">
            <i className="fas fa-file-contract"></i> Terms
          </a>
          <a href="#privacy" className="link">
            <i className="fas fa-user-shield"></i> Privacy
          </a>
          <a href="#help" className="link">
            <i className="fas fa-question-circle"></i> Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;