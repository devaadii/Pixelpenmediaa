import React, { useRef } from "react";
import "./ourstory.css";
import TillNow from "../tillnow/TillNow";
import useScrollReveal from "../../hooks/useScrollReveal";

const OurStory = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  // Animate only the heading, keeping TillNow isolated
  useScrollReveal(headingRef, { delay: 0.4 });

  return (
    <div className="ourStory" ref={sectionRef}>
      <div ref={headingRef}>
        <h2 className="heading1">Our Story</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <TillNow />
      </div>
    </div>
  );
};

export default OurStory;