// src/components/Carousel.jsx
import React from "react";
import "./Carousel.css";

const carouselData = [
  ["Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits", "Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits"],
  ["Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits", "Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits"],
  ["Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits", "Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits"],
  ["Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits", "Reel Edits", "Youtube Videos", "Corporate Videos", "Explainer Videos", "Product Launch Videos", "Video Ads","Podcast Edits"],
];

function CarouselRow({ items, direction }) {
  const scrollClass = direction === "right" ? "carousel-text__scroll-right" : "carousel-text__scroll-left";

  return (
    <div className="carousel-text__wrapper">
      <div className="carousel-text__fade-left" />
      <div className="carousel-text__fade-right" />
      <div className={`carousel-text__track ${scrollClass}`}>
        {[...items, ...items].map((text, index) => (
          <div className="carousel-text__item" key={index}>
            <span className="carousel-text__dot">•</span> {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Carousel() {
  return (
    <div className="carousel-text__section">
      {carouselData.map((items, idx) => (
        <CarouselRow
          items={items}
          key={idx}
          direction={idx % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}