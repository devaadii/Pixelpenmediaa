import React, { useState } from "react";
import "./VideoShowcase.css";
// Removed thumb1 as it's causing glitches
import img from "../../assets/Vector 5.png";
import img2 from "../../assets/Vector 6.png";

const videos = [
  {
    id: 1,
    thumbnail: "/tn_1.png",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1",
    orientation: "vertical", 
  },
  {
    id: 2,
    thumbnail: "/tn_2.png",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    orientation: "horizontal", 
  },
  {
    id: 3,
    thumbnail: "/tn_4.png",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    orientation: "vertical", 
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <div className="video-carousel-heading">
        <div className="header">
          <h2 className="heading">Our Edits, Your Story</h2>
          <img className="img img-desktop" src={img} alt="vector desktop" />
          <p className="subheading">Results That Speak for Themselves.</p>
          <img className="img img-mobile" src={img2} alt="vector mobile" />
        </div>
      </div>
               
      <div className="video-showcase">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`video-frame-wrapper ${
              video.orientation === "vertical" ? "vertical" : "horizontal"
            } ${index === 1 ? "center-screen" : "side-screen"}`}
          >
            {activeVideo === video.id ? (
              <iframe
                src={video.embedUrl}
                title={`YouTube Video ${video.id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-frame"
              ></iframe>
            ) : (
              <button
                className="video-thumb"
                onClick={() => setActiveVideo(video.id)}
              >
                <img
                  src={video.thumbnail}
                  alt="Video thumbnail"
                  className="thumbnail-img"
                />
                <div className="play-overlay">
                  <div className="modern-play-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}