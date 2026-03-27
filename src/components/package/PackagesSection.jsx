import React, { useRef } from "react";
import "./PackagesSection.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const PackagesSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useScrollReveal(sectionRef);
  useScrollReveal(gridRef, { delay: 0.3 }); // Stagger the cards right after the heading

  return (
    <div className="packages-wrapper" ref={sectionRef}>
      {/* Side Blurs */}
      <img src="/testimonial-side-blur.svg" className="package-side-blur left" alt="" draggable={false} onContextMenu={(e) => e.preventDefault()} />
      <img src="/testimonial-side-blur.svg" className="package-side-blur right" alt="" draggable={false} onContextMenu={(e) => e.preventDefault()} />
      <h2 className="heading">Two Packages</h2>
      <p className="subheading">Endless Possibilities</p>

      <div className="packages-grid" ref={gridRef}>

        <div className="package-card">
          <div className="badge-popular">Popular</div>
          <h3 className="package-title">PixelPen Pro</h3>
          <ul className="package-features">
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span>
                <span style={{ maxWidth: "300px" }}>
                  <b>Scroll-stopping Reels.</b>
                </span>
              </span>
            </li>
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span> <span style={{ maxWidth: "300px" }}>
                  <b>Long-form Content</b> edited for <b>Watch Time.</b>
                </span>
              </span>
            </li>
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span> <span style={{ maxWidth: "300px" }}>
                  <b>Personalized branding</b> that feels uniquely you.
                </span>
              </span>
            </li>

            <li>
              <span className="arrow">➜</span> <b>Click-Worthy</b> Thumbnails.
            </li>
            <li>
              <span className="arrow">➜</span> Delivered in <b>48 Hours.</b>
            </li>

          </ul>
          <a href="https://calendly.com/pixelpenmedia-in/30min" target="_blank" rel="noopener noreferrer">
            <button className="book-btn">Book a Call</button></a>
        </div>

        {/* Package 2 */}
        <div className="package-card1 elite">
          <h3 className="package-title">PixelPen Elite</h3>
          <ul className="package-features">
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span>
                <span style={{ maxWidth: "300px" }}>
                  <b>Top Notch</b> Editing for Reels, Long-form Content & Podcasts.
                </span>
              </span>
            </li>
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span> <span style={{ maxWidth: "300px" }}>
                  <b>Personalized branding</b> that feels uniquely you.
                </span>
              </span>
            </li>
            {/* <li>
              <span className="arrow">➜</span> <b>Scriptwriting</b> That Converts
            </li> */}

            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span>
                <span style={{ maxWidth: "200px" }}>
                  <b>Content Strategy</b> Tailored for Results.
                </span>
              </span>
            </li>
            <li>
              <span className="arrow">➜</span> <b>Click-Worthy</b> Thumbnails.
            </li>
            <li>
              <span className="arrow">➜</span> Delivered in <b>29 Hours.</b>
            </li>
            <li>
              <span className="arrow">➜</span> Dedicated <b>Top-notch Editors.</b>
            </li>


          </ul>
          <a href="https://calendly.com/pixelpenmedia-in/30min" target="_blank" rel="noopener noreferrer">
            <button className="book-btn">Book a Call</button></a>
        </div>
      </div>
    </div>
  );
};

export default PackagesSection;