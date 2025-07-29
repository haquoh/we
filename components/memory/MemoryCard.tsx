'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Memory } from '@/lib/types/memory';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface MemoryCardProps {
  memory: Memory;
  onClick?: () => void;
}

const categoryColors = {
  date: 'from-pink-400 to-rose-400',
  travel: 'from-sky-400 to-blue-400',
  anniversary: 'from-purple-400 to-pink-400',
  daily: 'from-emerald-400 to-teal-400',
};

const categoryEmojis = {
  date: '💕',
  travel: '✈️',
  anniversary: '🎉',
  daily: '🌸',
};

const categoryLabels = {
  date: '데이트',
  travel: '여행',
  anniversary: '기념일',
  daily: '일상',
};

export default function MemoryCard({ memory, onClick }: MemoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
    >
      {memory.images[0] && (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={memory.images[0]}
            alt={memory.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute right-3 top-3">
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg bg-gradient-to-r ${categoryColors[memory.category]} backdrop-blur-sm`}
            >
              <span className="text-sm">{categoryEmojis[memory.category]}</span>
              {categoryLabels[memory.category]}
            </motion.span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-lg">
              {memory.description}
            </p>
          </div>
        </div>
      )}
      
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors">
          {memory.title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100">
              <Calendar className="h-4 w-4 text-pink-600" />
            </div>
            <span className="text-sm font-medium">
              {format(new Date(memory.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100">
              <MapPin className="h-4 w-4 text-rose-600" />
            </div>
            <span className="text-sm font-medium">
              {memory.location.name}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {memory.weather && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">
                {memory.weather === '맑음' ? '☀️' : memory.weather === '비' ? '🌧️' : memory.weather === '흐림' ? '☁️' : '🌤️'}
                {memory.weather}
              </span>
            )}
            {memory.music && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                🎵 음악
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}