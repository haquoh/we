'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Map, Clock, BarChart3, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Map, label: '지도' },
  { path: '/timeline', icon: Clock, label: '타임라인' },
  { path: '/stats', icon: BarChart3, label: '통계' },
  { path: '/about', icon: Info, label: '우리' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <nav className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="relative flex flex-col items-center justify-center px-4 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-pastel-pink/20"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`h-6 w-6 transition-colors ${
                  isActive ? 'text-pink-600' : 'text-gray-500'
                }`}
              />
              <span
                className={`mt-1 text-xs font-medium ${
                  isActive ? 'text-pink-600' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}