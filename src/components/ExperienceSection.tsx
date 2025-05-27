'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { FaUsers, FaTrophy, FaScissors } from 'react-icons/fa';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, label, delay }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8, delay }}
      className="relative group"
      dir="rtl"
    >
      <div className="bg-gray-100 rounded-2xl p-8 text-center shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] hover:shadow-[inset_20px_20px_60px_#bebebe,inset_-20px_-20px_60px_#ffffff] transition-all duration-300">
        <motion.div
          className="text-emerald-400 mb-4 flex justify-center"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <motion.h3
          className="text-4xl font-bold text-gray-800 mb-2"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
        >
          {number}
        </motion.h3>
        <p className="text-gray-600 text-lg">{label}</p>
      </div>
    </motion.div>
  );
};

interface TransformationCardProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  index: number;
}

const TransformationCard: React.FC<TransformationCardProps> = ({ beforeImage, afterImage, title, index }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
      }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative h-96 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      dir="rtl"
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Before Side */}
        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]" style={{ backfaceVisibility: "hidden" }}>
          <img src={beforeImage} alt="לפני" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div className="text-right">
              <p className="text-white text-2xl font-bold mb-2">{title}</p>
              <p className="text-emerald-300 text-lg">לפני</p>
            </div>
          </div>
        </div>
        
        {/* After Side */}
        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <img src={afterImage} alt="אחרי" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div className="text-right">
              <p className="text-white text-2xl font-bold mb-2">{title}</p>
              <p className="text-emerald-300 text-lg">אחרי</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const stats = [
    { icon: <FaTrophy size={48} />, number: "15+", label: "שנים של ניסיון", delay: 0 },
    { icon: <FaUsers size={48} />, number: "5000+", label: "לקוחות מרוצים", delay: 0.2 },
    { icon: <FaScissors size={48} />, number: "12", label: "סטייליסטים מקצועיים", delay: 0.4 }
  ];

  const transformations = [
    {
      beforeImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop",
      title: "שינוי צבע דרמטי"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop",
      title: "תספורת מודרנית"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop",
      title: "עיצוב שיער מקצועי"
    }
  ];

  return (
    <section id="experience-section" ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden py-20" dir="rtl">
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #38e5b7 0, #38e5b7 1px, transparent 1px, transparent 15px)`,
          backgroundSize: '20px 20px'
        }} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">הניסיון שלנו מדבר בעד עצמו</h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto rounded-full" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* About Section */}
        <motion.div
          style={{ y: textY }}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-lg rounded-3xl p-12 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border border-white/20"
            dir="rtl"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-right">מחויבות למצוינות</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-right">
              במספרה ביתא, אנחנו מאמינים שכל לקוח ראוי לחוויה ייחודית ומותאמת אישית. הצוות המקצועי שלנו עובר הכשרות מתמידות ומתעדכן בטרנדים האחרונים בעולם עיצוב השיער, כדי להבטיח שתמיד תקבלו את השירות הטוב ביותר.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-right">
              אנחנו משתמשים רק במוצרים איכותיים ומובילים בתעשייה, ומקפידים על סביבת עבודה נקייה ומזמינה. המטרה שלנו היא לא רק לעצב את השיער שלכם, אלא להעניק לכם חוויה מרגיעה ומפנקת שתשאיר אתכם מרוצים ובטוחים בעצמכם.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-emerald-400 text-white font-bold rounded-full shadow-[10px_10px_30px_#bebebe,-10px_-10px_30px_#ffffff] hover:shadow-[inset_10px_10px_30px_#2dd4a8,inset_-10px_-10px_30px_#44f6c6] transition-all duration-300"
            >
              קבעו תור עכשיו
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Transformations Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center">השינויים המדהימים שלנו</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformations.map((transformation, index) => (
              <TransformationCard key={index} {...transformation} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl text-gray-700 mb-8">מוכנים להצטרף לאלפי הלקוחות המרוצים שלנו?</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-12 py-5 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-xl font-bold rounded-full shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] hover:shadow-[inset_20px_20px_60px_#2dd4a8,inset_-20px_-20px_60px_#44f6c6] transition-all duration-300">
              צרו קשר היום
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;