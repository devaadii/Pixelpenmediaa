import React, { useState, useEffect, useRef } from 'react';
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
    headline: "You need visuals that work harder.",
    image: null,
  },
];

const BookCallBanner = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="book-banner" ref={sectionRef}>
      <div className="book-banner-content">
        <h1 className="brand">{slides[current].brand}</h1>
       <h2 className="headline animate-slide-rtl" key={current}>
  {slides[current].headline.split('\n').map((line, idx) => (
    <div key={idx}>{line}</div>
  ))}
</h2>
<a href="https://calendly.com/pixelpenmedia-in/30min" target="_blank" rel="noopener noreferrer"><button className="book-button">Book a Call</button></a>

      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === current ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
};

export default BookCallBanner;