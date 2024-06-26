import React, { useState, useEffect } from "react";
import "./HeroBanner.css";
import heroImage from "./SK_Hero.webp";

const HeroBanner = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleLines < 3) {
        setVisibleLines((prev) => prev + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  const heroLines = [
    ["S", "I", "D", "N", "E", "Y"],
    ["K", "A", "H", "A", "N"],
    ["T", "A", "X", "E", "S"],
  ];

  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-text-container">
          {heroLines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className={`hero-line hero-text ${
                lineIndex < visibleLines ? "visible" : ""
              }`}
            >
              {line.map((char, charIndex) => (
                <span key={charIndex}>{char}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
