import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import Header from './components/Header';
import AuthButton from './components/AuthButton';
import VerificationPage from './components/VerificationPage';
import './App.scss';
import HomeImage from './assets/images/T.png'; // Ensure this path matches the actual location of the image
import GoogleIcon from './assets/images/google-icon.png'; // Ensure this path matches the actual location of the image

const App = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isEmailValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('/api/send-code', { email });
      if (response.status === 200) {
        window.location.href = `/verify?email=${encodeURIComponent(email)}`;
      } else {
        alert('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error sending code:', error);
      alert('Error sending code. Please try again.');
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="app">
            <div className="app__content">
              <div className="app__image-section">
                <img src={HomeImage} alt="Team High Five" />
              </div>
              <div className="app__text-section">
                <h1 className="app__title">Hi, Freelancers!</h1>
                <p className="app__subtitle">Let's get your Marketing Plan thriving.</p>
                <button className="app__google-button">
                  <img src={GoogleIcon} alt="Google Icon" className="app__google-icon" />
                  Continue with Google
                </button>
                <p className="app__or">or</p>
                <input
                  type="email"
                  placeholder="work@email.com"
                  className="app__email-input"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  className="app__email-button"
                  disabled={!isEmailValid(email)}
                  onClick={handleEmailSubmit}
                >
                  Continue with email
                </button>
                <p className="app__terms">
                  By signing up, you agree to the <a href="#">Terms of Use</a>, <a href="#">Privacy Notice</a>, and <a href="#">Cookie Notice</a>.
                </p>
              </div>
            </div>
          </div>
        } />
        <Route path="/verify" element={<VerificationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
