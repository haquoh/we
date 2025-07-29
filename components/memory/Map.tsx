'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Memory } from '@/lib/types/memory';
import MemoryMarker from './MemoryMarker';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
const iconDefault = L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: string };
delete iconDefault._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface MapProps {
  memories: Memory[];
}

function MapController({ memories }: { memories: Memory[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (memories.length > 0) {
      const bounds = L.latLngBounds(
        memories.map(m => [m.location.lat, m.location.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [memories, map]);

  return null;
}

export default function Map({ memories }: MapProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const tileUrl = isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  return (
    <MapContainer
      center={[37.5665, 126.9780]} // Seoul center
      zoom={11}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={tileUrl}
      />
      <MapController memories={memories} />
      {memories.map((memory) => (
        <MemoryMarker key={memory.id} memory={memory} />
      ))}
    </MapContainer>
  );
}