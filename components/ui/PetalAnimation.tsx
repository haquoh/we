'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
}

export default function PetalAnimation({ isActive = false }: { isActive?: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));

    setPetals(newPetals);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -100, x: `${petal.x}vw`, rotate: 0, opacity: 1 }}
          animate={{
            y: '100vh',
            x: `${petal.x + (Math.random() - 0.5) * 30}vw`,
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: 10,
            delay: petal.delay,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="absolute h-4 w-4 rounded-full bg-gradient-to-br from-pink-300 to-pink-400"
          style={{
            clipPath: 'ellipse(50% 35% at 50% 50%)',
          }}
        />
      ))}
    </div>
  );
}