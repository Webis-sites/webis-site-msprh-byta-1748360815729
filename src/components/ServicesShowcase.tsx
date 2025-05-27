'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaCut, FaPaintBrush, FaMagic, FaSpa, FaSparkles, FaHeart } from 'react-icons/fa';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const ServicesShowcase: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const services: Service[] = [
    {
      id: 'mens-haircut',
      title: 'תספורת גברים',
      description: 'תספורות מודרניות וקלאסיות בידי מעצבי שיער מקצועיים',
      icon: <FaCut className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80'
    },
    {
      id: 'womens-haircut',
      title: 'תספורת נשים',
      description: 'עיצוב שיער מותאם אישית לכל סגנון ואופי',
      icon: <FaSparkles className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'
    },
    {
      id: 'coloring',
      title: 'צביעה',
      description: 'צביעות מקצועיות עם חומרים איכותיים ובטוחים',
      icon: <FaPaintBrush className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'
    },
    {
      id: 'straightening',
      title: 'החלקה',
      description: 'החלקות יפניות וברזילאיות לתוצאות מושלמות',
      icon: <FaMagic className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80'
    },
    {
      id: 'hair-treatments',
      title: 'טיפולי שיער',
      description: 'טיפולים משקמים ומזינים לשיער בריא ומבריק',
      icon: <FaSpa className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80'
    },
    {
      id: 'special-care',
      title: 'טיפולים מיוחדים',
      description: 'טיפולי פרימיום לשיקום ושיפור מראה השיער',
      icon: <FaHeart className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80'
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section 
      id="services-showcase" 
      className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4 text-right font-serif">
            השירותים שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-right leading-relaxed">
            אנחנו מספרה מוביל בתחום השירותים עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
              style={{ perspective: 1000 }}
            >
              <div className="relative h-full bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(56,229,183,0.2)] transition-all duration-500 border border-gray-200/50">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image container with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Floating icon */}
                  <motion.div 
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg text-[#38e5b7]"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6" dir="rtl">
                  <motion.h3 
                    className="text-2xl font-bold text-gray-800 mb-3 text-right font-serif"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-right leading-relaxed mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.button
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#38e5b7] to-[#2bc99a] text-white font-medium rounded-xl shadow-[0_4px_16px_rgba(56,229,183,0.3)] hover:shadow-[0_6px_24px_rgba(56,229,183,0.4)] transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <span className="text-right block">לפרטים נוספים</span>
                  </motion.button>
                </div>

                {/* Neumorphic effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.5)]" />
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-20 h-20 bg-[#38e5b7]/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-[#38e5b7] to-[#2bc99a] text-white text-lg font-medium rounded-full shadow-[0_8px_32px_rgba(56,229,183,0.3)] hover:shadow-[0_12px_48px_rgba(56,229,183,0.4)] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-right">ראה את כל השירותים שלנו</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#38e5b7]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#38e5b7]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default ServicesShowcase;