import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a href="#contact" className="btn-primary navbar__cta">
          Get Started <i className="fa-solid fa-arrow-right" />
        </a>
        <button className={`navbar__hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {navLinks.map((link) => (
          <div key={link.label} onClick={() => setMenuOpen(false)}>
            {link.href.startsWith("#") ? (
              <a href={link.href} className="navbar__mobile-link">{link.label}</a>
            ) : (
              <Link to={link.href} className="navbar__mobile-link">{link.label}</Link>
            )}
          </div>
        ))}
        <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}>Get Started</a>
      </div>
    </nav>
  );
}