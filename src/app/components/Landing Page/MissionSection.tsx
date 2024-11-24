"use client"
import React from 'react';
import { motion } from 'framer-motion';

const MissionSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-800 to-green-600 text-white py-8 px-6 flex flex-col md:flex-row items-center md:justify-between">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="w-full h-full bg-gradient-to-r from-transparent to-green-400 opacity-20 animate-wave"></div>
        <div className="w-full h-full bg-gradient-to-r from-green-400 to-transparent opacity-10 animate-wave reverse-wave"></div>
      </div>

      {/* Text Content */}
      <motion.div 
        className="relative z-10 max-w-md text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-orange-400 text-sm font-semibold mb-2">Our Mission</h2>
        <h1 className="text-2xl font-bold mb-3">Implementation of Agentic AI in Exams</h1>
        <p className="text-sm leading-relaxed">
          Our mission at ExaminAI is to leverage Agentic AI to create personalized,
          adaptive exams that enhance efficiency, fairness, and student success through
          automated exam creation, grading, and feedback.
        </p>
      </motion.div>

      {/* Image */}
      <motion.div 
        className="relative z-10 mt-6 md:mt-0 md:ml-8 flex-shrink-0"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/mission.png"
          alt="Illustrative image"
          className="w-full max-w-sm h-auto object-contain hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      {/* Inline CSS */}
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes reverseWave {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-wave {
          animation: wave 10s linear infinite;
        }

        .reverse-wave {
          animation: reverseWave 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default MissionSection;
