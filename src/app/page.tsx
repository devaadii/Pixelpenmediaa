"use client";

import { FlowButton } from "@/components/ui/flow-button";
import { SplitText } from "@/components/ui/split-text";
import { VideoPlayer } from "@/components/ui/video-player";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-[35px] pb-8">
      <header className="flex flex-col sm:flex-row justify-between items-start w-full px-[35px] gap-8">
        <div className="flex flex-col gap-6 text-left">
          <div className="relative inline-block w-fit">
            {/* ASCII Corners */}
            <span className="absolute -top-2 -right-4 text-xs font-mono ascii-element opacity-0">┐</span>
            <span className="absolute -bottom-2 -right-4 text-xs font-mono ascii-element opacity-0">┘</span>
            
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-medium uppercase tracking-tight leading-[0.9] text-[#171717] flex flex-col w-full">
              <span><SplitText text="Pixelpen Media" /></span>
              <span className="flex items-center w-full whitespace-nowrap">
                <SplitText text="Portfolio" />
                <span className="flex-1 ml-4 sm:ml-8 flex items-center relative h-6 hero-arrow opacity-0">
                  {/* Shaft */}
                  <span className="absolute inset-y-1/2 left-0 right-[2px] h-[2px] -translate-y-1/2 bg-[#171717] rounded-full"></span>
                  {/* Arrowhead ending exactly at the right edge */}
                  <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-[#171717]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 18l7-6-7-6" />
                  </svg>
                </span>
              </span>
            </h1>
          </div>
          <p className="text-lg sm:text-2xl text-[#333333] font-medium mt-0 leading-relaxed font-['Clash_Display',sans-serif] lg:whitespace-nowrap">
            <SplitText text="We edit Goated Videos for Finance Creators & Companies." className="hero-subheader" />
          </p>
        </div>
        <div className="sm:mt-4 flex flex-col gap-3 items-start sm:items-end button-container">
          <div className="opacity-0 translate-y-6 hero-btn">
            <FlowButton text="Book a Call" href="https://calendly.com/pixelpenmedia-in/30min" />
          </div>
          <div className="opacity-0 translate-y-6 hero-btn">
            <FlowButton text="Visit Site" href="https://pixelpen.in/" />
          </div>
        </div>
      </header>
      
      <div className="hero-divider mt-10 sm:mt-16 mx-[35px] h-[1px] bg-[#171717]/20 origin-left scale-x-0" />

      <div className="mt-10 sm:mt-16 mb-8 sm:mb-12 mr-[35px] text-right section-reveal">
        <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight font-['Clash_Display',sans-serif] leading-none text-[#171717]">
          <span className="text-xs font-mono ascii-element opacity-0 align-middle mr-2 tabular-nums">[ 01 ]</span>
          <SplitText text="Finance" /><br /><SplitText text="Reel Edits" />
        </h2>
      </div>

      <section className="px-[35px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 video-grid">
        {[
          { src: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775035924/vid_1_bavljm.mp4", poster: "/thumbs/RT_3.png" },
          { src: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775035326/vid_3_lydvry.mp4", poster: "/thumbs/RT_2.png" },
          { src: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775035719/vid_2_wcebep.mp4", poster: "/thumbs/RT_1.png" },
          { src: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1774424026/Its_you_vs_you_upl1ck.mp4" },
          { src: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775036293/vid_5_vedtz4.mp4" },
        ].map((video, t) => (
          <div 
            key={t} 
            data-cursor={video.src ? undefined : "pointer"}
            className={`group relative aspect-[9/16] bg-[#171717]/5 rounded-none border border-[#333333] ${!video.src ? 'flex items-center justify-center' : ''} text-[#171717]/30 text-xs italic transition-colors hover:bg-[#171717]/10 video-card overflow-hidden`}
          >
            {video.src ? (
              <VideoPlayer src={video.src} poster={video.poster} />
            ) : (
              <>
                {/* ASCII Corners */}
                <span className="absolute -top-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -top-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                Video {t + 1}
              </>
            )}
          </div>
        ))}
      </section>

      {/* Long Form Section */}
      <div className="line-reveal-left mt-10 sm:mt-16 mx-[35px] h-[1px] bg-[#171717]/20 origin-left scale-x-0" />
      
      <div className="mt-10 sm:mt-16 mb-8 sm:mb-12 ml-[35px] text-left section-reveal">
        <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight font-['Clash_Display',sans-serif] leading-none text-[#171717]">
          <SplitText text="Finance" /> <span className="text-xs font-mono ascii-element opacity-0 align-middle tabular-nums">[ 02 ]</span><br /><SplitText text="Long Form Edits" />
        </h2>
      </div>

      <section className="px-[35px] grid grid-cols-1 sm:grid-cols-3 gap-6 video-grid">
        {[
          { src: "https://www.youtube.com/watch?v=WVAexif-TNY", isYoutube: true },
          { src: "https://www.youtube.com/watch?v=H1sop0gfea4", isYoutube: true },
          { src: "https://www.youtube.com/watch?v=SbkwQ1QPeV8", isYoutube: true },
        ].map((video, i) => (
          <div 
            key={i} 
            data-cursor={video.src ? undefined : "pointer"}
            className={`group relative aspect-video bg-[#171717]/5 rounded-none border border-[#333333] ${!video.src ? 'flex items-center justify-center' : ''} text-[#171717]/30 text-xs italic transition-colors hover:bg-[#171717]/10 video-card overflow-hidden`}
          >
            {video.src ? (
              <VideoPlayer src={video.src} isYoutube={video.isYoutube} />
            ) : (
              <>
                {/* ASCII Corners */}
                <span className="absolute -top-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -top-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                Long Form Video {i + 1}
              </>
            )}
          </div>
        ))}
      </section>

      {/* Podcast Section */}
      <div className="line-reveal-right mt-10 sm:mt-16 mx-[35px] h-[1px] bg-[#171717]/20 origin-right scale-x-0" />
      
      <div className="mt-10 sm:mt-16 mb-8 sm:mb-12 mr-[35px] text-right section-reveal">
        <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight font-['Clash_Display',sans-serif] leading-none text-[#171717]">
          <span className="text-xs font-mono ascii-element opacity-0 align-middle mr-2 tabular-nums">[ 03 ]</span>
          <SplitText text="Podcast" /><br /><SplitText text="Edits" />
        </h2>
      </div>

      <section className="px-[35px] grid grid-cols-1 sm:grid-cols-3 gap-6 video-grid">
        {[
          { src: "https://www.youtube.com/watch?v=Bn-YcuMZ1Fw", isYoutube: true },
          { src: "https://www.youtube.com/watch?v=xmu5Nm1HlBw", isYoutube: true },
          { src: "https://www.youtube.com/watch?v=0lkMRGRitTU&t=2s", isYoutube: true },
        ].map((video, i) => (
          <div 
            key={i} 
            data-cursor={video.src ? undefined : "pointer"}
            className={`group relative aspect-video bg-[#171717]/5 rounded-none border border-[#333333] ${!video.src ? 'flex items-center justify-center' : ''} text-[#171717]/30 text-xs italic transition-colors hover:bg-[#171717]/10 video-card overflow-hidden`}
          >
            {video.src ? (
              <VideoPlayer src={video.src} isYoutube={video.isYoutube} />
            ) : (
              <>
                {/* ASCII Corners */}
                <span className="absolute -top-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -top-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                Podcast Video {i + 1}
              </>
            )}
          </div>
        ))}
      </section>

      {/* SAAS Section */}
      <div className="line-reveal-left mt-10 sm:mt-16 mx-[35px] h-[1px] bg-[#171717]/20 origin-left scale-x-0" />
      
      <div className="mt-10 sm:mt-16 mb-8 sm:mb-12 ml-[35px] text-left section-reveal">
        <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight font-['Clash_Display',sans-serif] leading-none text-[#171717]">
          <SplitText text="SaaS" /> <span className="text-xs font-mono ascii-element opacity-0 align-middle tabular-nums">[ 04 ]</span><br /><SplitText text="Explainers" />
        </h2>
      </div>

      <section className="px-[35px] grid grid-cols-1 sm:grid-cols-4 gap-6 video-grid">
        {/* One Horizontal + Tagline Bundle */}
        <div className="sm:col-span-2 flex flex-col h-full">
          <div 
            className="group relative aspect-video bg-[#171717]/5 rounded-none border border-[#333333] text-[#171717]/30 text-xs italic transition-colors hover:bg-[#171717]/10 video-card overflow-hidden"
          >
            <VideoPlayer src="https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775042411/saas1_mspbhj.mp4" isYoutube={false} poster="/thumbs/THUMB1.png" />
          </div>

          <div className="section-reveal mt-auto hidden sm:block">
            <h3 className="text-4xl sm:text-7xl lg:text-[105px] font-medium tracking-tight leading-[0.7] text-[#171717]">
              <span className="inline-block translate-y-2 sm:translate-y-4">
                <SplitText text="Escape" />
              </span>
              <br />
              <SplitText text="Mediocrity." />
            </h3>
          </div>
        </div>
        
        {/* Two Verticals */}
        {[
          { src: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775041864/CoinDCX_Crypto_Options_4th_Draft_zyconw.mp4", isYoutube: false, poster: "/thumbs/THUMB2.png" },
          { src: "https://res.cloudinary.com/dehknfmqf/video/upload/q_auto/f_auto/v1775042668/CoinDCX_US_Stock_Futures_Announcement_1st_dvpwro.mp4", isYoutube: false, poster: "/thumbs/THUMB3.png" }
        ].map((video, i) => (
          <div 
            key={i} 
            data-cursor={video.src ? undefined : "pointer"}
            className={`group relative sm:col-span-1 aspect-[9/16] bg-[#171717]/5 rounded-none border border-[#333333] ${!video.src ? 'flex items-center justify-center' : ''} text-[#171717]/30 text-xs italic transition-colors hover:bg-[#171717]/10 video-card overflow-hidden`}
          >
            {video.src ? (
              <VideoPlayer src={video.src} isYoutube={video.isYoutube} poster={video.poster} />
            ) : (
              <>
                <span className="absolute -top-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -top-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -left-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                <span className="absolute -bottom-1 -right-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+</span>
                Vertical Promo {i + 1}
              </>
            )}
          </div>
        ))}
      </section>

      {/* Footer */}
      <div className="mt-10 sm:mt-16 mx-[35px] h-[1px] bg-[#171717]/20" />
      
      <footer className="py-12 flex flex-col items-center justify-center gap-2">
        <p className="text-[10px] font-mono ascii-element opacity-0 uppercase tracking-tighter">
          SYSTEM_STATUS: ACTIVE // PIXELPEN_V1.0.4
        </p>
        <p className="text-xs sm:text-sm text-[#171717]/40 font-medium tracking-widest font-['Clash_Display',sans-serif]">
          © 2024 Pixelpen Media. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
