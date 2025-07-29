'use client';

import { useState, useEffect } from 'react';
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
      // 인증 성공 시 음악 재생 이벤트 발생
      window.dispatchEvent(new Event('userAuthenticated'));
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
    <div className="min-h-screen w-full z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm">
        <div className="rounded-3xl bg-gradient-to-br from-pink-50/95 to-rose-50/95 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-sm border-2 border-pink-200/50">
          <div className="mb-6 sm:mb-8 md:mb-10 text-center">
            <div className="mb-4 sm:mb-6 inline-block">
              <Heart className="h-16 w-16 sm:h-20 sm:w-20 text-pink-500 drop-shadow-lg animate-pulse" fill="currentColor" />
            </div>
            <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-pink-800 font-noto-serif">💕 우리의 추억 지도</h1>
            <p className="text-base sm:text-lg text-pink-600 font-medium mb-1 sm:mb-2">소중한 순간들을 함께 보려면</p>
            <p className="text-base sm:text-lg text-pink-600 font-medium">우리만의 비밀번호를 입력해주세요 💖</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-pink-600">
                <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base font-medium">비밀번호</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="우리의 특별한 날을 입력하세요"
                className={`w-full rounded-xl sm:rounded-2xl border-2 py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-medium text-center transition-all focus:outline-none ${
                  error
                    ? 'border-rose-400 bg-rose-50 text-rose-700 placeholder-rose-400'
                    : 'border-pink-300 bg-pink-50/50 text-pink-800 placeholder-pink-400 focus:border-pink-500 focus:bg-white focus:shadow-lg'
                }`}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-center text-sm sm:text-lg text-rose-600 font-medium bg-rose-100 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-3 sm:px-4">
                💔 틀렸어요! 우리의 특별한 날을 다시 생각해보세요
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all hover:from-pink-500 hover:to-rose-500 hover:shadow-2xl hover:scale-105"
            >
              💕 우리의 추억 속으로 들어가기 💕
            </button>

            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="w-full text-center text-base sm:text-lg text-pink-500 font-medium hover:text-pink-700 transition-colors"
            >
              💡 힌트가 필요해요
            </button>

            {showHint && (
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 p-4 sm:p-6 text-center border-2 border-pink-200">
                <p className="text-base sm:text-lg text-pink-700 font-medium font-noto-serif leading-relaxed">
                  🌸 우리가 처음 만난 그 특별한 날...<br />
                  💕 2022년 가을의 어느 따뜻한 날이었죠
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}