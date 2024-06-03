import React from 'react';
import Header from './components/Header';
import AuthButton from './components/AuthButton';
import './App.scss';
// import HomeImage from './assets/images/Home.png'; 

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <div className="text-section">
          <h1>Hi, Freelancer!</h1>
          <p>Let's get you thriving with a solid Marketing plan.</p>
          <AuthButton provider="google" />
          <p>or</p>
          <AuthButton provider="email" />
        </div>
        {/* <div className="image-section">
          <img src={HomeImage} alt="Team High Five" />
        </div> */}
      </div>
    </div>
  );
};

export default App;
