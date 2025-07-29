'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause, Play, Volume2 } from 'lucide-react';

export default function MapMusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [volume]);

  useEffect(() => {
    // 인증 이벤트 리스너 추가
    const handleUserAuthenticated = () => {
      if (audioRef.current) {
        setTimeout(() => {
          audioRef.current?.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log('자동 재생이 차단되었습니다:', error);
          });
        }, 1000);
      }
    };

    window.addEventListener('userAuthenticated', handleUserAuthenticated);

    // 이미 인증된 상태라면 바로 재생 시도
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true' && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('자동 재생이 차단되었습니다:', error);
      });
    }

    return () => {
      window.removeEventListener('userAuthenticated', handleUserAuthenticated);
    };
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/music.mp3" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-2 sm:left-4 top-2 sm:top-4 z-20 flex items-center gap-1 sm:gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-lg backdrop-blur-sm transition-all hover:from-pink-500 hover:to-rose-500 hover:shadow-xl"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          ) : (
            <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white ml-0.5" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-300 to-rose-300 shadow-md backdrop-blur-sm transition-all hover:from-pink-400 hover:to-rose-400"
        >
          <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </motion.button>

        {showVolumeControl && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="hidden sm:flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm border border-pink-200"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-pink-400"
            />
            <span className="text-xs font-medium text-pink-600">
              {Math.round(volume * 100)}%
            </span>
          </motion.div>
        )}

        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 shadow-md backdrop-blur-sm border border-pink-200"
          >
            <Music className="h-3 w-3 text-pink-500" />
            <span className="text-xs font-medium text-pink-600">재생 중</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-2 w-2 rounded-full bg-pink-400"
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}