'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import { useMemoryStore } from '@/lib/store/memory-store';
import { getTodaysMemory } from '@/lib/utils/special-features';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

export default function TodaysMemory() {
  const [isVisible, setIsVisible] = useState(false);
  const [todaysMemory, setTodaysMemory] = useState<any>(null);
  const memories = useMemoryStore((state) => state.memories);
  const router = useRouter();

  useEffect(() => {
    const memory = getTodaysMemory(memories);
    if (memory) {
      setTodaysMemory(memory);
      setIsVisible(true);
    }
  }, [memories]);

  if (!todaysMemory || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-x-4 top-20 z-50 mx-auto max-w-md"
      >
        <div className="relative rounded-lg bg-gradient-to-br from-pastel-pink to-pastel-purple p-6 text-white shadow-2xl">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-2 rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <h3 className="font-noto-serif text-lg font-semibold">오늘의 추억</h3>
          </div>
          
          <p className="mb-2 text-sm opacity-90">
            작년 오늘, {format(new Date(todaysMemory.date), 'yyyy년 MM월 dd일', { locale: ko })}
          </p>
          
          <h4 className="mb-2 font-semibold">{todaysMemory.title}</h4>
          <p className="mb-4 text-sm opacity-90">{todaysMemory.location.name}</p>
          
          <button
            onClick={() => {
              router.push(`/memory/${todaysMemory.id}`);
              setIsVisible(false);
            }}
            className="w-full rounded-md bg-white/20 py-2 text-sm font-medium backdrop-blur hover:bg-white/30"
          >
            추억 보러가기
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}