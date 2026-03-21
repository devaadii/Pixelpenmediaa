import React, { useRef } from "react";
import "./ourstory.css";
import TillNow from "../tillnow/TillNow";
import useScrollReveal from "../../hooks/useScrollReveal";

const OurStory = () => {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <div className="ourStory" ref={sectionRef}>
      <h2 className="heading1">Our Story</h2>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <TillNow />
      </div>
    </div>
  );
};

export default OurStory;