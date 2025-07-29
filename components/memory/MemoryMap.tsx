'use client';

import dynamic from 'next/dynamic';
import { useMemoryStore } from '@/lib/store/memory-store';
const Map = dynamic(
  () => import('@/components/memory/Map'),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="text-pink-600 text-xl">로딩중...</div>
    </div>
  }
);

export default function MemoryMap() {
  const memories = useMemoryStore((state) => state.memories);

  return (
    <div className="relative h-full w-full">
      <Map memories={memories} />
    </div>
  );
}