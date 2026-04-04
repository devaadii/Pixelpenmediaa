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
import { Helmet } from 'react-helmet-async'; // 👈 add this

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="layout">

      {/* SEO Meta Tags */}
      <Helmet>
        <title>Pixelpen Media | World Class Video Editing in 29 Hours</title>
        <meta
          name="description"
          content="An elite video team that edits world class videos for Creators, Brands, and Entrepreneurs — delivered in 29 hours."
        />
        <meta
          name="keywords"
          content="video editing agency, video editing for creators, video editing for brands, fast video editing, YouTube video editing, Pixelpen Media"
        />
        <link rel="canonical" href="https://pixelpen.in/" />

        {/* Open Graph */}
        <meta property="og:title" content="Pixelpen Media | World Class Video Edits delivered in 29 Hours" />
        <meta property="og:description" content="We edit world class videos for Creators, Brands, and Entrepreneurs — delivered in 29 hours." />
        <meta property="og:url" content="https://pixelpen.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pixelpen.in/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pixelpen Media | World Class Video Editing in 29 Hours" />
        <meta name="twitter:description" content="We edit world class videos for Creators, Brands, and Entrepreneurs — delivered in 29 hours." />
        <meta name="twitter:image" content="https://pixelpen.in/og-image.jpg" />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Native SVG Noise Filter */}
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
          <section id="home">
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