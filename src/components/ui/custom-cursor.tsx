"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    // Completely disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    
    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;

    const xSet = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const ySet = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });
    
    // For squish and stretch
    let mouseVelocity = 0;
    let lastMouseX = mouse.x;
    let lastMouseY = mouse.y;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Calculate velocity for stretch/squish
      const dx = mouse.x - lastMouseX;
      const dy = mouse.y - lastMouseY;
      mouseVelocity = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate angle for rotation
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (mouseVelocity > 0) {
        // Stretch based on velocity
        const stretch = Math.min(mouseVelocity * 0.015, 0.4);
        gsap.to(cursor, {
          scaleX: 1 + stretch,
          scaleY: 1 - stretch * 0.8,
          rotation: angle,
          duration: 0.2,
          overwrite: "auto",
        });
      } else {
        gsap.to(cursor, {
          scaleX: isHovering.current ? 4 : 1,
          scaleY: isHovering.current ? 4 : 1,
          rotation: 0,
          duration: 0.3,
          overwrite: "auto",
        });
      }

      xSet(mouse.x);
      ySet(mouse.y);
      
      // Show cursor on first move
      gsap.to(cursor, { scale: isHovering.current ? 4 : 1, opacity: 1, duration: 0.3 });

      lastMouseX = mouse.x;
      lastMouseY = mouse.y;
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      gsap.to(cursor, {
        scale: 4,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial setup for hover elements
    const updateHoverElements = () => {
      const hoverElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    updateHoverElements();

    // Create a MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      updateHoverElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      // Cleanup listeners (though mostly handled by GC on element removal)
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-0 pointer-events-none hidden lg:block"
      style={{ transformOrigin: "center center" }}
    />
  );
};
