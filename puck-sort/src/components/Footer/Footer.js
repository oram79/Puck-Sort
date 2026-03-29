import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="content">
        <p className="copyright">
          <i className="far fa-copyright"></i> {currentYear} PuckSort
        </p>
        <div className="links">
          <a href="#terms" className="link">
            <i className="fas fa-file-lines"></i> Terms
          </a>
          <a href="#privacy" className="link">
            <i className="fas fa-shield-halved"></i> Privacy
          </a>
          <a href="#help" className="link">
            <i className="fas fa-circle-question"></i> Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
