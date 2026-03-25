import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import "./nav.css";
import img from "../../assets/logo.png"
import ShinyButton from '../ui/ShinyButton';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const navLinksRef = useRef(null);
  const logoRef = useRef(null);
  const bookCallRef = useRef(null);
  const homeLiRef = useRef(null);
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, left: 0, width: 0 });

  useEffect(() => {
    // Scroll observation
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section most visible in current viewport sampling zone
        const visibleSection = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        
        if (visibleSection && visibleSection.target.id) {
          setActiveLink(visibleSection.target.id);
        }
      },
      { 
        // Samples near the center of the screen
        rootMargin: "-10% 0px -60% 0px",
        threshold: [0.1, 0.5, 0.9] 
      }
    );
    sections.forEach((section) => observer.observe(section));

    // Entry Animation
    const ctx = gsap.context(() => {
      const navLinks = navLinksRef.current;
      if (!navLinks) return;

      // Only run on desktop to avoid interfering with mobile menu layout
      if (window.innerWidth <= 768) {
        gsap.set(navLinks, { clearProps: "all" });
        return;
      }

      // Default to expo.inOut for ultra-smooth start and end
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      const homeLi = homeLiRef.current;
      const homeLink = homeLi.querySelector('a');
      const otherLis = Array.from(navLinks.querySelectorAll('li')).filter(li => li !== homeLi && !li.classList.contains('mobile-book'));
      const otherLinks = otherLis.map(li => li.querySelector('a'));
      const allLinks = [homeLink, ...otherLinks];
      
      // 1. Initial State & Capture Measurements
      gsap.set([logoRef.current, bookCallRef.current], { opacity: 0, scale: 0.95 });
      gsap.set(otherLis, { opacity: 0, x: 30 });
      gsap.set(allLinks, { 
        color: "#F68218", 
        fontWeight: 700,
      });
      
      // Force layout to capture natural widths
      const fullWidth = navLinks.offsetWidth;
      const homeWidth = homeLi.offsetWidth;
      
      // Initial centered state
      gsap.set(navLinks, { 
        width: homeWidth + 16, 
        opacity: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      });

      // 2. Animation Sequence
      // Start EVERY component together for a more unified entrance
      tl.to(navLinks, { 
        opacity: 1, 
        duration: 1.5, 
      })
      .to([logoRef.current, bookCallRef.current], { 
        opacity: 1, 
        scale: 1, 
        duration: 1.8, 
        stagger: 0.1,
      }, "<") // Start EXACTLY with the ul fade-in
      .to(navLinks, { 
        width: fullWidth, 
        duration: 3.0, 
      }, "<0.1") // Expansion starts almost simultaneously
      
      // Font weight and color transitions matched to expansion
      .to(homeLink, { 
        color: "#FFFFFF", 
        fontWeight: 600,
        duration: 2.6,
      }, "<")
      .to(otherLinks, { 
        color: "rgba(255, 255, 255, 0.55)", 
        fontWeight: 500,
        duration: 2.6,
      }, "<")
      
      // Staggered reveal of other links
      .to(otherLis, { 
        opacity: 1, 
        x: 0, 
        stagger: 0.1, 
        duration: 1.8,
        onComplete: () => {
          gsap.set(navLinks, { width: "auto", overflow: 'visible' });
          gsap.set(allLinks, { clearProps: "all" });
        }
      }, "-=2.4"); // Deeply overlapped
        
    }, navLinksRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
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
        <img className='logo' src={img} ref={logoRef} alt="logo" />

        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>


        <ul
          className={menuOpen ? "nav-links open" : "nav-links"}
          ref={navLinksRef}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="nav-hover-indicator"
            style={{
              opacity: hoverStyle.opacity,
              left: `${hoverStyle.left}px`,
              width: `${hoverStyle.width}px`,
            }}
          />
          <li ref={homeLiRef} onMouseEnter={handleMouseEnter}>
            <a href="#home" className={(activeLink === "home" || activeLink === "our-story") ? "active" : ""} onClick={handleLinkClick}>Home</a>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <a href="#portfolio" className={activeLink === "portfolio" ? "active" : ""} onClick={handleLinkClick}>Portfolio</a>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <a href="#case-study" className={activeLink === "case-study" ? "active" : ""} onClick={handleLinkClick}>Services</a>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <a href="#services" className={activeLink === "services" ? "active" : ""} onClick={handleLinkClick}>Testimonials</a>
          </li>
          <li onMouseEnter={handleMouseEnter}>
            <a href="#about" className={activeLink === "about" ? "active" : ""} onClick={handleLinkClick}>FAQ's</a>
          </li>

          <li className="mobile-book">
            <a href="https://calendly.com/pixelpenmedia-in/30min" onClick={handleLinkClick}>
              <ShinyButton className="mobile-shiny-btn">
                📞 Book a Call
              </ShinyButton>
            </a>
          </li>
        </ul>

        <a href="https://calendly.com/pixelpenmedia-in/30min" className="desktop-book" ref={bookCallRef} target="_blank" rel="noopener noreferrer">
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
