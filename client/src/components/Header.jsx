import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import Logo from "../assets/images/favicon.png";
import MenuIcon from "../assets/images/menu-icon.png"; 
import CloseIcon from "../assets/images/close-icon.png"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/verify");
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" onClick={handleLogoClick}/>
      </div>
      <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
        <a href="/" className="header__link">
          Home
        </a>
        <a href="/why-thriving" className="header__link">
          Why Thriving
        </a>
        <a href="/pricing" className="header__link">
          Beta
        </a>
        <a href="/freelance-hub" className="header__link">
          Freelance Hub
        </a>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="header__link header__logout-button"
          >
            Log out
          </button>
        )}
      </nav>
      <div className="header__menu-icon" onClick={toggleMenu}>
        <img src={menuOpen ? CloseIcon : MenuIcon} alt="Menu Icon" />
      </div>
      {menuOpen && (
        <div className="header__overlay" onClick={toggleMenu}>
          <div className="header__overlay-content">
            <a href="/home" className="header__overlay-link">
              Home
            </a>
            <a href="/why-thriving" className="header__overlay-link">
              Why Thriving
            </a>
            <a href="/pricing" className="header__overlay-link">
              Beta
            </a>
            <a href="/freelance-hub" className="header__overlay-link">
              Freelance Hub
            </a>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="header__overlay-link header__logout-button"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
