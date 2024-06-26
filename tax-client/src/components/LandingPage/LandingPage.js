import React, { useState } from "react";
import SignIn from "../Auth/SignIn";
import HeroBanner from "./HeroBanner";
import "./LandingPage.css";

const LandingPage = () => {
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const handleSignInOpen = () => setIsSignInVisible(true);
  const handleSignInClose = () => setIsSignInVisible(false);

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">Sidney Kahan Tax</div>
        <button onClick={handleSignInOpen} className="cta-button">
          Sign In
        </button>
      </nav>

      <HeroBanner />

      <main>
        <section className="about-section">
          <h2>About Us</h2>
          <p>
            With over 40 years of tax experience, Sidney Kahan Tax is your
            trusted partner in navigating the complex world of taxation. Our
            expert team is dedicated to providing personalized solutions
            tailored to your unique financial situation.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Personal Tax</h3>
              <p>
                Comprehensive personal tax preparation and planning services.
              </p>
            </div>
            <div className="service-card">
              <h3>Business Tax</h3>
              <p>Expert business tax solutions for companies of all sizes.</p>
            </div>
            <div className="service-card">
              <h3>Tax Planning</h3>
              <p>Strategic tax planning to optimize your financial future.</p>
            </div>
            <div className="service-card">
              <h3>IRS Representation</h3>
              <p>Professional representation in IRS audits and disputes.</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>
            Ready to take control of your taxes? Get in touch with us today!
          </p>
          <button className="cta-button">Schedule a Consultation</button>
        </section>
      </main>

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
