import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — Smooth scroll-triggered entrance animation.
 *
 * @param {React.RefObject} ref - Ref to the container element.
 * @param {Object} options
 * @param {number} options.y - Starting Y offset in px (default: 40).
 * @param {number} options.duration - Animation duration in seconds (default: 1).
 * @param {number} options.stagger - Stagger between children in seconds (default: 0.15).
 * @param {number} options.delay - Delay before animation starts in seconds (default: 0).
 * @param {string} options.start - ScrollTrigger start position (default: "top 85%").
 */
export default function useScrollReveal(ref, options = {}) {
  const {
    y = 40,
    duration = 1,
    stagger = 0.15,
    delay = 0,
    start = 'top 85%',
    blur = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Animate direct children only
    const targets = Array.from(el.children);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          ...(blur && { filter: 'blur(4px)' }),
        },
        {
          opacity: 1,
          y: 0,
          ...(blur && { filter: 'blur(0px)' }),
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);
}
