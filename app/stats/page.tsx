'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useMemoryStore } from '@/lib/store/memory-store';
import { differenceInDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function StatsPage() {
  const memories = useMemoryStore((state) => state.memories);

  // Calculate statistics
  const firstMemoryDate = memories.length > 0
    ? new Date(Math.min(...memories.map(m => new Date(m.date).getTime())))
    : new Date();
  
  const daysTogether = differenceInDays(new Date(), firstMemoryDate);
  const placesVisited = new Set(memories.map(m => m.location.name)).size;
  const totalMemories = memories.length;
  
  const categoryCounts = memories.reduce((acc, memory) => {
    acc[memory.category] = (acc[memory.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostVisitedPlace = memories.reduce((acc, memory) => {
    const place = memory.location.name;
    acc[place] = (acc[place] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoritePlaceEntry = Object.entries(mostVisitedPlace).sort((a, b) => b[1] - a[1])[0];
  const favoritePlace = favoritePlaceEntry ? favoritePlaceEntry[0] : '아직 없어요';

  const stats = [
    {
      icon: Heart,
      label: '함께한 날',
      value: `${daysTogether}일`,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      icon: MapPin,
      label: '방문한 장소',
      value: `${placesVisited}곳`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Calendar,
      label: '추억의 수',
      value: `${totalMemories}개`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Sparkles,
      label: '자주 간 곳',
      value: favoritePlace,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const categoryStats = [
    { category: 'date', label: '데이트', count: categoryCounts.date || 0, color: 'bg-pink-500' },
    { category: 'travel', label: '여행', count: categoryCounts.travel || 0, color: 'bg-blue-500' },
    { category: 'anniversary', label: '기념일', count: categoryCounts.anniversary || 0, color: 'bg-purple-500' },
    { category: 'daily', label: '일상', count: categoryCounts.daily || 0, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/20 to-pastel-purple/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <h1 className="mb-8 text-center font-noto-serif text-3xl font-bold">우리의 기록</h1>

        {/* Main Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg bg-white p-6 text-center shadow-md"
            >
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 rounded-lg bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 font-noto-serif text-xl font-semibold">추억 분포</h2>
          <div className="space-y-3">
            {categoryStats.map((cat) => (
              <div key={cat.category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{cat.label}</span>
                  <span className="font-medium">{cat.count}개</span>
                </div>
                <div className="h-8 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalMemories > 0 ? (cat.count / totalMemories) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Special Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-lg bg-gradient-to-r from-pastel-pink to-pastel-purple p-8 text-center text-white shadow-lg"
        >
          <h3 className="mb-2 font-noto-serif text-2xl font-bold">
            {daysTogether}일의 사랑
          </h3>
          <p className="text-lg">
            첫 만남부터 지금까지, 매일이 특별해요 💕
          </p>
          {firstMemoryDate && (
            <p className="mt-2 text-sm opacity-90">
              {format(firstMemoryDate, 'yyyy년 MM월 dd일', { locale: ko })}부터 함께
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}