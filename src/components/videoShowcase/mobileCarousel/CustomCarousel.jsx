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
    videoSrc: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1774425997/namita_final_edit_GOATED_1_vr6rlg.mp4",
  },
  {
    orientation: "vertical",
    thumbnail: "/tn_2.png",
    videoSrc: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1767528720/animation_web_nzmjsg.mp4",
  },
  {
    orientation: "horizontal",
    thumbnail: "/thumb_3.png",
    videoSrc: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775114992/long_jgkc50.mp4",
  },
  {
    orientation: "vertical",
    thumbnail: "/tn_4.png",
    videoSrc: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1774424026/Its_you_vs_you_upl1ck.mp4",
  },  {
    orientation: "vertical",
    thumbnail: "/tn_5.png",
    videoSrc: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1767528735/Astrakhan_Web_j52ksd.mp4",
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
  const [playingIndex, setPlayingIndex] = useState(null);
  const [activatedIndices, setActivatedIndices] = useState(new Set());
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

  const handleTogglePlay = (index) => {
    const isCurrentlyPlaying = playingIndex === index;

    if (isCurrentlyPlaying) {
      // Pause current
      if (videoRefs.current[index]) {
        videoRefs.current[index].pause();
      }
      setPlayingIndex(null);
    } else {
      // Pause any other playing video
      if (playingIndex !== null && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex].pause();
      }
      
      // Update activated set
      setActivatedIndices((prev) => new Set(prev).add(index));
      setPlayingIndex(index);
      
      // Ensure specific video plays
      setTimeout(() => {
        if (videoRefs.current[index] && slides[index].videoSrc) {
          videoRefs.current[index].play().catch(err => console.log("Play error:", err));
        }
      }, 0);
    }
    
    // For hover/tap control visibility
    setShowControls(true);
    resetControlsTimeout();
    
    // Liquidy Bounce Effect
    const btn = document.querySelectorAll('.modern-control-btn')[index];
    if (btn) {
      gsap.fromTo(btn, 
        { scale: 0.8, filter: 'blur(6px)', opacity: 0.5 }, 
        { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 0.8, ease: "elastic.out(1.2, 0.4)" }
      );
    }
  };

  const handleVideoEnded = (index) => {
    setPlayingIndex(null);
    setShowControls(false);
  };

  return (
    <div className="custom-carousel-container">
      <div className="video-carousel-heading" ref={headingRef}>
        <div className="header">
          <h2>Our Edits, Your Story</h2>
          <img className="img img-desktop" src={img} alt="" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          <p>Proof looks better in motion.</p>
          <img className="img img-mobile" src={img2} alt="" draggable={false} onContextMenu={(e) => e.preventDefault()} />
        </div>
      </div>

      {!isMobile && (
        <div className="custom-desktop-layout" ref={layoutRef}>
          {slides.map((slide, index) => (
            <div key={index} className={`iphone-shell ${slide.orientation === "vertical" ? "desktop-vertical" : "desktop-horizontal"}`}>
              <img src={slide.orientation === "horizontal" ? LiphoneFrame : iphoneFrame} className="iphone-frame-img" alt="" draggable={false} onContextMenu={(e) => e.preventDefault()} />
              <div className="desktop-screen-inner" onClick={() => handleTogglePlay(index)}>
                {/* Thumbnail Layer (Always present as a bridge/background) */}
                <img
                  src={slide.thumbnail}
                  className="custom-carousel-video-thumb absolute-inset"
                  alt=""
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Video Layer (Mounted only when activated) */}
                {activatedIndices.has(index) && slide.videoSrc && (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={slide.videoSrc}
                    poster={slide.thumbnail}
                    className="player-host absolute-inset"
                    playsInline
                    onEnded={() => handleVideoEnded(index)}
                  />
                )}

                {/* Controls Layer */}
                <div className={`modern-control-btn ${playingIndex === index ? (showControls ? "visible" : "hidden") : "visible"}`}>
                  {playingIndex === index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </div>
  </div>

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
                    } ${playingIndex === idx ? "playing" : ""}`}
                >
                  <img
                    src={slide.orientation === "horizontal" ? LiphoneFrame : iphoneFrame}
                    className="iphone-frame-img"
                    alt=""
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />

                  <div className="mobile-screen-inner" onClick={() => handleTogglePlay(idx)}>
                    <img
                      src={slide.thumbnail}
                      className="custom-carousel-video-thumb absolute-inset"
                      alt=""
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />

                    {activatedIndices.has(idx) && slide.videoSrc && (
                      <video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        src={slide.videoSrc}
                        poster={slide.thumbnail}
                        className="player-host absolute-inset"
                        playsInline
                        onEnded={() => handleVideoEnded(idx)}
                      />
                    )}

                    <div className={`modern-control-btn ${playingIndex === idx ? (showControls ? "visible" : "hidden") : "visible"}`}>
                      {playingIndex === idx ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
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