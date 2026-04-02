import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from "../src/assets/pixelpen logo bw-cropped.svg"
import './App.css'
import Nav from './components/navbar/Nav'
import Home from './components/home/Home'
import OurStory from './components/ourstory/OurStory'
import Footer from './components/footer/Footer'
import BookCallBanner from './components/bookcall/BookCallBanner'
import Testimonials from './components/testenomials/Testimonials'
import PackagesSection from './components/package/PackagesSection'
import VideoShowcase from './components/videoShowcase/VideoShowcase'
import CustomCarousel from './components/videoShowcase/mobileCarousel/CustomCarousel'
import FAQSection from './components/FAQ/FAQSection'
import TillNow from './components/tillnow/TillNow'
import "keen-slider/keen-slider.min.css";
import image from "../src/assets/background.svg"
import CustomCursor from './components/common/CustomCursor';
import CustomScrollbar from './components/common/CustomScrollbar';
import SmoothScroll from './components/common/SmoothScroll';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Lenis handles smooth scroll and should be initialized via the SmoothScroll component
    // We just ensure the history scroll restoration is set to manual for safety
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="layout"  >
      {/* Native SVG Noise Filter — No external assets needed */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="1.0" 
            numOctaves="1" 
            stitchTiles="stitch" 
          />
        </filter>
      </svg>
      <div className="noise-overlay" />
      <SmoothScroll />
      <CustomCursor />
      <CustomScrollbar />
      <Nav />
  
      <main className="page-content">
        <div className="page-wrap">
            <section  id="home">
          <Home />
   
        </section>
     <section id="our-story" className="overlap-up">
  <OurStory />
</section>
        <section id="portfolio">
 
<CustomCarousel />
        </section>
        <section id="case-study">
          <PackagesSection />
        </section>
        <section id="services">
          <Testimonials />
        </section>
        <section id="about">
          <FAQSection />
        </section>
        <section id="book-call">
          <BookCallBanner />
        </section>

        <section id="footer">
          <Footer />
        </section>
        </div>
      </main>
     </div>
  );
}

export default App
