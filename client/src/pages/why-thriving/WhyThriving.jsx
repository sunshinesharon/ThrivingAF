import React from 'react';
import FeatureGif from "../../assets/images/Features.gif"
import './WhyThriving.scss';

const WhyThriving = () => {
    return (
      <div className="why-thriving">
        <h1 className="why-thriving__header">Why Thriving?</h1>
        <div className="why-thriving__content">
          <div className="why-thriving__image-section">
            <img src={FeatureGif} alt="Creative Tools" className="why-thriving__image" />
          </div>
          <div className="why-thriving__text-section">
            <h2 className="why-thriving__title">Meet Your <span>ThrivingAF Sidekicks</span></h2>
            <p className="why-thriving__description">
              We're a team of passionate freelance cheerleaders who get the hustle and heart of the solopreneur life. We built Thriving because we believe every freelancer deserves to be Thriving AF – with the tools and strategies to land their dream clients.
              That's why we created Thriving as your all-in-one marketing assistant. Think of it as having a dedicated marketing team in your pocket – minus the hefty price tag!
              Our innovative platform offers a suite of features designed to help you build a rockstar brand and marketing strategy that gets results.
            </p>
            <button className="why-thriving__button" >Begin Thriving</button>
          </div>
        </div>
  
        <div className="product-overview">
        <div className="product-overview__left">
          <h2 className="product-overview__header">Freelancer Struggle? ThrivingAF is Here (AI-Powered!)</h2>
        </div>
        <div className="product-overview__right">
          <p className="product-overview__description">
          Feeling lost? Drowning in to-dos?  ThrivingAF is your freelance dream team (powered by AI!). We help you:
          </p>
          <div className="product-overview__sections">
            <div className="product-overview__section">
              <h3>Build a Magnetic Brand</h3>
              <ul>
                <li>No more generic profiles!</li>
                <li>Stand out from the crowd</li>
                <li>Craft a compelling presence</li>
                <li>Unique & Authentic You</li>
              </ul>
            </div>
            <div className="product-overview__section">
              <h3>Unleash Your Freelance Creativity</h3>
              <ul>
                <li>AI-powered Marketing Plan Crafter</li>
                <li>Maximize Marketing Impact</li>
                <li>Beat Writer's Block (AI-Powered)</li>
                <li>Speak to your Ideal Client</li>
              </ul>
            </div>
            <div className="product-overview__section">
              <h3>Make Smarter Moves with AI Insights</h3>
              <ul>
                <li>Uncover Industry Insights</li>
                <li>Optimize your strategy</li>
                <li>Continously Improve</li>
                <li>Track and Measure your progress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyThriving;
