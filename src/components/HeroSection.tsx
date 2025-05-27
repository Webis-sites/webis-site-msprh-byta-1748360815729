'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { FaScissors, FaSprayCan, FaPaintBrush } from 'react-icons/fa';
import { GiHairStrands, GiComb, GiRazor } from 'react-icons/gi';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Parallax transforms
  const y1 = useSpring(useTransform(scrollY, [0, 300], [0, 50]), springConfig);
  const y2 = useSpring(useTransform(scrollY, [0, 300], [0, -50]), springConfig);
  const y3 = useSpring(useTransform(scrollY, [0, 300], [0, 30]), springConfig);
  
  // Floating animation values
  const floatY1 = useMotionValue(0);
  const floatY2 = useMotionValue(0);
  const floatY3 = useMotionValue(0);
  
  useAnimationFrame((t) => {
    floatY1.set(Math.sin(t / 1000) * 10);
    floatY2.set(Math.sin((t + 1000) / 1000) * 15);
    floatY3.set(Math.sin((t + 2000) / 1000) * 12);
  });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 1,
      },
    },
  };

  return (
    <section id="hero-section" dir="rtl" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0">
        <motion.div
          style={{ x: mousePosition.x, y: mousePosition.y }}
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: -mousePosition.x, y: -mousePosition.y }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating hair styling tools */}
      <motion.div
        variants={floatingIconVariants}
        initial="hidden"
        animate="visible"
        style={{ y: floatY1, x: y1 }}
        className="absolute top-32 right-[10%] text-emerald-500/30"
      >
        <FaScissors className="w-16 h-16 transform rotate-45" />
      </motion.div>
      
      <motion.div
        variants={floatingIconVariants}
        initial="hidden"
        animate="visible"
        style={{ y: floatY2, x: y2 }}
        className="absolute top-48 left-[15%] text-emerald-400/30"
      >
        <GiComb className="w-20 h-20 transform -rotate-12" />
      </motion.div>
      
      <motion.div
        variants={floatingIconVariants}
        initial="hidden"
        animate="visible"
        style={{ y: floatY3, x: y3 }}
        className="absolute bottom-32 right-[20%] text-emerald-500/30"
      >
        <FaSprayCan className="w-14 h-14 transform rotate-12" />
      </motion.div>
      
      <motion.div
        variants={floatingIconVariants}
        initial="hidden"
        animate="visible"
        style={{ y: floatY1, x: y1 }}
        className="absolute top-64 right-[40%] text-emerald-400/30"
      >
        <GiHairStrands className="w-18 h-18" />
      </motion.div>
      
      <motion.div
        variants={floatingIconVariants}
        initial="hidden"
        animate="visible"
        style={{ y: floatY2, x: y2 }}
        className="absolute bottom-48 left-[25%] text-emerald-500/30"
      >
        <FaPaintBrush className="w-16 h-16 transform -rotate-45" />
      </motion.div>
      
      <motion.div
        variants={floatingIconVariants}
        initial="hidden"
        animate="visible"
        style={{ y: floatY3, x: y3 }}
        className="absolute top-40 left-[35%] text-emerald-400/30"
      >
        <GiRazor className="w-14 h-14 transform rotate-30" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-right space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              מספרה מוביל בישראל
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 font-light"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              חווית לקוח מושלמת בכל ביקור
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(56, 229, 183, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-5 bg-white text-emerald-600 font-semibold text-lg rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 backdrop-blur-md bg-opacity-90 border border-emerald-100"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                <span className="relative z-10">קבע תור עכשיו</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full opacity-0 hover:opacity-10 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.button>
            </motion.div>
            
            {/* Neumorphic elements */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-end mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 rounded-2xl shadow-[9px_9px_16px_#d1d1d1,-9px_-9px_16px_#ffffff]"
              >
                <FaScissors className="w-8 h-8 text-emerald-500" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 rounded-2xl shadow-[9px_9px_16px_#d1d1d1,-9px_-9px_16px_#ffffff]"
              >
                <GiComb className="w-8 h-8 text-emerald-500" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 rounded-2xl shadow-[9px_9px_16px_#d1d1d1,-9px_-9px_16px_#ffffff]"
              >
                <FaSprayCan className="w-8 h-8 text-emerald-500" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Image Section with Glassmorphism overlay */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100 }}
            className="relative"
          >
            <motion.div
              style={{ y: y1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="מספרה מקצועית"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Glassmorphism overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-md bg-white/30 border-t border-white/50"
              >
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    צוות מקצועי ומנוסה
                  </h3>
                  <p className="text-white/90" style={{ fontFamily: 'Georgia, serif' }}>
                    מעל 15 שנות ניסיון בתחום
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400 rounded-full opacity-20 blur-xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-500 rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;