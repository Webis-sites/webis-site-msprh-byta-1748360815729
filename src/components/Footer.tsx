'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.9 }
  };

  const linkVariants = {
    hover: {
      x: -5,
      color: '#38e5b7',
      transition: { duration: 0.2 }
    }
  };

  return (
    <footer id="footer" dir="rtl" className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-serif">מספרה ביתא</h3>
            <p className="text-gray-600 leading-relaxed">
              אנחנו מספרה מוביל בתחום השירותים עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
            <div className="flex gap-4 justify-end mt-6">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Facebook"
              >
                <FaFacebook className="text-emerald-500 text-xl" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Instagram"
              >
                <FaInstagram className="text-emerald-500 text-xl" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 font-serif">קישורים מהירים</h4>
            <nav className="space-y-2">
              {['אודות', 'שירותים', 'צוות', 'גלריה', 'צור קשר'].map((link, index) => (
                <motion.a
                  key={index}
                  href={`#${link}`}
                  className="block text-gray-600 hover:text-emerald-500 transition-colors py-1"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 font-serif">פרטי התקשרות</h4>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-gray-600 justify-end"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span>רחוב הרצל 123, תל אביב</span>
                <FaMapMarkerAlt className="text-emerald-500" />
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-600 justify-end"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span>03-1234567</span>
                <FaPhone className="text-emerald-500" />
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-gray-600 justify-end"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span>א׳-ה׳: 9:00-19:00 | ו׳: 9:00-14:00</span>
                <FaClock className="text-emerald-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-200 mt-8 pt-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        />

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p className="font-serif">
            © {currentYear} מספרה ביתא. כל הזכויות שמורות.
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </footer>
  );
};

export default Footer;