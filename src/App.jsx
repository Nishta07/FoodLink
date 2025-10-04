import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('foodlink-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('foodlink-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('foodlink-theme', 'light');
    }
  };

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <span>🌱</span> FoodLink
        </div>
        <div className="header-center">
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div className="header-right">
          {/* <button 
            onClick={toggleDarkMode} 
            className="theme-toggle-btn"
            aria-label="Toggle dark mode"
          > */}
            {/* {isDarkMode ? '☀️' : '🌙'} */}
          {/* </button> */}
          <Link to="/login" className="get-started-btn">Get Started</Link>
        </div>
      </header>

      {/* HERO SECTION WITH COMPATIBLE VIDEO */}
        <section className="hero hero-bg-image">
        <div className="hero-content">
          <h2>Reduce Food Waste, Feed More People</h2>
          <p>
            FoodLink connects restaurants, hotels, and event caterers with NGOs and volunteers to redistribute surplus food efficiently.<br />
            Join a global movement for sustainability—help fight food waste for people and the planet!
          </p>
          <button className="cta-btn">🌍 Join the Movement</button>
        </div>
      </section>


      {/* FEATURES */}
      <section className="features" id="features">
        <div className="feature-card">
          <span className="feature-icon">🍽️</span>
          <h3>For Restaurants</h3>
          <p>List surplus food quickly with pickup time & location. Reduce waste while helping the community.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🤝</span>
          <h3>For NGOs</h3>
          <p>Browse and claim available food nearby. Ensure timely distribution to those in need.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3>Impact Tracking</h3>
          <p>See how much food has been saved and how many people have been served via FoodLink.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🙋</span>
          <h3>Volunteer Matching</h3>
          <p>Connect local volunteers with pickup and delivery tasks based on their location and schedule for rapid response and maximum impact.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔔</span>
          <h3>Real-Time Notifications</h3>
          <p>Receive instant alerts for new surplus food listings, volunteer opportunities, and donation pickups.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🏅</span>
          <h3>Donor Rewards</h3>
          <p>Restaurants and volunteers earn recognition, badges, and rewards for consistent contributions to food redistribution efforts.</p>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="success-section">
        <h2>Our Success Stories</h2>
        <div className="story-cards">
          <div className="story-card">
            <p>"FoodLink's service is lightning-fast! Restaurants and NGOs get connected instantly, helping more people every day."</p>
            <span className="story-author">Raj Sharma</span>
            <span className="story-role">NGO Volunteer</span>
          </div>
          <div className="story-card">
            <p>"Thanks to FoodLink, our surplus food never goes to waste. The platform is so well maintained and easy to use."</p>
            <span className="story-author">Shalini Kapoor</span>
            <span className="story-role">Restaurant Manager</span>
          </div>
          <div className="story-card">
            <p>"I've used many apps, but FoodLink is the most reliable for donating and claiming food. Highly recommended."</p>
            <span className="story-author">Deepak Mehta</span>
            <span className="story-role">Community Leader</span>
          </div>
        </div>
      </section>

      {/* LATEST UPDATES */}
      <section className="update-section">
        <img
          className="update-image"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
          alt="Fresh food"
        />
        <div className="update-content">
          <h3>Get the latest updates</h3>
          <p>Sign up for our newsletter to get important updates, new features, and food donation success stories.</p>
          <form className="update-form" onSubmit={e => e.preventDefault()}>
            <input type="email" required placeholder="Email" />
            <button type="submit">Send</button>
          </form>
          <p style={{ fontSize: "0.98rem", marginTop: "0.5rem" }}>
            By signing up to our newsletter you agree to our&nbsp;
            <a href="#" style={{ color: "#5564eb", textDecoration: "none" }}>terms of service</a> and <a href="#" style={{ color: "#5564eb", textDecoration: "none" }}>privacy policy</a>
          </p>
        </div>
      </section>

      {/* ENHANCED ABOUT US */}
      <section className="about" id="about">
        <h4>About Us</h4>
        <p>
          FoodLink was founded with a simple mission: to ensure no surplus food goes to waste while empowering communities to fight hunger.
          <br /><br />
          Today, our platform seamlessly connects food providers, NGOs, and volunteers, creating an ecosystem for real-time, sustainable food redistributions. We help restaurants, hotels, and event services donate surplus efficiently, while ensuring timely, safe delivery to those most in need.
          <br /><br />
          Our technology enables tracking, recognition, and continuous improvement, ensuring every meal donated leaves a positive impact on both people and the environment. By fostering collaboration, innovation, and trust, FoodLink is proud to be a driver of change—making food access equitable and sustainability a reality for all.
        </p>
      </section>

      {/* CENTERED CONTACT */}
      <section className="contact" id="contact">
        <h4>Get in Touch</h4>
        <p>
          Want to contribute as a restaurant, NGO, or volunteer? Reach out to us today!
        </p>
        <a href="mailto:contact@foodlink.com" className="cta-btn">Contact Us</a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-row">
          <div className="footer-col">
            <div className="footer-main-logo">
              <span>🌱</span> <span style={{ color: "#3747fd", fontWeight: "bold" }}>FoodLink</span>
            </div>
            <div className="footer-desc">Connecting Surplus Food to Those Who Need It Most.</div>
            <div className="footer-socials">
              <span role="img" aria-label="instagram">📸</span>
              <span role="img" aria-label="briefcase">💼</span>
              <span role="img" aria-label="book">📘</span>
              <span role="img" aria-label="twitter">🐦</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="#">Overview</a></li>
              <li><a href="#">Solutions</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
            {/* <h4 style={{ marginTop: '1.09rem' }}>Support</h4>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Chat</a></li>
              <li><a href="#">FAQ</a></li>
            </ul> */}
          </div>
          <div className="footer-col">
             <h4 style={{ marginTop: '1.09rem' }}>Support</h4>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Chat</a></li>
              <li><a href="#">FAQ</a></li>
            </ul> 
          </div>
        </div>
        <div className="footer-copyright">
          © 2025 - Present FoodLink. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;