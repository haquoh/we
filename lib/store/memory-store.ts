import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Memory } from '@/lib/types/memory';
import memoriesData from '@/data/memories.json';

interface MemoryStore {
  memories: Memory[];
  selectedMemoryId: string | null;
  filterCategory: string | null;
  searchQuery: string;
  setSelectedMemory: (id: string | null) => void;
  setFilterCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  addMemory: (memory: Memory) => void;
  updateMemory: (id: string, memory: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
}

export const useMemoryStore = create<MemoryStore>()(
  persist(
    (set) => ({
      memories: memoriesData as Memory[],
      selectedMemoryId: null,
      filterCategory: null,
      searchQuery: '',
      setSelectedMemory: (id) => set({ selectedMemoryId: id }),
      setFilterCategory: (category) => set({ filterCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      addMemory: (memory) => set((state) => ({ memories: [...state.memories, memory] })),
      updateMemory: (id, updatedMemory) =>
        set((state) => ({
          memories: state.memories.map((m) => (m.id === id ? { ...m, ...updatedMemory } : m)),
        })),
      deleteMemory: (id) =>
        set((state) => ({
          memories: state.memories.filter((m) => m.id !== id),
        })),
    }),
    {
      name: 'memory-storage',
      partialize: (state) => ({ memories: state.memories }),
    }
  )
);