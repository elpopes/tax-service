import React from "react";
import "./HeroBanner.css";
import heroImage from "./SK_Hero.webp";

const HeroBanner = () => {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-text">
          <span>S</span>
          <span>I</span>
          <span>D</span>
          <span>N</span>
          <span>E</span>
          <span>Y</span>
          <span> </span>
          <span>K</span>
          <span>A</span>
          <span>H</span>
          <span>A</span>
          <span>N</span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
