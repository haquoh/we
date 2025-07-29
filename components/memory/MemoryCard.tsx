'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Cloud, Music } from 'lucide-react';
import { Memory } from '@/lib/types/memory';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface MemoryCardProps {
  memory: Memory;
  onClick?: () => void;
}

const categoryColors = {
  date: 'bg-pink-100 text-pink-700',
  travel: 'bg-blue-100 text-blue-700',
  anniversary: 'bg-purple-100 text-purple-700',
  daily: 'bg-green-100 text-green-700',
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      {memory.images[0] && (
        <div className="relative h-48 w-full">
          <Image
            src={memory.images[0]}
            alt={memory.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute right-2 top-2">
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${categoryColors[memory.category]}`}>
              {categoryLabels[memory.category]}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="mb-2 font-noto-serif text-lg font-semibold">{memory.title}</h3>
        
        <div className="mb-3 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(memory.date), 'yyyy년 MM월 dd일', { locale: ko })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{memory.location.name}</span>
          </div>
          {memory.weather && (
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              <span>{memory.weather}</span>
            </div>
          )}
          {memory.music && (
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span>{memory.music}</span>
            </div>
          )}
        </div>
        
        <p className="line-clamp-2 text-sm text-gray-700">{memory.description}</p>
      </div>
    </motion.div>
  );
}