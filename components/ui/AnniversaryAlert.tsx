'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useMemoryStore } from '@/lib/store/memory-store';
import { checkAnniversary } from '@/lib/utils/special-features';
import Confetti from 'react-confetti';

import { Anniversary } from '@/lib/utils/special-features';

export default function AnniversaryAlert() {
  const [anniversary, setAnniversary] = useState<Anniversary | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const memories = useMemoryStore((state) => state.memories);

  useEffect(() => {
    if (memories.length > 0) {
      const firstMemoryDate = new Date(
        Math.min(...memories.map(m => new Date(m.date).getTime()))
      );
      const result = checkAnniversary(firstMemoryDate);
      
      if (result) {
        setAnniversary(result);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  }, [memories]);

  if (!anniversary) return null;

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#FFD6E8', '#E8D5FF', '#FF69B4', '#FF1493']}
        />
      )}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-x-4 top-4 z-50 mx-auto max-w-md"
        >
          <div className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-center text-white shadow-2xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="mb-4 flex justify-center"
            >
              <Heart className="h-12 w-12 fill-white" />
            </motion.div>
            
            <h2 className="mb-2 font-noto-serif text-2xl font-bold">
              축하해요! 🎉
            </h2>
            
            <p className="text-lg">{anniversary.message}</p>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-4 flex justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              <Sparkles className="h-5 w-5" />
              <Sparkles className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}