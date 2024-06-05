import React from 'react';
import Header from './components/Header';
import AuthButton from './components/AuthButton';
import './App.scss';
import HomeImage from './assets/images/T.png'; // Ensure this path matches the actual location of the image

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <div className="app__image-section">
          <img src={HomeImage} alt="Team High Five" />
        </div>
        <div className="app__text-section">
          <h1 className="app__title">Hi, Freelancers!</h1>
          <p className="app__subtitle">Let's get your Marketing Plan thriving.</p>
          <AuthButton provider="google" />
          <p className="app__or">or</p>
          <input type="email" placeholder="work@email.com" className="app__email-input" />
          <button className="app__email-button" disabled>Continue with email</button>
          <p className="app__terms">
            By signing up, you agree to the <a href="#">Terms of Use</a>, <a href="#">Privacy Notice</a>, and <a href="#">Cookie Notice</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
