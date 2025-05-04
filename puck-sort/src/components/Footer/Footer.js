import React from 'react';
import styles from './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          &copy; {currentYear} PuckSort | Ball Hockey Team Management System
        </p>
        <div className={styles.links}>
          <a href="#terms" className={styles.link}>Terms</a>
          <a href="#privacy" className={styles.link}>Privacy</a>
          <a href="#help" className={styles.link}>Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;