import React, { useEffect, useRef } from 'react';
import './Home.css';
import Carousel from './carousel/Carousel';
import image from "../../assets/Group 82.png"
import UnicornStudioEmbed from './UnicornStudioEmbed';
import taare from "../../assets/taare.png"
import './spline.css';
//import backgroundvector from "../../assets/backgroundhai.png"
import DustParticles from './DustParticles';
import gsap from 'gsap';

// Splits text content of an element into individual character spans
function splitTextIntoChars(element) {
  const text = element.textContent;
  element.textContent = '';
  const chars = [];
  for (const char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    if (char === ' ') span.style.whiteSpace = 'pre';
    span.className = 'split-char';
    element.appendChild(span);
    chars.push(span);
  }
  return chars;
}

function Home() {
  const phone = "916376665647";
  const message = encodeURIComponent("Hi Pixelpen, I'm interested in your video editing services. Could you please share more details?");
  const heroRef = useRef(null);

  useEffect(() => {
    const line1El = heroRef.current.querySelector('.hero-line-1');
    const line1Chars = splitTextIntoChars(line1El);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // "We Edit" characters — wave reveal from below
      tl.fromTo(
        line1Chars,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.05 }
      );

      // "Instant Scroll Stoppers." — whole element reveal
      tl.fromTo(
        '#atten',
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2 },
        '-=0.8'
      );

      // Portfolio button — pop in
      tl.fromTo(
        '.book-call',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        '-=0.6'
      );

      // Subtle continuous floating — only on "We Edit" line
      gsap.to('.hero-line-1', {
        y: -4,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Animated gradient shimmer on #atten
      gsap.to('#atten', {
        backgroundPosition: '100% 0',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, heroRef);

    // Magnetic 3D tilt on #atten (now isolated from hero-title)
    const attenEl = heroRef.current.querySelector('#atten');
    const handleMouseMove = (e) => {
      const rect = attenEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 6;
      const rotateY = (x / rect.width) * 6;
      gsap.to(attenEl, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };
    const handleMouseLeave = () => {
      gsap.to(attenEl, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };
    attenEl.addEventListener('mousemove', handleMouseMove);
    attenEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      line1El.textContent = 'We Edit';
      attenEl.removeEventListener('mousemove', handleMouseMove);
      attenEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="home" ref={heroRef}>
      <DustParticles />

      <div className="hero-content">
        <h2 className="hero-title">
          <span className="hero-line-1">We Edit</span>
        </h2>
        <span id='atten'>Instant Scroll Stoppers.</span>

        <button className='book-call'>Portfolio</button>

        {/* Absolute positioned Spline embed so it doesn't push down page content */}
        <div className="spline-wrapper">
          <iframe 
            src='https://my.spline.design/studiolanding-mqW7qmGFzWcoWXg4lXxYTm8p/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            loading="lazy"
            title="Spline 3D Scene"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Home;