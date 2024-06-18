import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to [Your Company]</h1>
        <p>Your company tagline or a brief description.</p>
        <Link to="/sign-up" className="cta-button">
          Get Started
        </Link>
      </header>
      <section className="about-section">
        <h2>About Us</h2>
        <p>Information about your company.</p>
      </section>
      <section className="services-section">
        <h2>Our Services</h2>
        <p>Details about the services you offer.</p>
      </section>
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>How users can reach you.</p>
      </section>
      <footer className="landing-footer">
        <p>&copy; 2024 [Your Company]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
