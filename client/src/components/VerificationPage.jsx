import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './VerificationPage.scss';
import HomeImage from '../assets/images/T.png'; // Ensure this path matches the actual location of the image

const VerificationPage = () => {
  const [code, setCode] = useState('');
  const [resendCount, setResendCount] = useState(0);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSendCode = () => {
    fetch('/api/send-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setMessage('Code sent to your email');
      } else {
        setMessage('Failed to send code. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error sending code:', error);
      setMessage('Error sending code. Please try again.');
    });
  };

  const handleResendCode = () => {
    setResendCount(resendCount + 1);
    handleSendCode();
  };

  const isCodeValid = code => {
    return code.length === 6; // Example validation for a 6-digit code
  };

  useEffect(() => {
    handleSendCode(); // Send code when the component mounts
  }, []);

  return (
    <div className="verification">
      <div className="verification__content">
        <div className="verification__image-section">
          <img src={HomeImage} alt="Team High Five" />
        </div>
        <div className="verification__text-section">
          <h1 className="verification__title">We sent you a code</h1>
          <p className="verification__subtitle">Check your email</p>
          <p className="verification__message">{message}</p>
          <input
            type="text"
            placeholder="0 0 0 0 0 0"
            className="verification__input"
            value={code}
            onChange={handleCodeChange}
          />
          <div className="verification__buttons">
            <button className="verification__back-button" onClick={() => window.history.back()}>Back</button>
            <button
              className="verification__continue-button"
              disabled={!isCodeValid(code)}
            >
              Continue
            </button>
          </div>
          <p className="verification__resend" onClick={handleResendCode}>
            Didn't receive the code? <span>Click here to resend</span>
          </p>
          <p className="verification__terms">
            By signing up, you agree to the <a href="#">Terms of Use</a>, <a href="#">Privacy Notice</a>, and <a href="#">Cookie Notice</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
