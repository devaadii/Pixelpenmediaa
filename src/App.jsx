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
import "keen-slider/keen-slider.min.css";
import image from "../src/assets/background.svg"
import CustomCursor from './components/common/CustomCursor';
import CustomScrollbar from './components/common/CustomScrollbar';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Clear browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="layout"  >
      <div className="noise-overlay" />
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
        <section id="about">
          <Footer />
        </section>
        </div>
      </main>
    </div>
  );
}

export default App
