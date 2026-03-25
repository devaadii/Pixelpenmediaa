import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TillNow.module.css';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { id: 1, label: 1, height: '460px', text: '300 Million+ Views', stat: '300M+', desc: 'Views', value: 300, suffix: 'M+' },
  { id: 2, label: 2, height: '360px', text: '4 Million+ Followers', stat: '4M+', desc: 'Followers', value: 4, suffix: 'M+' },
  { id: 3, label: 3, height: '260px', text: '15+ Clients', stat: '15+', desc: 'Clients', value: 15, suffix: '+' },
  { id: 4, label: 4, height: '160px', text: '7+ Creative Team', stat: '7+', desc: 'Creative Team', value: 7, suffix: '+' }
];

// Split text into span elements for character-by-character animation
const splitText = (text) => {
  return text.split('').map((char, index) => (
    <span key={index} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }} className="split-char">
      {char}
    </span>
  ));
};

/* ─── Mobile Check Hook ─── */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

export default function TillNow() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        /* ──── Mobile: Stat card stagger animation ──── */
        const gridEl = cardsRef.current;
        if (!gridEl) return;
        const cards = gridEl.querySelectorAll('.stat-card');
        if (!cards || cards.length === 0) return;

        // Set initial hidden state
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.92 });

        ScrollTrigger.create({
          trigger: gridEl,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              clearProps: 'transform,filter',
              onStart: () => {
                cards.forEach((card, i) => {
                  const numEl = card.querySelector('h3');
                  if (!numEl) return;
                  const target = data[i].value;
                  const suffix = data[i].suffix || '';
                  const counter = { val: 0 };
                  gsap.to(counter, {
                    val: target,
                    duration: 2,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                      numEl.textContent = Math.floor(counter.val) + suffix;
                    }
                  });
                });
              }
            });
          },
        });
      } else {
        /* ──── Desktop: Original chart animation ──── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'restart reset restart reset'
          },
          defaults: { ease: 'power3.out' }
        });

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

        const wrappers = sectionRef.current.querySelectorAll('.gsap-wrapper');
        
        wrappers.forEach((wrapper, index) => {
          const barLine = wrapper.querySelector('.gsap-line');
          const textElements = wrapper.querySelectorAll('.gsap-text-anim');
          
          const setStartTime = 0.4 + (index * 0.3); 

          tl.from(wrapper, {
            height: 0,
            opacity: 0,
            duration: 1.7,
            ease: 'expo.out'
          }, setStartTime);

          tl.from(barLine, {
            width: 0,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
          }, setStartTime + 0.15);

          tl.from(textElements, {
            x: -20,
            opacity: 0,
            filter: 'blur(12px)',
            duration: 1.4,
            stagger: 0.12,
            ease: 'power3.out'
          }, setStartTime + 0.45);
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* ──── Mobile: Stat Cards ──── */}
      {isMobile && (
        <div className={styles.statsGrid} ref={cardsRef}>
          {data.map((item) => (
            <div key={item.id} className={`${styles.statCard} stat-card`}>
              <span>
                <h3 className={styles.cardStat}>
                  0{item.suffix}
                </h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ──── Desktop: Original Chart ──── */}
      {!isMobile && (
        <div className={styles.container}>
          <div className={styles.chartArea}>
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
                    <span className={styles.badge}>{item.label}</span>
                    
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
                    
                    <div className={styles.bar}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
