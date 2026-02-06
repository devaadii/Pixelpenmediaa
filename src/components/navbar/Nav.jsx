import React, { useState, useEffect } from 'react';
import "./nav.css";
import img from "../../assets/logo.png" 

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -40% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo always left */}
       <img className='logo' src={img} />

        {/* Hamburger aligned right (mobile only) */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Nav Menu */}
      {/* Overlay */}
{menuOpen && (
  <div
    className="nav-overlay"
    onClick={() => setMenuOpen(false)}
  />
)}

{/* Nav Menu */}
<ul className={menuOpen ? "nav-links open" : "nav-links"}>
          <li><a href="#home" className={activeLink === "home" ? "active" : ""} onClick={handleLinkClick}>Home</a></li>
          <li><a href="#portfolio" className={activeLink === "portfolio" ? "active" : ""} onClick={handleLinkClick}>Portfolio</a></li>
          <li><a href="#case-study" className={activeLink === "case-study" ? "active" : ""} onClick={handleLinkClick}>Services</a></li>
          <li><a href="#services" className={activeLink === "services" ? "active" : ""} onClick={handleLinkClick}>Testimonials</a></li>
          <li><a href="#about" className={activeLink === "about" ? "active" : ""} onClick={handleLinkClick}>FAQ's</a></li>

          {/* Book a Call in mobile menu */}
          <li className="mobile-book">
            <a href="https://calendly.com/pixelpenmedia-in/30min" onClick={handleLinkClick}>📞 Book a Call</a>
          </li>
        </ul>

        {/* Desktop Book Call */}
        <a href="https://calendly.com/pixelpenmedia-in/30min" className="desktop-book">
          <button className='book-call1'>Book a Call</button>
        </a>
      </div>
    </nav>
  );
}

export default Nav;
