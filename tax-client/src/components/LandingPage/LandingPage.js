import React, { useState } from "react";
import SignIn from "../SignIn";
import "./LandingPage.css";

const LandingPage = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const handleSignInOpen = () => {
    setIsSignInVisible(true);
  };

  const handleSignInClose = () => {
    setIsSignInVisible(false);
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Sidney Kahan Tax</h1>
        <p>Over 40 years of Tax Experience</p>
        <button onClick={handleSignInOpen} className="cta-button">
          Sign In
        </button>
      </header>
      <section className="about-section">
        <h2>About Us</h2>
        <p>We do taxes.</p>
      </section>
      <section className="services-section">
        <h2>Our Services</h2>
        <p>All Kinds</p>
      </section>
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Give us a Call!</p>
      </section>
      <footer className="landing-footer">
        <p>&copy; 2024 Sidney Kahan Tax. All rights reserved.</p>
      </footer>
      {isSignInVisible && (
        <SignIn isVisible={isSignInVisible} handleClose={handleSignInClose} />
      )}
    </div>
  );
};

export default LandingPage;
