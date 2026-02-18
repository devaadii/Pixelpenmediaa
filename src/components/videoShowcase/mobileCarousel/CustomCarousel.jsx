import React, { useState, useEffect, useRef } from "react";
import img1 from "../../../assets/thumb.jpg";
import img from "../../../assets/Vector 5.png";
import img2 from "../../../assets/Vector 6.png";
import iphoneFrame from "../../../assets/fucking png.png"
import LiphoneFrame from "../../../assets/fucking1 png.png"

/* ================= SLIDES (CLOUDINARY) ================= */
const slides = [
  {
    orientation: "vertical",
    thumbnail:
    "https://res.cloudinary.com/dehknfmqf/video/upload/so_0/russian_river_web_klhmap.jpg",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },
  {
    orientation: "vertical",
    thumbnail:
      "https://res.cloudinary.com/dehknfmqf/video/upload/so_0/russian_river_web_klhmap.jpg",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },
  {
    orientation: "horizontal",
    thumbnail:
      "https://res.cloudinary.com/dehknfmqf/video/upload/so_0/russian_river_web_klhmap.jpg",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },
  {
    orientation: "vertical",
    thumbnail:
      "https://res.cloudinary.com/dehknfmqf/video/upload/so_0/russian_river_web_klhmap.jpg",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/f_auto,q_auto/russian_river_web_klhmap.mp4",
  },  {
    orientation: "vertical",
    thumbnail:
      "https://res.cloudinary.com/dehknfmqf/video/upload/so_0/russian_river_web_klhmap.jpg",
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
  className={`iphone-shell ${
    slide.orientation === "vertical"
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
                  <div className="custom-carousel-play-button">▶</div>
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
  className={`iphone-shell mobile-video-item ${
    slide.orientation === "vertical"
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
                    <div className="custom-carousel-play-button">▶</div>
                  </div>
                )}
              </div></div>
            );
          })}
        </div>
      )}

      {/* ================= CSS (EXACT SAME AS YOURS) ================= */}
      {/* 🔒 DO NOT CHANGE ANYTHING BELOW */}
<style jsx>{`
/* ========== IPHONE FRAME SYSTEM ========== */

.iphone-shell {
  position: relative;
  display: inline-block;
}

/* iPhone PNG overlay */
.iphone-frame-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 20;
  pointer-events: none;

  transform: scale(0.90);  /* 👈 adjust this number */

}

/* Actual screen area inside phone */
.desktop-screen-inner,
.mobile-screen-inner {
  position: absolute;
  inset: 6%;
  border-radius: 24px;
  overflow: hidden;
  z-index: 5;
  background: black;
}

/* Remove old borders */
.desktop-screen,
.mobile-video-item {

  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}
/* ========== DESKTOP ========== */
.custom-carousel-thumb-wrapper {

width: 100%;
height: 100%;
position: relative; /* important for absolute children */
display: block;
}
.custom-desktop-layout {
display: flex;
justify-content: center;
align-items: center;
gap: 1.5rem;
padding: 3rem 1rem;
}

/* 👇 HIDE MOBILE STACK ON DESKTOP */
.mobile-video-list {
display: none;
}
.header {
text-align: center;
color: white;
margin-top: 40px;
position: relative;
}
.header h2 {
font-family: "Awesome", serif;
font-size: 40px;
letter-spacing: 3px;
margin-bottom: 10px;
font-weight: 400;
}
.header p {
font-size: 18px;
opacity: 0.6;
margin-bottom: 80px;
font-family: "inter", sans-serif;
}
.img {
position: absolute;
right: 500px;
transform: translateY(-25px);
}
.img-mobile {
display: none;
}

.desktop-screen {
border: 10px solid #111;
border-radius: 32px;
overflow: hidden;
background: black;
box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
cursor: pointer;
transition: transform 0.3s ease;
}
.desktop-screen:hover {
transform: scale(1.05);
}
.desktop-horizontal {
aspect-ratio: 16 / 9;
width: 400px;
}
.desktop-vertical {
aspect-ratio: 9 / 16;
width: 220px;
}

.custom-carousel-video-thumb {
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 24px;
display: block;
}
.custom-carousel-play-button {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background: rgba(0,0,0,0.6);
color: white;
font-size: 32px;
padding: 12px 20px;
border-radius: 50%;
z-index: 10;
display: flex;
align-items: center;
justify-content: center;
pointer-events: none; /* click passes through if needed */
}
.video-wrapper {
position: relative;
width: 100%;
height: 100%;
}
.player-host {
width: 100%;
height: 100%;
border-radius: 24px;
overflow: hidden;
position: relative;
}
.custom-carousel-close {
position: absolute;
top: 8px;
right: 8px;
background: rgba(0, 0, 0, 0.6);
color: white;
font-size: 18px;
border: none;
border-radius: 50%;
width: 34px;
height: 34px;
cursor: pointer;
z-index: 10;
}

/* hide carousel arrows on desktop */
.custom-carousel-arrow {
display: none;
}

/* ========== MOBILE ========== */
@media (max-width: 768px) {
.custom-desktop-layout {
display: none;
}

.mobile-video-list {
display: flex;
flex-direction: column;
align-items: center;
gap: 1.25rem;
width: 100%;
padding: 0 1rem 3rem;
box-sizing: border-box;
}
.header {
text-align: center;
color: white;
margin-bottom: 1rem;
display: flex;
flex-direction: column;
align-items: center;
}
.header h2{
width:60vw;
}
.header p{
margin:0;
}
.img-desktop {
display: none;
}
.img-mobile {
display: block;
width: 70px;
margin: 8px auto 0;
position: static;
transform: translateX(35%) translateY(-5%);
}

/* vertical stack container */
.mobile-video-list {
display: flex;
flex-direction: column;
align-items: center;
gap: 1.25rem;
width: 100%;
padding: 0 1rem 3rem;
box-sizing: border-box;
}

/* each card / phone */
.mobile-video-item {
width: 100%;
max-width: 420px;
border: 12px solid #111;
border-radius: 22px;
overflow: hidden;
background: black;
box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
position: relative;
}
.mobile-video-item.playing {
transform: none !important;
}

/* ensure the clickable thumbnail wrapper fills the card and clips children */
.mobile-thumb {
position: relative;
width: 100%;
height: 100%;
display: block;
overflow: hidden;
border-radius: 24px;
min-height: 180px; /* ensures play button has space */
}

/* vertical (phone) items: taller */
.mobile-vertical.mobile-video-item,
.mobile-video-item.mobile-vertical {
aspect-ratio: 9 / 16;
max-width: 225px;
margin: 0 auto;
}


.mobile-horizontal.mobile-video-item,
.mobile-video-item.mobile-horizontal {
aspect-ratio: 16 / 9;
width: 100%;
max-width: 320px;
margin: 0 auto;
}
.video-wrapper-no-transform {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
border-radius: 10px; /* Slightly smaller than parent to prevent overflow */
overflow: hidden;
}
.mobile-video-item .player-host {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
border-radius: inherit;
}

/* thumbnail image fills wrapper exactly */
.custom-carousel-video-thumb {
width: 100%;
height: 100%;
object-fit: cover;
display: block;
border-radius: inherit;
}





/* show close button above iframe */
.mobile-video-item .custom-carousel-close {
z-index: 20;
}

/* mobile doesn't show desktop vectors */
.img {
display: none;
}

/* revert any desktop-only spacing */
.custom-carousel-video-thumb {
border-radius: 24px;
}


.custom-carousel {
display: none !important;
}
.img-mobile {
display: block;
width: 70px;
margin: 8px auto 0;
position: static;

}


.video-wrapper-no-transform {
position: relative;
width: 100%;
height: 100%;
border-radius: 24px;
overflow: hidden;
}


}
`}</style>
    </div>
  );
}