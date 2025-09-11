// src/App.jsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-green-700">FoodLink</h1>
        <div className="space-x-4">
          <a href="#features" className="text-gray-700 hover:text-green-600">
            Features
          </a>
          <a href="#about" className="text-gray-700 hover:text-green-600">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-green-600">
            Contact
          </a>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-green-700 mb-6"
        >
          Reduce Food Waste, Feed More People
        </motion.h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          FoodLink connects restaurants, hotels, and event caterers with NGOs
          and volunteers to redistribute surplus food efficiently.
        </p>
        <Button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700">
          Join the Movement
        </Button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-10 bg-gray-50">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-12">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">For Restaurants</h4>
              <p className="text-gray-600">
                List surplus food quickly with pickup time & location. Reduce
                waste while helping the community.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">For NGOs</h4>
              <p className="text-gray-600">
                Browse and claim available food nearby. Ensure timely
                distribution to those in need.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">Impact Tracking</h4>
              <p className="text-gray-600">
                See how much food has been saved and how many people have been
                served via FoodLink.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-700 mb-6">About Us</h3>
          <p className="text-gray-600 text-lg">
            At FoodLink, we believe no good food should go to waste. By linking
            local food providers with NGOs and volunteers, we are building a
            community-driven ecosystem to fight hunger and reduce waste.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-10 bg-green-50">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-6">
          Get in Touch
        </h3>
        <p className="text-center text-gray-600 mb-8">
          Want to contribute as a restaurant, NGO, or volunteer? Reach out to us
          today!
        </p>
        <div className="flex justify-center">
          <Button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700">
            Contact Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-white shadow-inner">
        <p className="text-gray-600">
          © {new Date().getFullYear()} FoodLink. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
