import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const socialLinks = [
  { name:"Twitter / X",  icon:"fa-brands fa-x-twitter",    href:"https://twitter.com/search?q=digitalmarketing",                                              color:"#1d9bf0", label:"Follow on Twitter/X" },
  { name:"Facebook",     icon:"fa-brands fa-facebook-f",   href:"https://www.facebook.com/groups/digitalmarketingcommunity",                                   color:"#1877f2", label:"Join Facebook Group" },
  { name:"Instagram",    icon:"fa-brands fa-instagram",    href:"https://www.instagram.com/explore/tags/digitalmarketing/",                                    color:"#e1306c", label:"Explore on Instagram" },
  { name:"LinkedIn",     icon:"fa-brands fa-linkedin-in",  href:"https://www.linkedin.com/showcase/digital-marketing/",                                        color:"#0a66c2", label:"Connect on LinkedIn" },
  { name:"YouTube",      icon:"fa-brands fa-youtube",      href:"https://www.youtube.com/results?search_query=digital+marketing+tutorial",                     color:"#ff0000", label:"Watch on YouTube" },
  { name:"TikTok",       icon:"fa-brands fa-tiktok",       href:"https://www.tiktok.com/tag/digitalmarketing",                                                 color:"#69c9d0", label:"Follow on TikTok" },
  { name:"WhatsApp",     icon:"fa-brands fa-whatsapp",     href:"https://wa.me/?text=Check%20out%20DigiPulse%20-%20Master%20Digital%20Marketing!",             color:"#25d366", label:"Share via WhatsApp" },
  { name:"Telegram",     icon:"fa-brands fa-telegram",     href:"https://t.me/share/url?url=https://digipulse.com&text=Master%20Digital%20Marketing",          color:"#2ca5e0", label:"Share on Telegram" },
  { name:"Pinterest",    icon:"fa-brands fa-pinterest-p",  href:"https://www.pinterest.com/search/pins/?q=digital%20marketing",                                color:"#e60023", label:"Explore on Pinterest" },
  { name:"Reddit",       icon:"fa-brands fa-reddit-alien", href:"https://www.reddit.com/r/digital_marketing/",                                                 color:"#ff4500", label:"Join Reddit Community" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__logo"><span>⚡</span><span className="gradient-text">DigiPulse</span></div>
          <p className="footer__tagline">Your ultimate guide to mastering digital marketing. Grow your brand, reach 2 million+ customers, and dominate online.</p>
          <div className="footer__socials">
            {socialLinks.map((s) => (
              <a key={s.name} href={s.href} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label} style={{"--social-color": s.color}}>
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#stats">Results</a></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">SEO Mastery</a></li>
              <li><a href="#services">Social Media</a></li>
              <li><a href="#services">Email Marketing</a></li>
              <li><a href="#services">Content Strategy</a></li>
              <li><a href="#services">Analytics</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://wa.me/?text=Hi%20DigiPulse" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp" style={{color:"#25d366",marginRight:8}} />WhatsApp Us</a></li>
              <li><a href="https://twitter.com/search?q=digitalmarketing" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter" style={{color:"#1d9bf0",marginRight:8}} />Twitter/X</a></li>
              <li><a href="https://www.linkedin.com/showcase/digital-marketing/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in" style={{color:"#0a66c2",marginRight:8}} />LinkedIn</a></li>
              <li><a href="https://www.facebook.com/groups/digitalmarketingcommunity" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f" style={{color:"#1877f2",marginRight:8}} />Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} DigiPulse. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}