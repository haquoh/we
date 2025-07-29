'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-pastel-pink to-pastel-purple">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mb-4 flex justify-center"
        >
          <Heart className="h-16 w-16 fill-white text-white" />
        </motion.div>
        <h2 className="font-noto-serif text-2xl font-medium text-white">
          우리의 추억을 불러오는 중...
        </h2>
      </motion.div>
    </div>
  );
}