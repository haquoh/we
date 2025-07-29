'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
}

export default function HeartParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Date.now(),
        x: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 5,
      };

      setParticles((prev) => [...prev.slice(-10), newParticle]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: '100vh', x: `${particle.x}vw`, opacity: 0.8 }}
          animate={{ y: '-100px', opacity: 0 }}
          transition={{ duration: particle.duration, ease: 'easeOut' }}
          style={{ fontSize: particle.size }}
          className="absolute text-pink-300"
        >
          💕
        </motion.div>
      ))}
    </div>
  );
}