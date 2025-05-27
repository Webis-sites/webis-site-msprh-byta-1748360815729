'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const LocationSection: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const businessHours = [
    { day: 'ראשון - חמישי', hours: '09:00 - 19:00' },
    { day: 'שישי', hours: '09:00 - 14:00' },
    { day: 'שבת', hours: 'סגור' }
  ];

  return (
    <section id="location-section" dir="rtl" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-right">מיקום וצור קשר</h2>
          <div className="w-24 h-1 bg-gradient-to-l from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Contact Info - Right Side */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="order-1 lg:order-2"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                boxShadow: '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff'
              }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-right">מספרה ביתא</h3>

              {/* Address */}
              <motion.div variants={fadeInUp} className="mb-6">
                <div className="flex items-start gap-4 text-right">
                  <div className="bg-emerald-100 p-3 rounded-full shadow-inner">
                    <FaMapMarkerAlt className="text-emerald-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">כתובת</h4>
                    <p className="text-gray-600">רחוב הרצל 42</p>
                    <p className="text-gray-600">תל אביב, 6578901</p>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={fadeInUp} className="mb-6">
                <div className="flex items-start gap-4 text-right">
                  <div className="bg-emerald-100 p-3 rounded-full shadow-inner">
                    <FaPhone className="text-emerald-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">טלפון</h4>
                    <a href="tel:03-1234567" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                      03-1234567
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Operating Hours */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-start gap-4 text-right">
                  <div className="bg-emerald-100 p-3 rounded-full shadow-inner">
                    <FaClock className="text-emerald-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-700 mb-3">שעות פעילות</h4>
                    <div className="space-y-2">
                      {businessHours.map((schedule, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index + 0.5 }}
                          className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow-inner"
                        >
                          <span className="text-gray-600">{schedule.day}</span>
                          <span className="font-medium text-gray-800">{schedule.hours}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                variants={scaleIn}
                className="mt-8"
              >
                <button className="w-full bg-gradient-to-l from-emerald-400 to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  קבע תור עכשיו
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Map - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 h-full min-h-[400px]"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 h-full"
                 style={{
                   boxShadow: '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff'
                 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.9123456789!2d34.7719!3d32.0853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA1JzA3LjEiTiAzNMKwNDYnMTguOCJF!5e0!3m2!1siw!2sil!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[1.1]"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto shadow-inner"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
                 boxShadow: 'inset 2px 2px 5px #d1d1d1, inset -2px -2px 5px #ffffff'
               }}>
            <p className="text-gray-700 text-lg text-right leading-relaxed">
              אנחנו מספרה מוביל בתחום השירותים עם ניסיון של שנים רבות. 
              אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
              צוות המומחים שלנו מחכה לכם!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;