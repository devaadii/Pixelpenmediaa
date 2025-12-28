import React from 'react';
import './Home.css';
import Carousel from './carousel/Carousel';
import image from "../../assets/Group 82.png"
import UnicornStudioEmbed from './UnicornStudioEmbed';


function Home() {
  const phone = "916376665647";
const message = encodeURIComponent("Hi Pixelpen, I'm interested in your video editing services. Could you please share more details?");
  return (
    <div className="home">
      <div className="hero-content">
        <h2 className="hero-title">
          We Edit Instant<br />
          <span id='atten'> Scroll Stoppers.</span>
        </h2>
        <p className="hero-subtitle">
          Looking for <i>jaw-dropping edits, thumbnails, and scripts</i> that grab attention and make your audience stop scrolling?
        </p>
        <div className="hero-buttons" >
          <a href='#portfolio'>
          <button className="primary-btn">Portfolio</button></a>
     <a href="#case-study">

<button
  className="outline-btn"
>
  View Plans
</button></a>

        </div>
        </div>     
  <img className="hero-image" src={image} alt="hero" />
  <div className="carousel-container">  
        <Carousel />
      </div>  
    </div>
  );
}

export default Home;