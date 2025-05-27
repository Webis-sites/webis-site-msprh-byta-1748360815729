'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'react-icons/fi';

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
  category: string;
}

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      caption: 'אזור הקבלה המזמין שלנו',
      category: 'קבלה'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
      caption: 'עמדות עיצוב מודרניות',
      category: 'עמדות'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
      caption: 'אזור שטיפה נוח ומרגיע',
      category: 'שטיפה'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1633681926035-ec1ac984418a?w=800&q=80',
      caption: 'מוצרי טיפוח מקצועיים',
      category: 'מוצרים'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80',
      caption: 'צוות מקצועי ומיומן',
      category: 'צוות'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
      caption: 'אווירה נעימה ומרגיעה',
      category: 'אווירה'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80',
      caption: 'פינת המתנה מפנקת',
      category: 'המתנה'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80',
      caption: 'עיצוב פנים מודרני',
      category: 'עיצוב'
    }
  ];

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(galleryImages[newIndex]);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateImage('next');
        break;
      case 'ArrowRight':
        navigateImage('prev');
        break;
    }
  }, [selectedImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="gallery-section" className="py-20 px-4 bg-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-right">
            הגלריה שלנו
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-right">
            הצצה לחלל המודרני והמזמין שלנו, שבו אנו יוצרים חוויית טיפוח מושלמת
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
                <motion.div
                  animate={{
                    scale: hoveredId === image.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  
                  {!loadedImages.has(image.id) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === image.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-start p-6"
                  >
                    <div className="text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredId === image.id ? 0 : 20,
                          opacity: hoveredId === image.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p className="text-sm font-medium mb-1 text-right">{image.category}</p>
                        <h3 className="text-lg font-bold text-right">{image.caption}</h3>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredId === image.id ? 1 : 0,
                      scale: hoveredId === image.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg"
                  >
                    <ZoomIn className="w-5 h-5 text-gray-800" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300"
                aria-label="סגור גלריה"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateImage('prev')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300"
                aria-label="תמונה קודמת"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300"
                aria-label="תמונה הבאה"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center"
                >
                  <p className="text-sm text-white/70 mb-2 text-right">{selectedImage.category}</p>
                  <h3 className="text-xl font-bold text-white text-right">{selectedImage.caption}</h3>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;