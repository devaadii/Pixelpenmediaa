import React from "react";
import "./PackagesSection.css";

const PackagesSection = () => {
  return (
    <div className="packages-wrapper">
      <h2 className="heading" style={{position:"relative", right:"5px"}}>Two Packages</h2>
      <p className="subheading">Endless Possibilities</p>

      <div className="packages-grid">

        <div className="package-card">
          <div className="ribbon">Popular</div>
          <h3 className="package-title">PixelPen Pro</h3>
          <ul className="package-features">
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span>
                <span style={{ maxWidth: "300px" }}>
                  High-Quality Video Editing for <b>Reels, Long-form Content & Podcasts</b>
                </span>
              </span>
            </li>
             <li>
              <span className="arrow">➜</span> <b>Click-Worthy</b> Thumbnails
            </li>
            <li>
              <span className="arrow">➜</span> Fast <b>Turnarounds</b>
            </li>
            <li>
              <span className="arrow">➜</span> <b>Flawless</b> Output
            </li>
          </ul>
                <a href="https://calendly.com/pixelpenmedia-in/30min">
          <button className="book-btn">Book a Call</button></a>
        </div>

        {/* Package 2 */}
        <div className="package-card elite">
          <h3 className="package-title">PixelPen Elite</h3>
          <ul className="package-features">
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span>
                <span style={{ maxWidth: "300px" }}>
                  <b>Pro-Level</b> Editing for Reels, Long-form Content & Podcasts
                </span>
              </span>
            </li>
            <li>
              <span className="arrow">➜</span> <b>Click-Worthy</b> Thumbnails
            </li>
            <li>
              <span className="arrow">➜</span> Fast <b>Turnarounds</b>
            </li>
            <li>
              <span className="arrow">➜</span> <b>Flawless</b> Output
            </li>
            <li>
              <span className="arrow">➜</span> <b>Scriptwriting</b> That Converts
            </li>
            <li>
              <span style={{ display: "inline-flex", gap: "5px", alignItems: "flex-start" }}>
                <span className="arrow">➜</span>
                <span style={{ maxWidth: "200px" }}>
                  <b>Content Strategy</b> Tailored for Results
                </span>
              </span>
            </li>
          </ul>
          <a href="https://calendly.com/pixelpenmedia-in/30min">
          <button className="book-btn">Book a Call</button></a>
        </div>
      </div>
    </div>
  );
};

export default PackagesSection;