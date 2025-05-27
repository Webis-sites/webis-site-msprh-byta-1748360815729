'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Service {
  name: string;
  description: string;
  priceRange: string;
  duration: string;
  popular?: boolean;
}

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const services: Service[] = [
    {
      name: "תספורת גברים",
      description: "תספורת מקצועית עם ייעוץ אישי",
      priceRange: "₪80 - ₪120",
      duration: "30 דקות",
      popular: true
    },
    {
      name: "תספורת נשים",
      description: "תספורת וסידור שיער מותאם אישית",
      priceRange: "₪150 - ₪250",
      duration: "45-60 דקות"
    },
    {
      name: "צביעת שיער",
      description: "צביעה מקצועית עם חומרים איכותיים",
      priceRange: "₪200 - ₪500",
      duration: "2-3 שעות"
    },
    {
      name: "החלקה יפנית",
      description: "החלקה מתקדמת לשיער חלק ומבריק",
      priceRange: "₪800 - ₪1,500",
      duration: "3-4 שעות",
      popular: true
    },
    {
      name: "טיפולי שיער",
      description: "טיפולים משקמים ומזינים לשיער",
      priceRange: "₪150 - ₪300",
      duration: "45 דקות"
    },
    {
      name: "איפור מקצועי",
      description: "איפור לאירועים וצילומים",
      priceRange: "₪250 - ₪400",
      duration: "60-90 דקות"
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      x: 100 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1
      }
    }
  };

  return (
    <section 
      id="pricing-section" 
      ref={sectionRef}
      dir="rtl" 
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" dir="rtl">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={headerVariants}
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4 text-right font-serif">
            המחירון שלנו
          </h2>
          <p className="text-xl text-gray-600 text-right max-w-2xl mx-auto">
            מחירים שקופים ותחרותיים לכל השירותים שלנו
          </p>
          <motion.div 
            className="w-24 h-1 bg-emerald-400 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          dir="rtl"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative group"
            >
              <div className={`
                bg-white rounded-2xl p-8 h-full
                shadow-[20px_20px_60px_#d1d1d1,-20px_-20px_60px_#ffffff]
                hover:shadow-[inset_20px_20px_60px_#d1d1d1,inset_-20px_-20px_60px_#ffffff]
                transition-all duration-500 ease-in-out
                backdrop-filter backdrop-blur-lg
                bg-opacity-90
                border border-gray-100
                ${service.popular ? 'ring-2 ring-emerald-400 ring-offset-4' : ''}
              `}>
                {service.popular && (
                  <motion.div 
                    className="absolute -top-4 right-8 bg-emerald-400 text-white px-4 py-1 rounded-full text-sm font-medium"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200,
                      delay: 0.5 + index * 0.1 
                    }}
                  >
                    פופולרי
                  </motion.div>
                )}

                <div className="text-right">
                  <motion.h3 
                    className="text-2xl font-bold text-gray-800 mb-3 font-serif"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {service.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {service.description}
                  </motion.p>

                  <motion.div 
                    className="border-t border-gray-200 pt-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 text-sm">טווח מחירים</span>
                      <motion.span 
                        className="text-2xl font-bold text-emerald-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200,
                          delay: 0.6 + index * 0.1 
                        }}
                      >
                        {service.priceRange}
                      </motion.span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">משך הטיפול</span>
                      <span className="text-gray-700 font-medium">{service.duration}</span>
                    </div>
                  </motion.div>

                  <motion.button
                    className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-xl font-medium
                             shadow-lg hover:shadow-xl transform transition-all duration-300
                             hover:from-emerald-500 hover:to-emerald-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    הזמן עכשיו
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-[20px_20px_60px_#d1d1d1,-20px_-20px_60px_#ffffff] backdrop-filter backdrop-blur-lg bg-opacity-90"
          dir="rtl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-right font-serif">
            הערות חשובות
          </h3>
          <ul className="text-gray-600 space-y-2 text-right max-w-3xl mx-auto">
            <li>• המחירים עשויים להשתנות בהתאם למורכבות הטיפול ואורך השיער</li>
            <li>• ייעוץ ראשוני ללא עלות לכל לקוח חדש</li>
            <li>• הנחות מיוחדות ללקוחות קבועים ולחבילות טיפולים</li>
            <li>• ביטול עד 24 שעות לפני התור ללא חיוב</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;