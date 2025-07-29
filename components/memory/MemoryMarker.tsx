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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF69B4" stroke="#FF1493" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
    `,
    className: 'custom-heart-marker animate-float',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
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
        <div className="min-w-[200px] p-2">
          <h3 className="mb-1 font-noto-serif text-lg font-semibold">{memory.title}</h3>
          <p className="mb-2 text-sm text-gray-600">
            {format(new Date(memory.date), 'yyyy년 MM월 dd일', { locale: ko })}
          </p>
          <p className="mb-3 text-sm">{memory.description.substring(0, 50)}...</p>
          <button
            onClick={handleClick}
            className="w-full rounded-md bg-pastel-pink px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-pastel-purple"
          >
            자세히 보기
          </button>
        </div>
      </Popup>
    </Marker>
  );
}