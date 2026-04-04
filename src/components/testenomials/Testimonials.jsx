import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';
import './Testimonials.css';
import useScrollReveal from '../../hooks/useScrollReveal';

import one from '../../assets/1.svg';
import two from '../../assets/2.svg';
import three from '../../assets/3.svg';
import four from '../../assets/4.svg';
import six from '../../assets/6.svg';

const columns = [
  [one, two, three],
  [four, three, six],
  [two, four, one],
];

const allImages = [one, two, three, four, three, six];

const scrollDurations = [12, 10, 14]; // Duration for 50% scroll

const Testimonial = () => {
  const mainRef = useRef(null);
  const animations = useRef([]);
  const headingRef = useRef(null);
  useScrollReveal(headingRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray('.vtc-scroll-track');
      
      tracks.forEach((el, i) => {
        const isDown = (i === 1);
        const tl = gsap.fromTo(el, 
          { yPercent: isDown ? -50 : 0 },
          {
            yPercent: isDown ? 0 : -50,
            duration: scrollDurations[i] || 12,
            ease: "none",
            repeat: -1,
            paused: false,
            force3D: true
          }
        );
        animations.current[i] = tl;
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (i) => {
    const tl = animations.current[i];
    if (tl) gsap.to(tl, { timeScale: 0, duration: 0.6, ease: "power2.out" });
  };

  const handleMouseLeave = (i) => {
    const tl = animations.current[i];
    if (tl) gsap.to(tl, { timeScale: 1, duration: 0.6, ease: "power2.in" });
  };

  return (
    <div className='test' ref={mainRef} style={{ position: 'relative' }}>
      <div className="vtc-glow" />
      
      <div style={{ color: "white", textAlign: "center", position: "relative", zIndex: 1 }} ref={headingRef}>
        <h2 className="heading">Testimonials</h2>
        <p className="subheading">Doubt us. Regret later.</p>
      </div>

      <div className="vtc-wrapper">
        
        <div className="vtc-columns desktop-only">
          {columns.map((columnImages, colIndex) => (
            <div 
              className="vtc-column" 
              key={colIndex}
              onMouseEnter={() => handleMouseEnter(colIndex)}
              onMouseLeave={() => handleMouseLeave(colIndex)}
            >
              <div className="vtc-scroll-track">
                {[...columnImages, ...columnImages].map((img, idx) => (
                  <div className="vtc-image-wrapper" key={idx}>
                    <img src={img} alt={`testimonial-${colIndex}-${idx}`} draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-only">
          <Splide
            options={{
              type: 'loop',
              drag: 'free',
              focus: 'center',
              autoWidth: true,
              gap: '0px',
              arrows: false,
              pagination: false,
              dragThreshold: 0,
              snap: true,
              clones: 12,
              rewind: false,
              autoScroll: {
                speed: 1,
                pauseOnHover: true,
                pauseOnFocus: false,
              },
            }}
            extensions={{ AutoScroll }}
            className="mobile-testimonial-splide"
          >
            {[...allImages, ...allImages].map((img, idx) => (
              <SplideSlide key={idx}>
                <div className="htc-image-wrapper">
                  <img src={img} alt={`testimonial-horizontal-${idx}`} draggable={false} onContextMenu={(e) => e.preventDefault()} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
