'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';

interface PasswordProtectProps {
  children: React.ReactNode;
}

export default function PasswordProtect({ children }: PasswordProtectProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const CORRECT_PASSWORD = '221010';

  useEffect(() => {
    const authenticated = sessionStorage.getItem('isAuthenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 3000);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-4 w-full max-w-md"
      >
        <div className="rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-8 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="mb-4 inline-block"
            >
              <Heart className="h-16 w-16 text-pink-500" fill="currentColor" />
            </motion.div>
            <h1 className="mb-2 text-2xl font-bold text-gray-800">우리의 추억 지도</h1>
            <p className="text-sm text-gray-600">소중한 순간들을 함께 보려면</p>
            <p className="text-sm text-gray-600">우리만의 비밀번호를 입력해주세요 💕</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className={`w-full rounded-xl border-2 py-3 pl-10 pr-4 transition-all focus:outline-none ${
                  error
                    ? 'border-red-300 bg-red-50'
                    : 'border-pink-200 bg-pink-50/30 focus:border-pink-400 focus:bg-white'
                }`}
                autoFocus
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-red-500"
              >
                틀렸어요! 다시 생각해보세요 🤔
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl"
            >
              들어가기
            </motion.button>

            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
              힌트가 필요해요 🤫
            </button>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-xl bg-purple-50 p-4 text-center text-sm text-purple-700"
              >
                우리가 처음 만난 그 특별한 날...<br />
                2022년 가을의 어느 날이었죠 🍂
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}