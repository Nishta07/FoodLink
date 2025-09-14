// src/App.jsx
import React from "react";
import { motion } from "framer-motion";
import "./App.css";


export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/70 shadow-md">
        <h1 className="text-2xl font-extrabold text-green-700 tracking-wide">
          🌱 FoodLink
        </h1>
        <div className="space-x-6 font-medium">
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-green-600 transition">
            About
          </a>
          <a href="#contact" className="hover:text-green-600 transition">
            Contact
          </a>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center py-32 px-6 overflow-hidden">
        {/* Animated blob background */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent mb-6"
        >
          Reduce Food Waste, Feed More People
        </motion.h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8 leading-relaxed">
          FoodLink connects restaurants, hotels, and event caterers with NGOs
          and volunteers to redistribute surplus food efficiently.
        </p>
        <button className="bg-green-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transition">
          🌍 Join the Movement
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-10 bg-gray-50">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-12">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="shadow-lg hover:shadow-2xl hover:-translate-y-2 transition rounded-2xl p-8 text-center bg-white">
            <h4 className="text-xl font-semibold mb-4 text-green-700">
              🍽️ For Restaurants
            </h4>
            <p className="text-gray-600">
              List surplus food quickly with pickup time & location. Reduce
              waste while helping the community.
            </p>
          </div>

          <div className="shadow-lg hover:shadow-2xl hover:-translate-y-2 transition rounded-2xl p-8 text-center bg-white">
            <h4 className="text-xl font-semibold mb-4 text-green-700">
              🤝 For NGOs
            </h4>
            <p className="text-gray-600">
              Browse and claim available food nearby. Ensure timely distribution
              to those in need.
            </p>
          </div>

          <div className="shadow-lg hover:shadow-2xl hover:-translate-y-2 transition rounded-2xl p-8 text-center bg-white">
            <h4 className="text-xl font-semibold mb-4 text-green-700">
              📊 Impact Tracking
            </h4>
            <p className="text-gray-600">
              See how much food has been saved and how many people have been
              served via FoodLink.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-700 mb-6">About Us</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            At FoodLink, we believe no good food should go to waste. By linking
            local food providers with NGOs and volunteers, we are building a
            community-driven ecosystem to fight hunger and reduce waste.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-10 bg-green-50">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-6">
          Get in Touch
        </h3>
        <p className="text-center text-gray-600 mb-8">
          Want to contribute as a restaurant, NGO, or volunteer? Reach out to us
          today!
        </p>
        <div className="flex justify-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-white shadow-inner border-t border-green-200">
        <p className="text-gray-600 mb-3">
          © {new Date().getFullYear()} FoodLink. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 text-green-600">
          <a href="#" className="hover:text-green-800">
            🐦 Twitter
          </a>
          <a href="#" className="hover:text-green-800">
            📘 Facebook
          </a>
          <a href="#" className="hover:text-green-800">
            📸 Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
