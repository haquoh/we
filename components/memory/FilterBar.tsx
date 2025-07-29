'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useMemoryStore } from '@/lib/store/memory-store';
import { MemoryCategory } from '@/lib/types/memory';

const categories: { value: MemoryCategory | null; label: string; emoji: string; color: string }[] = [
  { value: null, label: '전체', emoji: '✨', color: 'bg-gradient-to-r from-pink-50 to-purple-50 text-gray-700 border-2 border-pink-200' },
  { value: 'date', label: '데이트', emoji: '💕', color: 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-2 border-pink-300' },
  { value: 'travel', label: '여행', emoji: '✈️', color: 'bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 border-2 border-blue-300' },
  { value: 'anniversary', label: '기념일', emoji: '🎉', color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-2 border-purple-300' },
  { value: 'daily', label: '일상', emoji: '🌱', color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300' },
];

export default function FilterBar() {
  const filterCategory = useMemoryStore((state) => state.filterCategory);
  const searchQuery = useMemoryStore((state) => state.searchQuery);
  const setFilterCategory = useMemoryStore((state) => state.setFilterCategory);
  const setSearchQuery = useMemoryStore((state) => state.setSearchQuery);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white/90 backdrop-blur-sm p-5 shadow-lg border border-pink-100"
    >
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="추억 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-2 border-pink-200 bg-pink-50/30 py-2.5 pl-10 pr-10 text-gray-700 placeholder-gray-500 transition-all focus:border-pink-400 focus:bg-white focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category.value || 'all'}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterCategory(category.value)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md ${
              filterCategory === category.value
                ? `${category.color} shadow-md`
                : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-base">{category.emoji}</span>
              <span>{category.label}</span>
            </span>
            {filterCategory === category.value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-pink-200/30 to-purple-200/30 blur-lg"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}