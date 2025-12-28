import React, { useState,useEffect } from "react";
import Marquee from "react-fast-marquee";
import "./VideoShowcase.css";
import thumb1 from "../../assets/thumb.jpg";
import img from "../../assets/Vector 5.png";
import img2 from "../../assets/Vector 6.png"


// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);
//   return isMobile;
// };


// const topRowVideos = [
//   {
//     id: 1,
//     src: "https://www.youtube.com/embed/ZDOj45zPcM",
//     poster: thumb1,
//     type: "youtube",
//   },
//   {
//     id: 2,
//     src:"https://www.youtube.com/embed/ZDOj45zYPcM",
//     poster: "/thumbs/thumb2.jpg",
//     type: "youtube",
//   },
//   {
//     id: 3,
//     src: "https://www.youtube.com/embed/7bq97gCh8V8",
//     poster: thumb1,
//     type: "youtube",
//   },
//   {
//     id: 4,
//     src: "https://www.youtube.com/embed/fJ9rUzIMcZQ?controls=0",
//     poster: "/thumbs/thumb4.jpg",
//     type: "youtube",
//   },
//   {
//     id: 5,
//     src: "https://www.youtube.com/embed/IcrbM1l_BoI?controls=0",
//     poster: "/thumbs/thumb5.jpg",
//     type: "youtube",
//   },
// ];

// const bottomRowVideos = [
//   {
//     id: 6,
//     src: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0",
//     poster: "/thumbs/thumb6.jpg",
//     type: "youtube",
//   },
//   {
//     id: 7,
//     src: "https://www.youtube.com/embed/2vjPBrBU-TM?controls=0",
//     poster: "/thumbs/thumb7.jpg",
//     type: "youtube",
//   },
//   {
//     id: 8,
//     src: "https://www.youtube.com/embed/6hzrDeceEKc?controls=0",
//     poster: "/thumbs/thumb8.jpg",
//     type: "youtube",
//   },
//   {
//     id: 9,
//     src: "https://www.youtube.com/embed/VPRjCeoBqrI?controls=0",
//     poster: "/thumbs/thumb9.jpg",
//     type: "youtube",
//   },
//   {
//     id: 10,
//     src: "https://www.youtube.com/embed/8UVNT4wvIGY?controls=0",
//     poster: "/thumbs/thumb10.jpg",
//     type: "youtube",
//   },
//   {
//     id: 11,
//     src: "https://www.youtube.com/embed/OPf0YbXqDm0?controls=0",
//     poster: "/thumbs/thumb11.jpg",
//     type: "youtube",
//   },
//   {
//     id: 12,
//     src: "https://www.youtube.com/embed/y6120QOlsfU?controls=0",
//     poster: "/thumbs/thumb12.jpg",
//     type: "youtube",
//   },
// ];


// const VideoRow = ({ videos, direction, horizontalIndex = null }) => {
//     const isMobile = useIsMobile();
// const [played, setPlayed] = useState({});
// const [hovered, setHovered] = useState({});

// const handlePlay = (id) => {
//   setPlayed((prev) => ({ ...prev, [id]: true }));
// };

// const handleHover = (id, isHovering) => {
//   setHovered((prev) => ({ ...prev, [id]: isHovering }));
// };

//   return (
//     <div className="carousel-row-custom">
//       <Marquee
//         speed={0}
//         gradient={false}
//         pauseOnHover
//         direction={direction}
//         loop={0}
//       >
//         {videos.map((video, idx) => (
//      <div
//   key={video.id}
//   className={`video-card ${idx === horizontalIndex ? "horizontal-card" : ""}`}
//   onMouseEnter={() => handleHover(video.id, true)}
//   onMouseLeave={() => handleHover(video.id, false)}
// >
//   {video.type === "youtube" ? (
//     played[video.id] && hovered[video.id] ? (
// <iframe
//   src={`${video.src}?autoplay=1&mute=0&modestbranding=1&rel=0&controls=0&showinfo=0`}
//   title={`YouTube Video ${video.id}`}


// />
//     ) : (
//       <img
//         src={video.poster}
//         alt="video thumbnail"
//         className="video-thumbnail"
//         style={{ width: "100%", cursor: "pointer" }}
//         onClick={() => handlePlay(video.id)}
//       />
//     )
//   ) : (
//     // Local video logic (if needed)
//     <video
//       src={video.src}
//       poster={video.poster}
//       muted
//       loop
//       preload="none"
//       onMouseEnter={(e) => e.target.play()}
//       onMouseLeave={(e) => e.target.pause()}
//     />
//   )}
// </div>
//         ))}
//       </Marquee>
//     </div>
//   );
// };

// export default function VideoShowcase() {
//   return (
//     <>
//       <div className="video-carousel-heading">
//         <div className="header">
//           <h2>Our Edits, Your Story</h2>

//           {/* Desktop Vector */}
//           <img className="img img-desktop" src={img} alt="vector desktop" />

     


//           <p>Results That Speak for Themselves.</p>
                 
//     <img className="img img-mobile" src={img2} alt="vector mobile" />
//         </div>
//       </div>

//       <div className="dual-carousel-container">
//         <VideoRow videos={topRowVideos} direction="left" horizontalIndex={2} />
//   <div className="bottom-row-container">
//     <VideoRow videos={bottomRowVideos} direction="right" />
//   </div>
//       </div>
//     </>
//   );
// }


import "./VideoShowcase.css";

const videos = [
  {
    id: 1,
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1",
    orientation: "vertical", // left screen (16:9)
  },
  {
    id: 2,
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    orientation: "horizontal", // center screen (9:16)
  },
  {
    id: 3,
    thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    orientation: "vertical", // right screen (16:9)
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <div className="header">
//           <h2>Our Edits, Your Story</h2>

//           {/* Desktop Vector */}
//           <img className="img img-desktop" src={img} alt="vector desktop" />



//           <p>Results That Speak for Themselves.</p>
                 
//     <img className="img img-mobile" src={img2} alt="vector mobile" />
//         </div>
//    
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="play-icon"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      ))}
    </div></>
  );

}  