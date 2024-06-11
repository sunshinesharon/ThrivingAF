import React from 'react';
import './WhyThriving.scss';

const WhyThriving = () => {
  return (
    <div className="why-thriving">
      <h1 className="why-thriving__header">Why Thriving?</h1>
      <div className="why-thriving__content">
        <div className="why-thriving__image-section">
          <img src="path_to_image.png" alt="Creative Tools" className="why-thriving__image" />
        </div>
        <div className="why-thriving__text-section">
          <h2 className="why-thriving__title">Meet Your <span>ThrivingAF Sidekicks</span></h2>
          <p className="why-thriving__description">
          We're a team of passionate freelance cheerleaders who get the hustle and heart of the solopreneur life. We built Thriving because we believe every freelancer deserves to be Thriving AF – with the tools and strategies to land their dream clients.

That's why we created Thriving as your all-in-one marketing assistant.  Think of it as having a dedicated marketing team in your pocket –  minus the hefty price tag!

Our innovative platform offers a suite of features designed to help you build a rockstar brand and marketing strategy that gets results. 

          </p>
          <button className="why-thriving__button">Try Thriving</button>
        </div>
      </div>
    </div>
  );
};

export default WhyThriving;
