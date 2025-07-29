'use client';

import { useRouter } from 'next/navigation';
import { Marker, Popup } from 'react-leaflet';
import { Heart } from 'lucide-react';
import L from 'leaflet';
import { Memory } from '@/lib/types/memory';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemoryStore } from '@/lib/store/memory-store';

interface MemoryMarkerProps {
  memory: Memory;
}

function createHeartIcon() {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="animate-heart-beat">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="url(#heartGradient)" stroke="#E11D48" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(225, 29, 72, 0.3))">
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FB7185;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#EC4899;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E11D48;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <div class="absolute inset-0 animate-twinkle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
        </div>
      </div>
    `,
    className: 'custom-heart-marker animate-float',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

export default function MemoryMarker({ memory }: MemoryMarkerProps) {
  const router = useRouter();
  const setSelectedMemory = useMemoryStore((state) => state.setSelectedMemory);

  const handleClick = () => {
    setSelectedMemory(memory.id);
    router.push(`/memory/${memory.id}`);
  };

  return (
    <Marker
      position={[memory.location.lat, memory.location.lng]}
      icon={createHeartIcon()}
    >
      <Popup>
        <div className="min-w-[250px] p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200">
          <h3 className="mb-2 font-noto-serif text-xl font-bold text-pink-800 flex items-center gap-2">
            💕 {memory.title}
          </h3>
          <p className="mb-3 text-sm text-pink-600 font-medium bg-pink-100 rounded-full px-3 py-1 inline-block">
            📅 {format(new Date(memory.date), 'yyyy년 MM월 dd일', { locale: ko })}
          </p>
          <p className="mb-4 text-sm text-pink-700 leading-relaxed">{memory.description.substring(0, 80)}...</p>
          <button
            onClick={handleClick}
            className="w-full rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 px-4 py-3 text-sm font-bold text-white transition-all hover:from-pink-500 hover:to-rose-500 hover:shadow-lg transform hover:scale-105"
          >
            ✨ 추억 자세히 보기 ✨
          </button>
        </div>
      </Popup>
    </Marker>
  );
}