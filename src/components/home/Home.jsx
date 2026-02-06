import React from 'react';
import './Home.css';
import Carousel from './carousel/Carousel';
import image from "../../assets/Group 82.png"
import UnicornStudioEmbed from './UnicornStudioEmbed';
import background from "../../assets/background.png";


function Home() {
  const phone = "916376665647";
const message = encodeURIComponent("Hi Pixelpen, I'm interested in your video editing services. Could you please share more details?");
  return (
<div className="home">
     <div className="hero-content">
        <h2 className="hero-title">
          We Edit<br />
          <span id='atten'>Instant Scroll Stoppers.</span>
        </h2>
        <button className='book-call'>Portfolio</button>
      </div>
</div>
  );
}

export default Home;