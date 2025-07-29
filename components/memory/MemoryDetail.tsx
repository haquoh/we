'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Cloud, Music, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Memory } from '@/lib/types/memory';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface MemoryDetailProps {
  memory: Memory;
  onClose?: () => void;
}

export default function MemoryDetail({ memory, onClose }: MemoryDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % memory.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + memory.images.length) % memory.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-pink-25 via-rose-25 to-pink-50"
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-pink-100/95 to-rose-100/95 backdrop-blur-sm border-b border-pink-200/50">
          <div className="flex items-center justify-between p-4 sm:p-6">
            <h1 className="font-noto-serif text-xl sm:text-2xl md:text-3xl font-bold text-pink-800 flex items-center gap-1 sm:gap-2">
              💕 <span className="truncate">{memory.title}</span>
            </h1>
            <div className="flex items-center gap-2 sm:gap-3">
              {onClose && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="rounded-full p-2 sm:p-3 bg-pink-200/50 hover:bg-pink-300/50 transition-all shadow-md"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-pink-700" />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {memory.images.length > 0 && (
          <div className="relative bg-gradient-to-b from-pink-900 to-rose-900 border-y-2 sm:border-y-4 border-pink-200">
            <div className="relative h-[50vh] sm:h-[60vh]">
              <Image
                src={memory.images[currentImageIndex]}
                alt={`${memory.title} - Image ${currentImageIndex + 1}`}
                fill
                className="cursor-pointer object-contain"
                onClick={() => setIsFullscreen(true)}
                sizes="100vw"
              />
              
              {memory.images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-400/90 to-rose-400/90 p-2 sm:p-3 hover:from-pink-500/90 hover:to-rose-500/90 shadow-xl backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-400/90 to-rose-400/90 p-2 sm:p-3 hover:from-pink-500/90 hover:to-rose-500/90 shadow-xl backdrop-blur-sm"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </motion.button>
                  <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 bg-pink-100/20 rounded-full px-4 py-2 backdrop-blur-sm">
                    {memory.images.map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-3 w-3 rounded-full transition-all shadow-lg ${
                          index === currentImageIndex 
                            ? 'w-10 bg-gradient-to-r from-pink-300 to-rose-300' 
                            : 'bg-pink-200/70 hover:bg-pink-300/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-pink-100/90 rounded-full px-3 py-1 sm:px-4 sm:py-2 backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-medium text-pink-800">
                  {currentImageIndex + 1} / {memory.images.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
          <div className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 sm:grid-cols-2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-100/80 to-rose-100/80 border border-pink-200/50 shadow-lg backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-md">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-pink-600">날짜</p>
                <p className="font-noto-serif text-pink-800 font-semibold">
                  {format(new Date(memory.date), 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-rose-100/80 to-pink-100/80 border border-rose-200/50 shadow-lg backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-pink-400 shadow-md">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-rose-600">장소</p>
                <p className="font-noto-serif text-rose-800 font-semibold">
                  {memory.location.name}
                </p>
              </div>
            </motion.div>
            
            {memory.weather && (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-100/80 to-rose-100/80 border border-pink-200/50 shadow-lg backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-md">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-pink-600">날씨</p>
                  <p className="font-noto-serif text-pink-800 font-semibold">
                    {memory.weather}
                  </p>
                </div>
              </motion.div>
            )}
            
            {memory.music && (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-rose-100/80 to-pink-100/80 border border-rose-200/50 shadow-lg backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-pink-400 shadow-md">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-rose-600">음악</p>
                  <p className="font-noto-serif text-rose-800 font-semibold">
                    {memory.music}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-50/90 to-rose-50/90 p-6 sm:p-8 border-2 border-pink-200/50 shadow-xl backdrop-blur-sm"
          >
            <h3 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-pink-800 font-noto-serif flex items-center gap-2">
              💭 추억의 이야기
            </h3>
            <div className="prose prose-base sm:prose-lg max-w-none">
              <p className="whitespace-pre-wrap font-noto-serif leading-relaxed text-pink-900 text-base sm:text-lg">
                {memory.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-900/95 to-rose-900/95 backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <Image
              src={memory.images[currentImageIndex]}
              alt={`${memory.title} - Fullscreen`}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-pink-400/80 to-rose-400/80 p-3 hover:from-pink-500/80 hover:to-rose-500/80 shadow-xl backdrop-blur-sm"
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>
            
            {/* Fullscreen info */}
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <div className="inline-block rounded-2xl bg-pink-100/90 px-6 py-3 backdrop-blur-sm">
                <p className="font-noto-serif text-pink-800 font-semibold">
                  💕 {memory.title} - {currentImageIndex + 1}/{memory.images.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}