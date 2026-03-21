import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TillNow.module.css';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { id: 1, label: 1, height: '460px', text: '300 Million+ Views' },
  { id: 2, label: 2, height: '360px', text: '4 Million+ Followers' },
  { id: 3, label: 3, height: '260px', text: '15+ Clients' },
  { id: 4, label: 4, height: '160px', text: '7+ Creative Team' }
];

// Split text into span elements for character-by-character animation
const splitText = (text) => {
  return text.split('').map((char, index) => (
    <span key={index} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }} className="split-char">
      {char}
    </span>
  ));
};

export default function TillNow() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'restart reset restart reset'
        },
        defaults: { ease: 'power3.out' }
      });

      // 1. Y and X axes - Even Slower and More Eased Out
      tl.from(['.gsap-y-axis', '.gsap-x-axis'], 
        { 
          height: (i, target) => target.classList.contains('gsap-y-axis') ? 0 : undefined,
          width: (i, target) => target.classList.contains('gsap-x-axis') ? 0 : undefined, 
          opacity: 0, 
          duration: 3.0, 
          ease: 'expo.out' 
        },
        0
      );

      // 2. Interleaved Animations for Each Bar Column - "Sweet spot" reveal speed
      const wrappers = sectionRef.current.querySelectorAll('.gsap-wrapper');
      
      wrappers.forEach((wrapper, index) => {
        const barLine = wrapper.querySelector('.gsap-line');
        const textElements = wrapper.querySelectorAll('.gsap-text-anim');
        
        // Sweet spot start (0.4s) and stagger (0.3s)
        const setStartTime = 0.4 + (index * 0.3); 

        // Animate Bar rising - Balanced speed
        tl.from(wrapper, {
          height: 0,
          opacity: 0,
          duration: 1.7,
          ease: 'expo.out'
        }, setStartTime);

        // Animate Line starting shortly after bar starts
        tl.from(barLine, {
          width: 0,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out'
        }, setStartTime + 0.15);

        // Animate Text Elements - Balanced blurred slide-in
        tl.from(textElements, {
          x: -20,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.4,
          stagger: 0.12,
          ease: 'power3.out'
        }, setStartTime + 0.45);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.chartArea}>
          {/* Y and X Axis lines and arrowheads */}
          <div className={`${styles.yAxis} gsap-y-axis`}>
             <div className={styles.yArrow}></div>
          </div>
          <div className={`${styles.xAxis} gsap-x-axis`}>
             <div className={styles.xArrow}></div>
          </div>
          
          <div className={styles.barsRow}>
            {data.map((item, index) => (
              <div 
                key={item.id}
                className={styles.barCol} 
                style={{ 
                  zIndex: 2 
                }}
              >
                <div 
                  className={`${styles.barWrapper} gsap-wrapper`} 
                  style={{ '--final-height': item.height }}
                >
                  {/* Sequential label 1, 2, 3, 4 */}
                  <span className={styles.badge}>{item.label}</span>
                  
                  {/* Custom Dashed Line */}
                  <div 
                    className={`${styles.customLine} gsap-line`} 
                    style={{ '--line-width': `${521 - (index * 122)}px` }}
                  >
                    <div className={styles.customCircle}></div>
                    <div className={styles.customArrow}></div>
                    {index === 0 && (
                      <span className={`${styles.sectionTitle} gsap-text-anim`}>
                        {splitText('Till Now')}
                      </span>
                    )}
                    <span className={`${styles.lineLabel} gsap-text-anim`}>
                      {splitText(item.text)}
                    </span>
                  </div>
                  
                  {/* Gradient Bar */}
                  <div className={styles.bar}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
