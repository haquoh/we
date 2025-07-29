'use client';

import { useEffect } from 'react';
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
  const filterCategory = useMemoryStore((state) => state.filterCategory);
  const searchQuery = useMemoryStore((state) => state.searchQuery);

  const filteredMemories = memories.filter((memory) => {
    const matchesCategory = !filterCategory || memory.category === filterCategory;
    const matchesSearch = !searchQuery || 
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.location.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative h-full w-full">
      <Map memories={filteredMemories} />
    </div>
  );
}