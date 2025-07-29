'use client';

import { useEffect, useState } from 'react';
import MemoryMap from '@/components/memory/MemoryMap';
import FilterBar from '@/components/memory/FilterBar';
import LoadingScreen from '@/components/ui/LoadingScreen';
import PasswordProtect from '@/components/auth/PasswordProtect';
import { motion } from 'framer-motion';
import { useMemoryStore } from '@/lib/store/memory-store';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const memories = useMemoryStore((state) => state.memories);

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PasswordProtect>
      <div className="relative h-screen w-full">
        {/* Filter Bar */}
        <div className="absolute left-4 right-4 top-4 z-10">
          <FilterBar />
        </div>

        {/* Map */}
        <MemoryMap />

        {/* Welcome Message - shows on first visit */}
        {memories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 left-4 right-4 z-10"
          >
            <div className="rounded-lg bg-white/90 p-4 text-center shadow-lg backdrop-blur-sm">
              <h2 className="font-noto-serif text-lg font-semibold text-gray-800">
                우리의 추억이 담긴 지도
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                하트를 눌러 추억을 둘러보세요 💕
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </PasswordProtect>
  );
}