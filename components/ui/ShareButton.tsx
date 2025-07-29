'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Check, Copy } from 'lucide-react';
import { generateShareLink } from '@/lib/utils/special-features';

interface ShareButtonProps {
  memoryId: string;
  title: string;
}

export default function ShareButton({ memoryId, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareLink = generateShareLink(memoryId);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `우리의 추억 - ${title}`,
          text: '소중한 추억을 공유해요',
          url: shareLink,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 rounded-full bg-pastel-pink px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-pastel-purple"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          <span>복사됨!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          <span>공유하기</span>
        </>
      )}
    </motion.button>
  );
}