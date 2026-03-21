import React from "react";
import "./ourstory.css";
import TillNow from "../tillnow/TillNow";

const OurStory = () => {
  return (
    <div className="ourStory">
      <h2 className="heading1">Our Story</h2>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <TillNow />
      </div>
    </div>
  );
};

export default OurStory;