import React, { useState, useEffect } from 'react';
import '../pricing/Pricing.scss';

const Pricing = () => {
  const [showForm, setShowForm] = useState(false);

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
        <img src="taf.gif" alt="Beta Program Banner" className="pricing__banner-image" />
      </div>
      <div className={`pricing__form-container ${showForm ? 'pricing__form-container--visible' : ''}`}>
        <form className="pricing__form">
          <h2 className="pricing__form-title">Luuna's Beta Program</h2>
          <div className="pricing__form-group">
            <label htmlFor="name" className="pricing__form-label">Name</label>
            <input type="text" id="name" className="pricing__form-input" />
          </div>
          <div className="pricing__form-group">
            <label htmlFor="email" className="pricing__form-label">Email</label>
            <input type="email" id="email" className="pricing__form-input" />
          </div>
          <div className="pricing__form-group">
            <label htmlFor="message" className="pricing__form-label">Tell us why you'd be an awesome beta tester</label>
            <textarea id="message" className="pricing__form-textarea"></textarea>
          </div>
          <button type="submit" className="pricing__form-button">Apply to join beta program</button>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
