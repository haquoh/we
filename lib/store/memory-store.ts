import { create } from 'zustand';
import { Memory } from '@/lib/types/memory';
import memoriesData from '@/data/memories.json';

interface MemoryStore {
  memories: Memory[];
  selectedMemoryId: string | null;
  setSelectedMemory: (id: string | null) => void;
  addMemory: (memory: Memory) => void;
  updateMemory: (id: string, memory: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
}

export const useMemoryStore = create<MemoryStore>()((set) => ({
  memories: memoriesData as Memory[],
  selectedMemoryId: null,
  setSelectedMemory: (id) => set({ selectedMemoryId: id }),
  addMemory: (memory) => set((state) => ({ memories: [...state.memories, memory] })),
  updateMemory: (id, updatedMemory) =>
    set((state) => ({
      memories: state.memories.map((m) => (m.id === id ? { ...m, ...updatedMemory } : m)),
    })),
  deleteMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((m) => m.id !== id),
    })),
}));