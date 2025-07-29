import { Memory } from '@/lib/types/memory';
import { differenceInDays, format, isSameDay, subYears } from 'date-fns';
import { ko } from 'date-fns/locale';

// 오늘의 추억 찾기 (작년 오늘)
export function getTodaysMemory(memories: Memory[]): Memory | null {
  const today = new Date();
  const lastYearToday = subYears(today, 1);
  
  return memories.find(memory => 
    isSameDay(new Date(memory.date), lastYearToday)
  ) || null;
}

// 기념일 확인
export interface Anniversary {
  type: 'days' | 'months' | 'years';
  value: number;
  date: Date;
  message: string;
}

export function checkAnniversary(firstDate: Date): Anniversary | null {
  const today = new Date();
  const daysTogether = differenceInDays(today, firstDate);
  
  // 100일 단위 기념일
  if (daysTogether % 100 === 0 && daysTogether > 0) {
    return {
      type: 'days',
      value: daysTogether,
      date: today,
      message: `오늘은 우리가 만난지 ${daysTogether}일째 되는 날이에요! 🎉`
    };
  }
  
  // 월 기념일
  const monthsTogether = Math.floor(daysTogether / 30);
  if (daysTogether % 30 === 0 && monthsTogether > 0) {
    return {
      type: 'months',
      value: monthsTogether,
      date: today,
      message: `${monthsTogether}개월째 함께하고 있어요! 💕`
    };
  }
  
  // 연 기념일
  const yearsTogether = Math.floor(daysTogether / 365);
  if (daysTogether % 365 === 0 && yearsTogether > 0) {
    return {
      type: 'years',
      value: yearsTogether,
      date: today,
      message: `${yearsTogether}주년을 축하해요! 🎊`
    };
  }
  
  return null;
}

// 계절별 추억 필터
export function getMemoriesBySeason(memories: Memory[], season: 'spring' | 'summer' | 'autumn' | 'winter'): Memory[] {
  const seasonMonths = {
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    autumn: [9, 10, 11],
    winter: [12, 1, 2]
  };
  
  return memories.filter(memory => {
    const month = new Date(memory.date).getMonth() + 1;
    return seasonMonths[season].includes(month);
  });
}

// 월별 추억 통계
export function getMonthlyStats(memories: Memory[]): Record<string, number> {
  const monthlyStats: Record<string, number> = {};
  
  memories.forEach(memory => {
    const monthKey = format(new Date(memory.date), 'MM월', { locale: ko });
    monthlyStats[monthKey] = (monthlyStats[monthKey] || 0) + 1;
  });
  
  return monthlyStats;
}

// 추억 공유 링크 생성
export function generateShareLink(memoryId: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/memory/${memoryId}`;
  }
  return `/memory/${memoryId}`;
}