import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <img src="logo.png" alt="Logo" className="app__logo" />
          <nav className="app__nav">
            <ul className="app__nav-list">
              <li className="app__nav-item">Overview</li>
              <li className="app__nav-item">Pricing</li>
              <li className="app__nav-item">Privacy and Terms</li>
              <li className="app__nav-item">FAQ</li>
            </ul>
          </nav>
        </header>
        <main className="app__main">
          <div className="app__welcome welcome">
            <h1 className="welcome__title">Welcome to Thriving AF</h1>
            <p className="welcome__subtitle">Your AI-powered marketing assistant for freelancers</p>
            <div className="welcome__auth-options">
              <button className="welcome__google-auth">Continue with Google</button>
              <div className="welcome__divider">or</div>
              <input type="email" placeholder="work@email.com" className="welcome__email-input" />
              <button className="welcome__email-auth">Continue with email</button>
            </div>
            <p className="welcome__terms">
              By signing up, you agree to the <a href="#">Terms of Use</a>, <a href="#">Privacy Notice</a>, and <a href="#">Cookie Notice</a>.
            </p>
          </div>
          <div className="app__preview preview">
            <img src="preview.png" alt="App Preview" className="preview__image" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
