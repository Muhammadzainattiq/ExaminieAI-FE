"use client";

import React, { useState, useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faFileAlt, faUserCog, faSlidersH, faRobot, faChartLine } from '@fortawesome/free-solid-svg-icons';

const FeatureSection = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const featuresRef = useRef(null);

  const features = [
    {
      title: "Role-Specific Experiences for Students and Teachers",
      description: "Separate, tailored interfaces for students and teachers, allowing each user to engage in a way that suits their goals.",
      icon: faUserGraduate
    },
    {
      title: "Agentic AI Powered Intelligent Exam Creation",
      description: "Easily upload documents, select question formats, and let AI generate personalized exams in seconds.",
      icon: faRobot
    },
    {
      title: "Multiple Content Formats Supported",
      description: "Upload books, PDFs, videos, or even topics. Whether it's text, video, or document, create exams based on diverse content.",
      icon: faFileAlt
    },
    {
      title: "Personalized Profile for Better Student Engagement",
      description: "Students can create profiles detailing academic interests, preferred subjects, and skill levels to receive tailor-made exam generations.",
      icon: faUserCog
    },
    {
      title: "Customize Exams to Your Needs",
      description: "Set difficulty levels, timed or untimed options, and marking schemes. Create exams that meet specific teaching or learning requirements.",
      icon: faSlidersH
    },
    {
      title: "Smart, Automated Grading for Accurate and Consistent Results",
      description: "Our AI grading engine provides quick, consistent evaluations across all question types, delivering instant feedback and tailored improvement insights for each student.",
      icon: faChalkboardTeacher
    },
    {
      title: "Detailed Results and Feedback",
      description: "Get in-depth results and feedback, complete with performance insights and recommendations for improvement.",
      icon: faChartLine
    }
  ];

  const displayedFeatures = showAllFeatures ? features : features.slice(0, 3);

  useEffect(() => {
    // Initial animation for features
    gsap.fromTo(
      featuresRef.current.children,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2
      }
    );
  }, [showAllFeatures]);

  return (
    <section className="p-10 text-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-black">Dynamic Features</h2>
      <p className="text-lg mb-6 text-black">Our sales team will get in touch to better understand your needs, and either help you with the sign-up process.</p>
      
      {/* Feature Cards */}
      <div ref={featuresRef} className="flex flex-wrap gap-6 justify-center">
        {displayedFeatures.map((feature, index) => (
          <Tilt
            key={index}
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            glareEnable={true}
            glareMaxOpacity={0.3}
            className="w-full sm:w-80 h-60 bg-opacity-10 bg-gray-200 rounded-lg shadow-lg p-6 hover:bg-green-200 transition-all backdrop-blur-md"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-opacity-25 bg-green-500 rounded-full flex items-center justify-center text-black text-xl hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={feature.icon} color="green" size="lg" />
                </div>
              </div>

              {/* Heading */}
              <div className="text-lg font-semibold mb-2 text-black">{feature.title}</div>

              {/* Description */}
              <p className="text-sm font-medium text-black opacity-75">{feature.description}</p>
            </div>
          </Tilt>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      <div className="mt-8">
        <button 
          onClick={() => setShowAllFeatures(!showAllFeatures)} 
          className="px-6 py-2 font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition-transform"
        >
          {showAllFeatures ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default FeatureSection;
