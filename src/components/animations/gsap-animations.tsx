"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const GSAPAnimations = () => {
  useEffect(() => {
    // Initial entrance timeline
    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.2 }
    });

    // 1. Main title characters (starts at 0.2s)
    tl.to("h1 .reveal-content", {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1.2
    }, 0.2);

    // 1.1 ASCII corners in header (reveal with title)
    tl.to("header .ascii-element", {
      opacity: 0.4,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.2
    }, 0.8);

    // 1.2 Hero arrow reveal - Movement (Liquid Spring Bounce)
    tl.fromTo(".hero-arrow", 
      { x: "-100vw" },
      {
        x: 0,
        duration: 2.2,
        ease: "elastic.out(1, 0.75)"
      }, "<0.3");  

    // 1.3 Hero arrow - Opacity
    tl.fromTo(".hero-arrow", 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut"
      }, "<0.1");  


    // 2. Subheader characters (starts just after title begins)
    tl.to(".hero-subheader .reveal-content", {
      y: 0,
      opacity: 1,
      stagger: 0.025,
      duration: 0.8
    }, 0.5);

    // 3. Buttons — smooth fade+slide with delay between each
    tl.to(".hero-btn:first-child", {
      y: 0,
      opacity: 1,
      duration: 1.6,
      ease: "power3.out"
    }, 0.3);
    tl.to(".hero-btn:last-child", {
      y: 0,
      opacity: 1,
      duration: 1.6,
      ease: "power3.out"
    }, 0.7);

    // 4. Hero divider line — left to right sweep (slower)
    tl.to(".hero-divider", {
      scaleX: 1,
      duration: 1.8,
      ease: "power2.inOut"
    }, 1.0);

    // 5. ScrollTrigger line reveals (left-to-right and right-to-left)
    document.querySelectorAll(".line-reveal-left").forEach((line) => {
      gsap.to(line, {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
        }
      });
    });
    document.querySelectorAll(".line-reveal-right").forEach((line) => {
      gsap.to(line, {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
        }
      });
    });

    // 3. ScrollTrigger reveals for section headings (characters)
    const sections = document.querySelectorAll(".section-reveal");
    sections.forEach((section) => {
      const chars = section.querySelectorAll(".reveal-content");
      if (chars.length > 0) {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        });
        
        // Also reveal the ASCII section number if it exists
        const asciiNum = section.querySelector(".ascii-element");
        if (asciiNum) {
          gsap.to(asciiNum, {
            opacity: 0.4,
            duration: 1,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            }
          });
        }
        
        // Also ensure the container itself is visible if it has other content
        gsap.to(section, { opacity: 1, duration: 0.1, scrollTrigger: { trigger: section, start: "top 85%" } });
      } else {
        gsap.fromTo(section, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            }
          }
        );
      }
    });

    // 5. Video cards — smooth butter cascade
    const allGrids = document.querySelectorAll(".video-grid");
    allGrids.forEach((grid, index) => {
      const cards = grid.querySelectorAll(".video-card");
      if (cards.length === 0) return;

      if (index === 0) {
        // First grid is above the fold → part of the hero entrance timeline
        // Plays after divider line starts sweeping
        tl.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.25,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(cards, { willChange: "auto" });
          },
        }, 1.2);
      } else {
        // Below-fold grids → ScrollTrigger
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1.6,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
          },
          onComplete: () => {
            gsap.set(cards, { willChange: "auto" });
          },
        });
      }
    });

    // 6. Footer ASCII reveal
    gsap.to("footer .ascii-element", {
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "footer",
        start: "top 95%",
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
};
