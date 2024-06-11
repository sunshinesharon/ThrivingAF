import React from 'react';
import './AuthButton.scss';

const AuthButton = ({ provider }) => {
  return (
    <button className={`auth-button ${provider}`}>
      {provider === 'google' ? 'Continue with Google' : 'Continue with email'}
    </button>
  );
};

export default AuthButton;
