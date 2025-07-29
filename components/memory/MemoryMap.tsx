'use client';

import dynamic from 'next/dynamic';
import { useMemoryStore } from '@/lib/store/memory-store';
import LoadingScreen from '@/components/ui/LoadingScreen';

const Map = dynamic(
  () => import('@/components/memory/Map'),
  { 
    ssr: false,
    loading: () => <LoadingScreen />
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