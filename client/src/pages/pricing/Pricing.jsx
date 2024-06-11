import React, { useState, useEffect } from 'react';
import HomeGif from "../../assets/images/taf.gif";
import BetaBanner from "../../assets/images/Beta Banner.gif"
import { useNavigate } from 'react-router-dom';
import '../pricing/Pricing.scss';

const Pricing = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setShowForm(true);
      } else {
        setShowForm(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="pricing">
      <div className="pricing__banner">
        <img src={HomeGif} alt="Beta Program Banner" className="pricing__banner-image" />
      </div>
      <div className={`pricing__form-container ${showForm ? 'pricing__form-container--visible' : ''}`}>
        <form className="pricing__form">
          <h2 className="pricing__form-title">Becoming a ThrivingAF Insider</h2>
          <div className="pricing__form-group">
            <label htmlFor="name" className="pricing__form-label">Your Name</label>
            <input type="name" id="name" className="pricing__form-input" />
          </div>
          <div className="pricing__form-group">
            <label htmlFor="email" className="pricing__form-label">Early Access Granted to which Email?</label>
            <input type="email" id="email" className="pricing__form-input" />
          </div>
          <div className="pricing__form-group">
            <label htmlFor="message" className="pricing__form-label">Tell us why you'd be an awesome beta tester</label>
            <textarea id="message" className="pricing__form-textarea"></textarea>
          </div>
          <button type="submit" className="pricing__form-button" onClick={() => navigate('/')}>Activate Thrive Mode</button>
        </form>
      </div>
      <div className="pricing__info-section">
        <img src={BetaBanner} alt="Info Section Banner" className="pricing__info-image" />
      </div>
    </div>
  );
};

export default Pricing;
