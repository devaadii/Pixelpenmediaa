import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './BookCallBanner.css';
import useScrollReveal from '../../hooks/useScrollReveal';


const slides = [
  {
    brand: "Pixelpen.",
    headline: "Weak visuals kill strong brands.",
    image: null,
  },
  {
    brand: "Pixelpen.",
    headline: "Attention isn’t given. It’s earned.",
    image: null,
  },
  {
    brand: "Pixelpen.",
    headline: "Make visuals work smarter.",
    image: null,
  },
];

const BookCallBanner = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  // Removed useScrollReveal to prevent conflicts with internal GSAP animations

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5s per slide
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word-segment');
      gsap.fromTo(words,
        { x: 60, opacity: 0, filter: 'blur(8px)' },
        { 
          x: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 0.9, 
          stagger: 0.08, 
          ease: 'power3.out',
          overwrite: true
        }
      );
    }
  }, [current]);

  return (
    <div className="book-banner" ref={sectionRef}>
      <div className="book-banner-content">
        <h1 className="brand animate-slide-rtl">{slides[current].brand}</h1>
        <h2 className="headline" ref={headlineRef} key={current}>
          {slides[current].headline.split('\n').map((line, idx) => (
            <div key={idx} style={{ display: 'block' }}>
              {line.split(' ').map((word, wIdx) => (
                <span key={wIdx} className="word-segment" style={{ display: 'inline-block', marginRight: '0.35em' }}>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h2>
        <a href="https://calendly.com/pixelpenmedia-in/30min" target="_blank" rel="noopener noreferrer"><button className="book-button">Book a Call</button></a>

      </div>

      <div className="carousel-dots">
        <div 
          className="active-pill"
          style={{
            transform: `translateX(calc(${current * 20}px - ${(slides.length - 1) * 10}px))`
          }}
        />
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === current ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
};

export default BookCallBanner;