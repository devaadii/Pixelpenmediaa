import React from 'react';
import styles from './TillNow.module.css';

const data = [
  { id: 1, label: 1, height: '460px', text: '300 Million+ Views' },
  { id: 2, label: 2, height: '360px', text: '4 Million+ Followers' },
  { id: 3, label: 3, height: '260px', text: '15+ Clients' },
  { id: 4, label: 4, height: '160px', text: '7+ Creative Team' }
];

export default function TillNow() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.chartArea}>
          {/* Y and X Axis lines and arrowheads */}
          <div className={styles.yAxis}>
             <div className={styles.yArrow}></div>
          </div>
          <div className={styles.xAxis}>
             <div className={styles.xArrow}></div>
          </div>
          
          <div className={styles.barsRow}>
            {data.map((item, index) => (
              <div 
                key={item.id}
                className={styles.barCol} 
                style={{ 
                  '--final-height': item.height, 
                  zIndex: 2 
                }}
              >
                <div className={styles.barWrapper}>
                  {/* Sequential label 1, 2, 3, 4 */}
                  <span className={styles.badge}>{item.label}</span>
                  
                  {/* Custom Dashed Line (aligned to be same on right) */}
                    <div className={styles.customLine} style={{ '--line-width': `${521 - (index * 122)}px` }}>
                      <div className={styles.customCircle}></div>
                      <div className={styles.customArrow}></div>
                      {index === 0 && (
                        <span className={styles.sectionTitle}>Till Now</span>
                      )}
                      <span className={styles.lineLabel}>{item.text}</span>
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
