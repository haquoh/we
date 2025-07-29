'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="mb-8 font-noto-serif text-3xl font-bold">우리의 이야기</h1>
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-12 overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <div className="relative h-64 bg-gradient-to-r from-pastel-pink to-pastel-purple">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <Sparkles className="h-32 w-32 text-white/20" />
                </motion.div>
                <Heart className="relative h-24 w-24 fill-white text-white" />
              </div>
            </div>
            <div className="p-8">
              <h2 className="mb-4 font-noto-serif text-2xl font-semibold">
                사랑하는 사람과 함께
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                이 지도는 우리가 함께 만들어가는 추억의 발자취입니다.
                <br />
                작은 일상부터 특별한 순간까지,
                <br />
                모든 추억이 소중한 우리만의 이야기가 됩니다.
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <div className="mb-4 text-4xl">🗺️</div>
              <h3 className="mb-2 font-semibold">추억 지도</h3>
              <p className="text-sm text-gray-600">
                우리가 함께한 모든 장소를 지도에 담았어요
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <div className="mb-4 text-4xl">📸</div>
              <h3 className="mb-2 font-semibold">사진 갤러리</h3>
              <p className="text-sm text-gray-600">
                소중한 순간들을 사진으로 간직해요
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <div className="mb-4 text-4xl">💕</div>
              <h3 className="mb-2 font-semibold">특별한 기록</h3>
              <p className="text-sm text-gray-600">
                날씨, 음악까지 그날의 모든 것을 기억해요
              </p>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-lg bg-white/80 p-8 text-center shadow-md backdrop-blur"
          >
            <p className="font-noto-serif text-xl italic text-gray-700">
              "사랑한다는 것은 함께 같은 방향을 바라보는 것이다"
            </p>
            <p className="mt-2 text-sm text-gray-500">- 생텍쥐페리</p>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-700">
              앞으로도 더 많은 추억을 함께 만들어가요
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Heart className="h-5 w-5 fill-pink-500 text-pink-500" />
              <Heart className="h-5 w-5 fill-purple-500 text-purple-500" />
              <Heart className="h-5 w-5 fill-pink-500 text-pink-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}