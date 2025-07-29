'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Cloud, Music, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Memory } from '@/lib/types/memory';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import ShareButton from '@/components/ui/ShareButton';

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
      className="fixed inset-0 z-50 overflow-y-auto bg-white"
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="font-noto-serif text-2xl font-bold">{memory.title}</h1>
            <div className="flex items-center gap-2">
              <ShareButton memoryId={memory.id} title={memory.title} />
              {onClose && (
                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {memory.images.length > 0 && (
          <div className="relative bg-black">
            <div className="relative h-[60vh]">
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
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {memory.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'w-8 bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-4xl p-6">
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>{format(new Date(memory.date), 'yyyy년 MM월 dd일 EEEE', { locale: ko })}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{memory.location.name}</span>
            </div>
            {memory.weather && (
              <div className="flex items-center gap-2 text-gray-600">
                <Cloud className="h-5 w-5" />
                <span>{memory.weather}</span>
              </div>
            )}
            {memory.music && (
              <div className="flex items-center gap-2 text-gray-600">
                <Music className="h-5 w-5" />
                <span>{memory.music}</span>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap font-noto-serif leading-relaxed">
              {memory.description}
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
            onClick={() => setIsFullscreen(false)}
          >
            <Image
              src={memory.images[currentImageIndex]}
              alt={`${memory.title} - Fullscreen`}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="absolute right-4 top-4 rounded-full bg-white/20 p-2 hover:bg-white/30"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}