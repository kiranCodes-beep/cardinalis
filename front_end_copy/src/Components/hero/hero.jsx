import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';
import hand_icon from '../../Assets/hand_icon.png';
import arrow_icon from '../../Assets/arrow.png';
import hero_icon from '../../Assets/hero_icon.webp';

export const Hero = () => {
  const navigate = useNavigate();

  const goToCollections = () => {
    navigate('/latest-collections');
  };

  return (
    <div className="hero-container">
      <div className="hero">
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div className="hero-text-container">
            <div className="hand-icon">
              <p>new</p>
              <img src={hand_icon} alt="hand icon" />
            </div>
            <p className="hero-text">collections</p>
            <p className="hero-text">for everyone</p>
          </div>
          <button 
            className="hero-latest-btn"
            onClick={goToCollections}
          >
            <span>Latest Collections</span>
            <img src={arrow_icon} alt="arrow icon" />
          </button>
        </div>
        <div 
          className="hero-right" 
          onClick={goToCollections}
          style={{ cursor: 'pointer' }}
        >
          <img src={hero_icon} alt="hero banner" className="hero-image" />
        </div>
      </div>
    </div>
  );
};