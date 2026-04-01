"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Show when scrolled past 70% of the page
      setIsVisible(scrollTop > docHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        group fixed bottom-8 right-8 z-50
        w-12 h-12 rounded-full
        border-[1.5px] border-[#333333]/40 bg-transparent sm:bg-white/80 backdrop-blur-sm
        flex items-center justify-center
        cursor-pointer overflow-hidden
        transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
        sm:hover:border-transparent sm:hover:scale-110
        active:scale-[0.90]
        ${isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      {/* Expanding circle background — matches FlowButton */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] rounded-full opacity-0 sm:group-hover:w-[120px] sm:group-hover:h-[120px] sm:group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]" />

      {/* Arrow icon */}
      <ArrowUp
        className="relative z-10 w-5 h-5 stroke-[#111111] sm:group-hover:stroke-white transition-colors duration-[600ms] ease-out"
        strokeWidth={2}
      />
    </button>
  );
}
