"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const teamRefs = useRef([]);
  const socialRefs = useRef([]);

  useEffect(() => {
    // Animate footer elements
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Animate team member images
    teamRefs.current.forEach((member, index) => {
      gsap.fromTo(member,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5,
          delay: index * 0.2 
        }
      );
    });

    // Animate social icons
    socialRefs.current.forEach((icon, index) => {
      gsap.fromTo(icon,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.3,
          delay: index * 0.1 
        }
      );
    });
  }, []);

  const teamMembers = [
    { name: 'John Doe', role: 'CEO', image: '/team/member1.jpg' },
    { name: 'Jane Smith', role: 'CTO', image: '/team/member2.jpg' },
    { name: 'Mike Johnson', role: 'Lead Developer', image: '/team/member3.jpg' },
    { name: 'Sarah Williams', role: 'Designer', image: '/team/member4.jpg' }
  ];

  return (
    <footer ref={footerRef} className="bg-white text-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Logo and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <Image
              src="/logo-no-background.png"
              alt="Examinie AI Logo"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="text-gray-600 max-w-md">
              Empowering education through AI-driven examination solutions
            </p>
          </div>
          
          <div className="flex space-x-6">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
              <div
                key={index}
                ref={el => socialRefs.current[index] = el}
                className="hover:text-green-400 transition-colors duration-300 text-gray-600"
              >
                <Icon className="text-2xl cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Team</h3>
          <div className="flex justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                ref={el => teamRefs.current[index] = el}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-gray-800">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Examinie AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
