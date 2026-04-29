 
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("dark-mode");
    const initial = saved === "true";
    setDarkMode(initial);
    document.documentElement.dataset.theme = initial ? "dark" : "light";
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.dataset.theme = next ? "dark" : "light";
      window.localStorage.setItem("dark-mode", next ? "true" : "false");
      return next;
    });
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Stats", href: "#stats" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DigiPulse</span>
        </Link>
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.href.startsWith("#") ? (
                <a href={link.href} className="navbar__link">{link.label}</a>
              ) : (
                <Link to={link.href} className={`navbar__link ${location.pathname === link.href ? "active" : ""}`}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          <a href="#contact" className="btn-primary navbar__cta">
            Buy Now <i className="fa-solid fa-bolt" />
          </a>
          <button className={`navbar__theme-toggle ${darkMode ? "active" : ""}`} onClick={toggleDarkMode} aria-label="Toggle dark mode">
            <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"} />
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
        <button className={`navbar__hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {navLinks.map((link) => (
          <div key={link.label} className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>
            {link.href.startsWith("#") ? (
              <a href={link.href} className="navbar__mobile-link">{link.label}</a>
            ) : (
              <Link to={link.href} className="navbar__mobile-link">{link.label}</Link>
            )}
          </div>
        ))}
        <a href="#contact" className="btn-primary navbar__mobile-cta" onClick={() => setMenuOpen(false)}>Buy Now</a>
        <button className="navbar__theme-toggle navbar__mobile-toggle" onClick={() => { toggleDarkMode(); setMenuOpen(false); }}>
          <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"} />
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </nav>
  );
}