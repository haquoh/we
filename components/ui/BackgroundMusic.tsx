'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // You can add your music file to public/music/background.mp3
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }

    // 인증 상태 확인 후 자동 재생
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true' && audioRef.current) {
      // 사용자 상호작용 후 음악 재생을 위해 약간의 지연
      const timer = setTimeout(() => {
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('자동 재생이 차단되었습니다:', error);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('음악 재생 실패:', error);
          alert('음악을 재생할 수 없습니다. 브라우저 설정을 확인해주세요.');
        });
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/music.mp3" />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-gray-700" />
        ) : (
          <Play className="h-5 w-5 text-gray-700" />
        )}
      </motion.button>
    </>
  );
}