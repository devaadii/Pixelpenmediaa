import React, { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Removed img1 as it's causing glitches
import img from "../../../assets/Vector 5.png";
import img2 from "../../../assets/Vector 6.png";
import iphoneFrame from "../../../assets/fucking png.png"
import LiphoneFrame from "../../../assets/fucking1 png.png"
import "./CustomCarousel.css";
import useScrollReveal from "../../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

/* ================= SLIDES (CLOUDINARY) ================= */
const slides = [
  {
    orientation: "vertical",
    thumbnail: "/tn_1.png",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/v1774425997/namita_final_edit_GOATED_1_vr6rlg.mp4",
  },
  {
    orientation: "vertical",
    thumbnail: "/tn_2.png",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/v1767528720/animation_web_nzmjsg.mp4",
  },
  {
    orientation: "horizontal",
    thumbnail: "/tn_1.png", // Replaced old thumb with tn_1
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/v1774424026/Its_you_vs_you_upl1ck.mp4",
  },
  {
    orientation: "vertical",
    thumbnail: "/tn_4.png",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/v1774424026/Its_you_vs_you_upl1ck.mp4",
  },  {
    orientation: "vertical",
    thumbnail: "/tn_5.png",
    videoSrc:
      "https://res.cloudinary.com/dehknfmqf/video/upload/v1767528735/Astrakhan_Web_j52ksd.mp4",
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
  const videoTimes = useRef({}); // Stores paused timestamps
  const headingRef = useRef(null);
  const layoutRef = useRef(null);
  const splideRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef(null);

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 1500); // Shortened to 1.5s
  };

  const handleVideoClick = (e) => {
    // Prevent toggle if clicking specifically on the pause button (which has its own stopVideo handler)
    if (e.target.closest('.modern-pause-btn')) return;
    setShowControls((prev) => !prev);
    resetControlsTimeout();
  };

  const handleMove = (splide) => {
    // Only apply visual effects during move - no state updates to prevent re-renders
    apply3DEffect(splide);
  };

  const handleMoved = (splide) => {
    // Update pagination dots state ONLY after movement finishes to avoid looping glitches
    const realIndex = splide.index % slides.length;
    setScrollIndex(realIndex < 0 ? realIndex + slides.length : realIndex);
  };

  /* 3D coverflow effect for mobile carousel */
  const apply3DEffect = (splide) => {
    if (!splide || !splide.Components || !splide.Components.Slides) return;
    const slideEls = splide.Components.Slides.get();
    const activeIndex = splide.index;

    slideEls.forEach((slideObj) => {
      const inner = slideObj.slide.querySelector('.iphone-shell');
      if (!inner) return;
      const idx = slideObj.index;
      let diff = idx - activeIndex;

      // Clamp for looped clones
      if (diff > slides.length / 2) diff -= slides.length;
      if (diff < -slides.length / 2) diff += slides.length;

      const absDiff = Math.abs(diff);
      const rotateY = diff * -20;     // tilt away from center
      const scale = 1 - absDiff * 0.1; // shrink non-active
      const opacity = 1 - absDiff * 0.3;

      gsap.to(inner, {
        rotateY,
        scale: Math.max(scale, 0.7),
        opacity: Math.max(opacity, 0.4),
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const heading = headingRef.current;
        const layout = layoutRef.current;
        if (!heading || !layout) return;

        const verticalPhones = layout.querySelectorAll('.desktop-vertical');
        const horizontalPhone = layout.querySelector('.desktop-horizontal');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true
          }
        });

        const headerContainer = heading.querySelector('.header');
        tl.fromTo(headerContainer.children, 
          { opacity: 0, y: 40, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        tl.fromTo(horizontalPhone,
          { opacity: 0, y: 150, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" },
          "-=0.8"
        );

        const offsets = [-578, -334, 334, 578]; 
        tl.fromTo(verticalPhones, 
          { opacity: 0, scale: 0.8, rotation: (i) => i < 2 ? 90 : -90, x: (i) => -offsets[i] },
          { opacity: 1, scale: 1, rotation: 0, x: 0, duration: 2.4, delay: (i) => (i === 0 || i === 3) ? 0 : 0.4, ease: "power4.out" },
          "<0.6"
        );
      } else {
        const heading = headingRef.current;
        if (heading) {
          const headerContainer = heading.querySelector('.header');
          gsap.fromTo(headerContainer.children, 
            { opacity: 0, y: 20, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power3.out', clearProps: 'opacity,transform,filter', scrollTrigger: { trigger: heading, start: 'top 95%', once: true } }
          );
        }
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  const stopVideo = () => {
    if (currentIndex !== null && videoRefs.current[currentIndex]) {
      const video = videoRefs.current[currentIndex];
      videoTimes.current[currentIndex] = video.ended ? 0 : video.currentTime;
      video.pause();
    }
    setIsPlaying(false);
    setCurrentIndex(null);
    setShowControls(false);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
  };

  const handleThumbnailClick = (index) => {
    if (isPlaying) stopVideo();
    setTimeout(() => {
      setCurrentIndex(index);
      setIsPlaying(true);
      setShowControls(true);
      resetControlsTimeout();
    }, 0);
  };

  return (
    <div className="custom-carousel-container">
      <div className="video-carousel-heading" ref={headingRef}>
        <div className="header">
          <h2>Our Edits, Your Story</h2>
          <img className="img img-desktop" src={img} alt="" />
          <p>Proof looks better in motion.</p>
          <img className="img img-mobile" src={img2} alt="" />
        </div>
      </div>

      {!isMobile && (
        <div className="custom-desktop-layout" ref={layoutRef}>
          {slides.map((slide, index) => (
            <div key={index} className={`iphone-shell ${slide.orientation === "vertical" ? "desktop-vertical" : "desktop-horizontal"}`}>
              <img src={slide.orientation === "horizontal" ? LiphoneFrame : iphoneFrame} className="iphone-frame-img" alt="" />
              <div className="desktop-screen-inner">
                {isPlaying && index === currentIndex ? (
                  <div className="video-wrapper" onClick={handleVideoClick}>
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={slide.videoSrc}
                      className="player-host"
                      autoPlay
                      playsInline
                      onLoadedData={(e) => {
                        if (videoTimes.current[index]) e.target.currentTime = videoTimes.current[index];
                      }}
                      onEnded={stopVideo}
                    />
                    <div className={`modern-pause-btn ${showControls ? "visible" : ""}`} onClick={(e) => { 
                      e.stopPropagation(); 
                      stopVideo(); 
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    </div>
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
        <>
          <Splide
            ref={splideRef}
            options={{
              type: 'loop',
              drag: true,
              focus: 'center',
              autoWidth: true,
              gap: '60px',       // Reduced further for more reliable snap points
              arrows: false,
              pagination: false,
              trimSpace: false,
              dragThreshold: 5,
              flickPower: 150,   // Strictly controlled momentum for 1 slide only
              flickMaxPages: 1,
              perMove: 1,
              speed: 400,
              snap: true,
              clones: 10,
              rewind: false,
              updateOnMove: false, // Prevent React re-renders during active drag
              waitForTransition: true,
            }}
            onMove={handleMove}
            onMoved={handleMoved}
            onMounted={(splide) => apply3DEffect(splide)}
            className="mobile-splide-container"
          >
            {slides.map((slide, idx) => (
              <SplideSlide key={idx}>
                <div
                  className={`iphone-shell mobile-video-item ${slide.orientation === "vertical"
                      ? "mobile-vertical"
                      : "mobile-horizontal"
                    } ${isPlaying && idx === currentIndex ? "playing" : ""}`}
                >
                  <img
                    src={slide.orientation === "horizontal" ? LiphoneFrame : iphoneFrame}
                    className="iphone-frame-img"
                    alt=""
                  />

                  <div className="mobile-screen-inner">
                    {isPlaying && idx === currentIndex ? (
                      <div className="video-wrapper-no-transform" onClick={handleVideoClick}>
                        <video
                          ref={(el) => (videoRefs.current[idx] = el)}
                          src={slide.videoSrc}
                          className="player-host"
                          autoPlay
                          playsInline
                          onLoadedData={(e) => {
                            if (videoTimes.current[idx]) e.target.currentTime = videoTimes.current[idx];
                          }}
                          onEnded={stopVideo}
                        />
                        <div className={`modern-pause-btn ${showControls ? "visible" : ""}`} onClick={(e) => { 
                          e.stopPropagation(); 
                          stopVideo(); 
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        </div>
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
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
          
          {/* Pagination Dots */}
          <div className="carousel-dots">
            {/* The liquid highlighted pill */}
            <div 
              className="active-pill"
              style={{
                transform: `translateX(calc(${scrollIndex * 20}px - ${(slides.length - 1) * 10}px))`
              }}
            />
            {slides.map((_, i) => (
              <span 
                key={i} 
                className={`dot ${scrollIndex === i ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  splideRef.current?.go(i);
                }}
              />
            ))}
          </div>
        </>
      )}


    </div>
  );
}