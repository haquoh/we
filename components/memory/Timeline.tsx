'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Memory } from '@/lib/types/memory';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import MemoryCard from './MemoryCard';
import { groupBy } from '@/lib/utils/date-utils';

interface TimelineProps {
  memories: Memory[];
}

export default function Timeline({ memories }: TimelineProps) {
  const router = useRouter();
  
  // Sort memories by date (newest first)
  const sortedMemories = [...memories].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Group memories by month
  const groupedMemories = groupBy(sortedMemories, (memory) => 
    format(new Date(memory.date), 'yyyy년 MM월', { locale: ko })
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {Object.entries(groupedMemories).map(([month, monthMemories], monthIndex) => (
        <motion.div
          key={month}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: monthIndex * 0.1 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center">
            <div className="h-px flex-1 bg-gray-300"></div>
            <h2 className="mx-4 font-noto-serif text-xl font-semibold text-gray-700">
              {month}
            </h2>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {monthMemories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: monthIndex * 0.1 + index * 0.05 }}
              >
                <MemoryCard
                  memory={memory}
                  onClick={() => router.push(`/memory/${memory.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}