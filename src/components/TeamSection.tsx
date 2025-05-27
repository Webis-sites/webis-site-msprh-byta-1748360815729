'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar, FaScissors, FaPalette, FaSprayCan } from 'react-icons/fa';

interface TeamMember {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  image: string;
  rating: number;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'שרה כהן',
    specialty: 'תספורות נשים וצביעה',
    experience: 12,
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=400&h=400&fit=crop',
    rating: 4.9,
    bio: 'מומחית בתספורות מודרניות וטכניקות צביעה מתקדמות'
  },
  {
    id: 2,
    name: 'מיכל לוי',
    specialty: 'עיצוב שיער לאירועים',
    experience: 8,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop',
    rating: 4.8,
    bio: 'מתמחה בתסרוקות כלה ואירועים מיוחדים'
  },
  {
    id: 3,
    name: 'דנה ברק',
    specialty: 'טיפולי שיער וקרטין',
    experience: 10,
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=400&fit=crop',
    rating: 5.0,
    bio: 'מומחית לטיפולי שיער מתקדמים והחלקות'
  },
  {
    id: 4,
    name: 'רונית אביב',
    specialty: 'גוונים ובלונד',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
    rating: 4.9,
    bio: 'אמנית צבע עם התמחות בגוונים בהירים'
  }
];

const TeamSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getIcon = (specialty: string) => {
    if (specialty.includes('תספורות')) return <FaScissors className="text-emerald-400" />;
    if (specialty.includes('צביעה') || specialty.includes('גוונים')) return <FaPalette className="text-emerald-400" />;
    if (specialty.includes('טיפולי')) return <FaSprayCan className="text-emerald-400" />;
    return <FaScissors className="text-emerald-400" />;
  };

  return (
    <section id="team-section" className="py-20 px-4 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4 font-serif">הצוות המקצועי שלנו</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-right">
            פגשו את הסטייליסטים המוכשרים שלנו, כל אחד עם התמחות ייחודית וניסיון רב בתחום
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{
              boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
            }}
          >
            <FaChevronRight className="text-emerald-500 text-xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{
              boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
            }}
          >
            <FaChevronLeft className="text-emerald-500 text-xl" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {teamMembers.slice(currentIndex, currentIndex + 3).concat(
                  currentIndex + 3 > teamMembers.length 
                    ? teamMembers.slice(0, (currentIndex + 3) % teamMembers.length)
                    : []
                ).map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="relative h-[450px] perspective-1000"
                  >
                    <motion.div
                      className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer"
                      animate={{ rotateY: flippedCards.has(member.id) ? 180 : 0 }}
                      onClick={() => toggleFlip(member.id)}
                    >
                      {/* Front of card */}
                      <div 
                        className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden"
                        style={{
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '12px 12px 24px #d1d5db, -12px -12px 24px #ffffff',
                          border: '1px solid rgba(56, 229, 183, 0.3)'
                        }}
                      >
                        <div className="relative h-full">
                          <div className="h-56 overflow-hidden">
                            <motion.img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>
                          
                          <div className="p-6 text-right">
                            <motion.h3 
                              className="text-2xl font-bold text-gray-800 mb-2 font-serif"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {member.name}
                            </motion.h3>
                            
                            <div className="flex items-center justify-end gap-2 mb-3">
                              {getIcon(member.specialty)}
                              <p className="text-emerald-600 font-medium">{member.specialty}</p>
                            </div>
                            
                            <div className="flex items-center justify-end gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`text-sm ${i < Math.floor(member.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                              <span className="text-gray-600 mr-2">{member.rating}</span>
                            </div>
                            
                            <div className="bg-emerald-50 rounded-lg p-3 text-center">
                              <p className="text-3xl font-bold text-emerald-600">{member.experience}</p>
                              <p className="text-sm text-gray-600">שנות ניסיון</p>
                            </div>
                          </div>
                          
                          <motion.div 
                            className="absolute bottom-4 left-4 text-sm text-emerald-600 font-medium"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            לחץ להפוך
                          </motion.div>
                        </div>
                      </div>

                      {/* Back of card */}
                      <div 
                        className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden rotate-y-180"
                        style={{
                          background: 'linear-gradient(135deg, rgba(56, 229, 183, 0.1), rgba(255, 255, 255, 0.9))',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '12px 12px 24px #d1d5db, -12px -12px 24px #ffffff',
                          border: '1px solid rgba(56, 229, 183, 0.3)',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="p-8 h-full flex flex-col justify-center text-right">
                          <h3 className="text-3xl font-bold text-gray-800 mb-6 font-serif">{member.name}</h3>
                          
                          <div className="space-y-4 mb-8">
                            <div>
                              <h4 className="text-lg font-semibold text-emerald-600 mb-2">אודות</h4>
                              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-semibold text-emerald-600 mb-2">התמחות</h4>
                              <p className="text-gray-700">{member.specialty}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-semibold text-emerald-600 mb-2">ניסיון מקצועי</h4>
                              <p className="text-gray-700">{member.experience} שנים בתחום</p>
                            </div>
                          </div>
                          
                          <motion.button
                            className="bg-emerald-500 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-600 transition-colors duration-300 mx-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            קבע תור
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {teamMembers.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-emerald-500 w-8' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;