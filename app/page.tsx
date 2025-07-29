'use client';

import MemoryMap from '@/components/memory/MemoryMap';
import PasswordProtect from '@/components/auth/PasswordProtect';
import { useMemoryStore } from '@/lib/store/memory-store';

export default function Home() {
  const memories = useMemoryStore((state) => state.memories);


  return (
    <PasswordProtect>
      <div className="relative h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        {/* Map */}
        <MemoryMap />

        {/* Welcome Message - shows on first visit */}
        {memories.length > 0 && (
          <div className="absolute bottom-4 sm:bottom-8 left-4 right-4 z-10 px-2 sm:px-0">
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-100/90 to-rose-100/90 p-4 sm:p-6 text-center shadow-xl backdrop-blur-sm border border-pink-200">
              <h2 className="font-noto-serif text-lg sm:text-xl font-bold text-pink-800 mb-1 sm:mb-2">
                💕 우리의 추억이 담긴 지도 💕
              </h2>
              <p className="text-sm sm:text-base text-pink-600 font-medium">
                하트를 눌러 소중한 추억들을 둘러보세요
              </p>
            </div>
          </div>
        )}
      </div>
    </PasswordProtect>
  );
}