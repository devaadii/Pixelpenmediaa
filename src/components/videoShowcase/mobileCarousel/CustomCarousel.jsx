import React, { useState, useEffect, useRef } from "react";
import img1 from "../../../assets/thumb.jpg";
import img from "../../../assets/Vector 5.png";
import img2 from "../../../assets/Vector 6.png";
import iphoneFrame from "../../../assets/fucking png.png"
import LiphoneFrame from "../../../assets/fucking1 png.png"
import "./CustomCarousel.css";

/* ================= SLIDES (CLOUDINARY) ================= */
const slides = [
  {
    orientation: "vertical",
    thumbnail: img1,
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },
  {
    orientation: "vertical",
    thumbnail: img1,
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },
  {
    orientation: "horizontal",
    thumbnail: img1,
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },
  {
    orientation: "vertical",
    thumbnail: img1,
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  }, {
    orientation: "vertical",
    thumbnail: img1,
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },
];

/* ================= MOBILE CHECK (SSR SAFE) ================= */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => setIsMobile(window.innerWidth <= 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};

export default function CustomCarousel() {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef({});

  /* ================= STOP VIDEO ================= */
  const stopVideo = () => {
    if (currentIndex !== null && videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].pause();
      videoRefs.current[currentIndex].currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentIndex(null);
  };

  const handleThumbnailClick = (index) => {
    if (isPlaying) stopVideo();
    setTimeout(() => {
      setCurrentIndex(index);
      setIsPlaying(true);
    }, 0);
  };


  return (
    <div className="custom-carousel-container">
      {/* ---------- Header (UNCHANGED) ---------- */}
      <div className="video-carousel-heading">
        <div className="header">
          <h2>Our Edits, Your Story</h2>
          <img className="img img-desktop" src={img} alt="" />
          <p>Proof looks better in motion.</p>
          <img className="img img-mobile" src={img2} alt="" />
        </div>
      </div>

      {/* ========== DESKTOP (UNCHANGED STRUCTURE) ========== */}
      {!isMobile && (
        <div className="custom-desktop-layout">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`iphone-shell ${slide.orientation === "vertical"
                  ? "desktop-vertical"
                  : "desktop-horizontal"
                }`}
            >
              <img
                src={slide.orientation === "horizontal" ? LiphoneFrame : iphoneFrame}
                className="iphone-frame-img"
                alt=""
              />

              <div className="desktop-screen-inner">
                {isPlaying && index === currentIndex ? (
                  <div className="video-wrapper">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={slide.videoSrc}
                      className="player-host"
                      autoPlay
                      muted
                      controls
                      playsInline

                      onEnded={stopVideo}
                    />
                    <button className="custom-carousel-close" onClick={stopVideo}>
                      ✕
                    </button>
                  </div>
                ) : (
                  <div
                    className="custom-carousel-thumb-wrapper"
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={slide.thumbnail}
                      className="custom-carousel-video-thumb"
                      alt=""
                    />
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
                )}
              </div>  </div>

          ))}
        </div>
      )}

      {/* ========== MOBILE (UNCHANGED STRUCTURE) ========== */}
      {isMobile && (
        <div className="mobile-video-list">
          {slides.map((slide, idx) => {
            let rotation = "0deg";

            if (
              slide.orientation === "vertical" &&
              !(isPlaying && idx === currentIndex)
            ) {
              const verticalIndex = slides
                .slice(0, idx + 1)
                .filter((s) => s.orientation === "vertical").length;
              rotation = verticalIndex % 2 === 0 ? "-3deg" : "3deg";
            }

            return (
              <div
                key={idx}
                className={`iphone-shell mobile-video-item ${slide.orientation === "vertical"
                    ? "mobile-vertical"
                    : "mobile-horizontal"
                  } ${isPlaying && idx === currentIndex ? "playing" : ""}`}
                style={{
                  transform: `rotate(${rotation})`,
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  src={slide.orientation === "horizontal" ? LiphoneFrame : iphoneFrame}
                  className="iphone-frame-img"
                  alt=""
                />

                <div className="mobile-screen-inner">
                  {isPlaying && idx === currentIndex ? (
                    <div className="video-wrapper-no-transform">
                      <video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        src={slide.videoSrc}
                        className="player-host"
                        autoPlay
                        muted
                        playsInline
                        controls
                        onEnded={stopVideo}
                      />
                      <button
                        className="custom-carousel-close"
                        onClick={stopVideo}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div
                      className="custom-carousel-thumb-wrapper mobile-thumb"
                      onClick={() => handleThumbnailClick(idx)}
                    >
                      <img
                        src={slide.thumbnail}
                        className="custom-carousel-video-thumb"
                        alt=""
                      />
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
                  )}
                </div></div>
            );
          })}
        </div>
      )}


    </div>
  );
}