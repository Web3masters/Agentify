import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import './Footer.css'; // Make sure to import the CSS file
import Line from '../../../../assets/Line1.png';

const Footer = () => {
  return (
    
    <footer className="footer">
      <img src={Line} className='line-image'/>
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-title">Agentify</h2>
          <p className="footer-description">
            Some random text here should be <br />
            placed, This is the font size and font <br />
            weight
          </p>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faInstagram} />
              <span>Link here</span>
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faFacebook} />
              <span>Link here</span>
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faDiscord} />
              <span>Link here</span>
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faTwitter} />
              <span>Link here</span>
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Link here</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
