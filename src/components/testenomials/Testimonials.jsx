import React from 'react';
import './Testimonials.css';

import one from '../../assets/one.svg';
import two from '../../assets/two.svg';
import three from '../../assets/three.svg';
import four from '../../assets/four.svg';
import five from '../../assets/five.svg';
import six from '../../assets/six.svg';

const columns = [
  [one, two, three],
  [four, five, six],
  [two, four, one],
];

// Flatten all images for mobile carousel
const allImages = [one, two, three, four, five, six];

const scrollSpeeds = [40, 40, 40];

const Testimonial = () => {
  return (
    <>
      <div style={{ color: "white", textAlign: "center" }}>
        <h2 className="heading">Testimonials</h2>
        <p className="subheading">From Pixels to Power Moves</p>
      </div>

      <div className="vtc-wrapper">

        <div className="vtc-fade-top" />
        <div className="vtc-fade-bottom" />

        {/* Desktop → 3 vertical columns */}
        <div className="vtc-columns desktop-only">
          {columns.map((columnImages, colIndex) => {
            const scrollClass = colIndex === 1 ? 'vtc-scroll-down' : 'vtc-scroll-up';

            return (
              <div className="vtc-column" key={colIndex}>
                <div
                  className={`vtc-scroll-track ${scrollClass}`}
                  style={{ animationDuration: `${scrollSpeeds[colIndex]}s` }}
                >
                  {[...columnImages, ...columnImages].map((img, idx) => (
                    <div className="vtc-image-wrapper" key={idx}>
                      <img src={img} alt={`testimonial-${colIndex}-${idx}`} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>



{/* Mobile → single horizontal infinite carousel */}
<div className="mobile-only">
  <div className="htc-scroll-container">
    <div
      className={`htc-scroll-track`}
      onTouchStart={(e) => e.currentTarget.classList.add("paused")}
      onTouchEnd={(e) => e.currentTarget.classList.remove("paused")}
      onMouseEnter={(e) => e.currentTarget.classList.add("paused")}   
      onMouseLeave={(e) => e.currentTarget.classList.remove("paused")}
    >
      {[...allImages, ...allImages].map((img, idx) => (
        <div className="htc-image-wrapper" key={idx}>
          <img src={img} alt={`testimonial-horizontal-${idx}`} />
        </div>
      ))}
    </div>
  </div>
</div>

</div>

     
    </>
  );
};

export default Testimonial;
