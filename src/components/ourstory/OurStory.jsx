import React, { useEffect, useState } from "react";
import "./ourstory.css";
import image from "../../assets/Group 83.svg"

const barData = [
  { id: 1, height: 270, left: 320 },
  { id: 2, height: 210, left: 230 },
  { id: 3, height: 150, left: 140 },
  { id: 4, height: 90, left: 50 }
];

const OurStory = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ourStory">
      <h2 className="heading" >Our Story</h2>
      <div style={{display:"flex",justifyContent:"center" }}>
      <img style={{background:"transaparent"}} src={image} /></div>
  </div>
  );
};

export default OurStory;