import React, { useState, useEffect, useRef } from "react";
import img1 from "../../../assets/thumb.jpg";
import img from "../../../assets/Vector 5.png";
import img2 from "../../../assets/Vector 6.png";

const slides = [
  { orientation: "vertical", thumbnail: img1, videoSrc: "VAUGJjjH-5M" },
  { orientation: "vertical", thumbnail: img1, videoSrc: "K_iLudbzUPw" },
  { orientation: "horizontal", videoSrc: "lRMTZnawla8" },
  { orientation: "vertical", thumbnail: img1, videoSrc: "_IBQoPZC5OU" },
  { orientation: "vertical", thumbnail: img1, videoSrc: "oQQx64Io9I0" },
];

/* 🔹 MOBILE CHECK (logic only) */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};

export default function CustomCarousel() {
  const isMobile = useIsMobile(); // 👈 added
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  /* ---------- Load YouTube API (unchanged) ---------- */
  useEffect(() => {
    if (window.YT && window.YT.Player) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  /* ---------- Player logic (fixed IDs only) ---------- */
  useEffect(() => {
if (currentIndex === null || !isPlaying) return;
if (!document.getElementById(
  isMobile
    ? `yt-player-mobile-${currentIndex}`
    : `yt-player-${currentIndex}`
)) {
  return;
}

    const playerId = isMobile
      ? `yt-player-mobile-${currentIndex}`
      : `yt-player-${currentIndex}`; // desktop keeps original id

    const createPlayer = () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }

      playerRef.current = new YT.Player(playerId, {
        videoId: slides[currentIndex].videoSrc,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          controls: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => event.target.playVideo(),
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) stopVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) createPlayer();
    else window.onYouTubeIframeAPIReady = createPlayer;

    return () => stopVideo();
  }, [isPlaying, currentIndex, isMobile]);

  const stopVideo = () => {
    if (playerRef.current) {
      try {
        playerRef.current.stopVideo();
        playerRef.current.destroy();
      } catch {}
      playerRef.current = null;
    }
    setIsPlaying(false);
    setCurrentIndex(null);
  };

const handleThumbnailClick = (index) => {
  // If a video is already playing, stop it first
  if (isPlaying) {
    stopVideo();
  }

  // Small delay ensures DOM updates before YT attaches
  setTimeout(() => {
    setCurrentIndex(index);
    setIsPlaying(true);
  }, 0);
};

  return (
    <div className="custom-carousel-container">
      {/* ---------- Header (unchanged) ---------- */}
      <div className="video-carousel-heading">
        <div className="header">
          <h2>Our Edits, Your Story</h2>
          <img className="img img-desktop" src={img} alt="" />
          <p>Results That Speak for Themselves.</p>
          <img className="img img-mobile" src={img2} alt="" />
        </div>
      </div>

      {/* ========== DESKTOP (unchanged markup) ========== */}
      {!isMobile && (
        <div className="custom-desktop-layout">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`desktop-screen ${
                slide.orientation === "vertical"
                  ? "desktop-vertical"
                  : "desktop-horizontal"
              }`}
            >
              {isPlaying && index === currentIndex ? (
                <div className="video-wrapper">
                  <div id={`yt-player-${index}`} className="player-host" />
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
                    src={`https://img.youtube.com/vi/${slide.videoSrc}/hqdefault.jpg`}
                    className="custom-carousel-video-thumb"
                    alt=""
                  />
                  <div className="custom-carousel-play-button">▶</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ========== MOBILE (unchanged markup) ========== */}
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
      .filter(s => s.orientation === "vertical").length;

    rotation = verticalIndex % 2 === 0 ? "-3deg" : "3deg";
  }

  return (
    <div
      key={idx}
      className={`mobile-video-item ${
        slide.orientation === "vertical"
          ? "mobile-vertical"
          : "mobile-horizontal"
      } ${isPlaying && idx === currentIndex ? "playing" : ""}`}
      style={{
        transform: `rotate(${rotation})`,
        transition: "transform 0.3s ease",
      }}
    >
      {isPlaying && idx === currentIndex ? (
        <div className="video-wrapper-no-transform">
          <div
            id={`yt-player-mobile-${idx}`}
            className="player-host"
          />
          <button className="custom-carousel-close" onClick={stopVideo}>
            ✕
          </button>
        </div>
      ) : (
        <div
          className="custom-carousel-thumb-wrapper mobile-thumb"
          onClick={() => handleThumbnailClick(idx)}
        >
          <img
            src={`https://img.youtube.com/vi/${slide.videoSrc}/hqdefault.jpg`}
            className="custom-carousel-video-thumb"
            alt=""
          />
          <div className="custom-carousel-play-button">▶</div>
        </div>
      )}
    </div>
  );
})}
        </div>
      )}
 <style jsx>{`
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

      {/* ⛔ YOUR ORIGINAL <style jsx> BLOCK GOES HERE UNCHANGED */}
    </div>
  );
}

     