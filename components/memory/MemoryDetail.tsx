'use client';

import { useState } from 'react';
import { Calendar, MapPin, Cloud, Music, ChevronRight, X } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-25 via-rose-25 to-pink-50">
      <div className="h-full overflow-y-auto -webkit-overflow-scrolling-touch">
        <div className="min-h-full pb-20">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-pink-100/95 to-rose-100/95 backdrop-blur-sm border-b border-pink-200/50">
            <div className="flex items-center justify-between p-4 sm:p-6">
              <h1 className="font-noto-serif text-xl sm:text-2xl md:text-3xl font-bold text-pink-800 flex items-center gap-1 sm:gap-2">
                💕 <span className="truncate">{memory.title}</span>
              </h1>
              <div className="flex items-center gap-2 sm:gap-3">
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 sm:p-3 bg-pink-200/50 hover:bg-pink-300/50 transition-all shadow-md"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6 text-pink-700" />
                  </button>
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
                  <button
                    onClick={nextImage}
                    className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/95 p-4 sm:p-5 hover:bg-white hover:scale-110 shadow-2xl backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10 text-pink-600" />
                  </button>
                )}
                
                {/* Image counter */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/90 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-sm shadow-lg">
                  <span className="text-sm sm:text-base font-bold text-pink-600">
                    {currentImageIndex + 1} / {memory.images.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
            {/* Main Info Section */}
            <div className="mb-8 sm:mb-10 space-y-6">
              {/* Date */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-rose-200 shadow-lg">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-pink-700" />
                </div>
                <div>
                  <p className="text-sm text-pink-500 font-medium mb-1">날짜</p>
                  <p className="text-lg sm:text-xl font-semibold text-pink-800">
                    {format(new Date(memory.date), 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
                  </p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-200 to-pink-200 shadow-lg">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-rose-700" />
                </div>
                <div>
                  <p className="text-sm text-rose-500 font-medium mb-1">장소</p>
                  <p className="text-lg sm:text-xl font-semibold text-rose-800">
                    📍 {memory.location.name}
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <div
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 sm:p-8 shadow-2xl border border-pink-100"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-pink-200/20 to-rose-200/20 blur-3xl" />
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-br from-rose-200/20 to-pink-200/20 blur-3xl" />
                <div className="relative">
                  <h3 className="mb-4 text-xl sm:text-2xl font-bold text-pink-800 flex items-center gap-2">
                    <span className="text-2xl">💭</span> 우리의 이야기
                  </h3>
                  <p className="whitespace-pre-wrap text-base sm:text-lg leading-relaxed text-gray-700">
                    {memory.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Additional Info Grid */}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              
              {memory.weather && (
                <div 
                  className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-xl border border-pink-100 cursor-pointer"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-pink-300/30 to-rose-300/30 blur-2xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-300 to-rose-300 shadow-md">
                      <Cloud className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">날씨</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {memory.weather === '맑음' ? '☀️' : memory.weather === '비' ? '🌧️' : memory.weather === '흐림' ? '☁️' : '🌤️'} {memory.weather}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {memory.music && (
                <div 
                  className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-xl border border-rose-100 cursor-pointer"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-rose-300/30 to-pink-300/30 blur-2xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-300 to-pink-300 shadow-md">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">음악</p>
                      <p className="text-lg font-semibold text-gray-800">
                        🎵 {memory.music}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {isFullscreen && (
        <div
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-pink-400/80 to-rose-400/80 p-3 hover:from-pink-500/80 hover:to-rose-500/80 shadow-xl backdrop-blur-sm"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          {/* Fullscreen info */}
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <div className="inline-block rounded-2xl bg-pink-100/90 px-6 py-3 backdrop-blur-sm">
              <p className="font-noto-serif text-pink-800 font-semibold">
                💕 {memory.title} - {currentImageIndex + 1}/{memory.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}