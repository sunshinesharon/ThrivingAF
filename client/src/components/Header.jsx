import React, { useState } from 'react';
import './Header.scss';
import Logo from '../assets/images/favicon.png'; // Ensure this path matches the actual location of the image
import MenuIcon from '../assets/images/menu-icon.png'; // Ensure this path matches the actual location of the image
import CloseIcon from '../assets/images/close-icon.png'; // Ensure this path matches the actual location of the image

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" />
      </div>
      <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
        <a href="#" className="header__link">Overview</a>
        <a href="#" className="header__link">Pricing</a>
        <a href="#" className="header__link">Privacy and terms</a>
        <a href="#" className="header__link">FAQ</a>
      </nav>
      <div className="header__menu-icon" onClick={toggleMenu}>
        <img src={menuOpen ? CloseIcon : MenuIcon} alt="Menu Icon" />
      </div>
      {menuOpen && (
        <div className="header__overlay" onClick={toggleMenu}>
          <div className="header__overlay-content">
            <a href="#" className="header__overlay-link">Overview</a>
            <a href="#" className="header__overlay-link">Pricing</a>
            <a href="#" className="header__overlay-link">Privacy and terms</a>
            <a href="#" className="header__overlay-link">FAQ</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
