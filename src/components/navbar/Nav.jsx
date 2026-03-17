import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./nav.css";
import img from "../../assets/logo.png"

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const navLinksRef = useRef(null);
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, left: 0, width: 0 });

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

  const handleMouseEnter = useCallback((e) => {
    const li = e.currentTarget;
    const ul = navLinksRef.current;
    if (!ul) return;
    const ulRect = ul.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    setHoverStyle({
      opacity: 1,
      left: liRect.left - ulRect.left,
      width: liRect.width,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  }, []);

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
<ul
  className={menuOpen ? "nav-links open" : "nav-links"}
  ref={navLinksRef}
  onMouseLeave={handleMouseLeave}
>
          {/* Sliding hover indicator */}
          <span
            className="nav-hover-indicator"
            style={{
              opacity: hoverStyle.opacity,
              left: `${hoverStyle.left}px`,
              width: `${hoverStyle.width}px`,
            }}
          />
          <li onMouseEnter={handleMouseEnter}><a href="#home" className={activeLink === "home" ? "active" : ""} onClick={handleLinkClick}>Home</a></li>
          <li onMouseEnter={handleMouseEnter}><a href="#portfolio" className={activeLink === "portfolio" ? "active" : ""} onClick={handleLinkClick}>Portfolio</a></li>
          <li onMouseEnter={handleMouseEnter}><a href="#case-study" className={activeLink === "case-study" ? "active" : ""} onClick={handleLinkClick}>Services</a></li>
          <li onMouseEnter={handleMouseEnter}><a href="#services" className={activeLink === "services" ? "active" : ""} onClick={handleLinkClick}>Testimonials</a></li>
          <li onMouseEnter={handleMouseEnter}><a href="#about" className={activeLink === "about" ? "active" : ""} onClick={handleLinkClick}>FAQ's</a></li>

          {/* Book a Call in mobile menu */}
          <li className="mobile-book">
            <a href="https://calendly.com/pixelpenmedia-in/30min" onClick={handleLinkClick}>📞 Book a Call</a>
          </li>
        </ul>

        {/* Desktop Book Call */}
        <a href="https://calendly.com/pixelpenmedia-in/30min" className="desktop-book">
          <button className='book-call1'>
            <span className="btn-text">Book a Call</span>
            <span className="btn-glow"></span>
          </button>
        </a>
      </div>
    </nav>
  );
}

export default Nav;
