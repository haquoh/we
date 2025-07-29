'use client';

import { useMemoryStore } from '@/lib/store/memory-store';
import Timeline from '@/components/memory/Timeline';
import FilterBar from '@/components/memory/FilterBar';

export default function TimelinePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/10 to-pastel-purple/10">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="px-4 py-4">
          <h1 className="mb-4 text-center font-noto-serif text-2xl font-bold">우리의 타임라인</h1>
          <FilterBar />
        </div>
      </div>
      
      <Timeline memories={filteredMemories} />
    </div>
  );
}